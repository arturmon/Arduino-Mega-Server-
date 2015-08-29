/*
  Modul Server
  part of Arduino Mega Server project
*/

#ifdef SERVER_FEATURE

// Network
int SERVER_PORT = 80;
EthernetServer server(SERVER_PORT); // create a server

// File read & send buffer
byte const MAX_BUFFER_SIZE = 128;
uint16_t rsize;
uint8_t buff[MAX_BUFFER_SIZE];

byte const MAX_BUFFER_SIZE2 = 128;
uint16_t rsize2;
uint8_t buff2[MAX_BUFFER_SIZE2];

boolean allowMarkers = false;

// Parse HTTP requests
#define REQ_BUF_SIZE 128 // size of buffer used to capture HTTP requests
char HTTP_req[REQ_BUF_SIZE] = {0}; // buffered HTTP request stored as null terminated string
char req_index = 0;
char HTTP_req_temp[REQ_BUF_SIZE] = {0};
char req_index_temp = 0;

// Parse network commands
byte MAX_LEN_REQUEST = 25;
String request = String(MAX_LEN_REQUEST);

// Files
File webFile; // web page file on the SD card

byte const MARKER = 0x25; // %
byte const HEADER = 0x31; // 1
byte const DASH = 0x32; // 2
byte const MENU = 0x33; // 3
byte const FOOTER = 0x34; // 4

byte const FLOTR2_JS = 0x3F; // ?

byte const STYLE_CSS = 0x3D; // =
byte const TYPE_LINKS = 0x26; // &
byte const SCRIPTS_JS = 0x23; // #
byte const SAMPLE2_ONE = 0x40; // @ (mode one)
byte const SAMPLE2_MAJOR = 0x2B; // + {mode major}

void serverInit() {
  server.begin(); // start to listen for clients
  delay(200);
  modulServer = 1;
}

int checkMarker(int startPos, int endPos) {
  for (int i = startPos; i < endPos; i++) {
    if (buff[i] == MARKER && (buff[i + 1] == HEADER ||
                              buff[i + 1] == DASH ||
                              buff[i + 1] == MENU ||
                              buff[i + 1] == FOOTER ||
                              buff[i + 1] == STYLE_CSS ||
                              buff[i + 1] == FLOTR2_JS ||
                              buff[i + 1] == SAMPLE2_ONE ||
                              buff[i + 1] == SAMPLE2_MAJOR ||
                              buff[i + 1] == TYPE_LINKS ||
                              buff[i + 1] == SCRIPTS_JS)) {
      return i;
    }
  }
  return -1;
}

int sendDelta(int startPos, int endPos, EthernetClient cl) {
  for (int i = startPos; i < endPos; i++) {
    cl.write(buff[i]);
  }
}

void markersWorks(int pos, EthernetClient cl) {
  if (pos > rsize - 2) {return;}
  int markerPos = checkMarker(pos, rsize - 1);
  if (markerPos > -1) {
    sendDelta(pos, markerPos, cl);
    insertBlock(buff[markerPos + 1], cl);
    markersWorks(markerPos + 2, cl);
  } else {
      if (pos == 0) {
        cl.write(buff, rsize);
      } else {
          sendDelta(pos, rsize, cl);
        }
    }
}

void serverWorks2(EthernetClient sclient) {
  if (sclient) { // got client?
  
    #ifdef SERVER_PROFILING
      checkEvent(&prevEventRequest);
      unsigned long go_problem = millis();
    #endif
  
    boolean currentLineIsBlank = true;
    while (sclient.connected()) {
      if (sclient.available()) {   // client data available to read
        char c = sclient.read();   // read 1 byte (character) from client

        /* limit the size of the stored received HTTP request
           buffer first part of HTTP request in HTTP_req array (string)
           leave last element in array as 0 to null terminate string (REQ_BUF_SZ - 1) */

        if (req_index < (REQ_BUF_SIZE - 1)) {
          HTTP_req[req_index] = c; // save HTTP request character
          req_index++;
        }
        
        // make request
        if (request.length() < MAX_LEN_REQUEST) {
          request += (c);
        }    
        
        /* last line of client request is blank and ends with \n
           respond to client only after last line received */

        if (c == '\n' && currentLineIsBlank) {
          
          if (!StrContains(HTTP_req, "ajax_inputs")) {
            for (int iq = 0; iq < REQ_BUF_SIZE; iq++) {
              HTTP_req_temp[iq] = HTTP_req[iq];
            }
            req_index_temp = req_index;
          }
          
          // parse network commands
          parseCommands(sclient);
          
          // parse request
          parseRequest(sclient); 

          #ifdef SERVER_PROFILING
            unsigned long go_prof2 = millis();
            long bytes_file2 = 0;          
            unsigned long res_prof2;
          
            if (webFile) {
              while(webFile.available()) {
                webFile.read(buff, MAX_BUFFER_SIZE);
                bytes_file2++;
              }
              res_prof2 = millis() - go_prof2;
              webFile.seek(0);
            }          
            unsigned long go_prof = millis();
            long bytes_file = 0;          
          #endif

          // send web page to client
          if (webFile) {
            while(webFile.available()) {
              rsize = webFile.read(buff, MAX_BUFFER_SIZE);
              
              if (allowMarkers) {
                markersWorks(0, sclient);
              } else {
                  sclient.write(buff, rsize);
                }
              
              #ifdef SERVER_PROFILING
                bytes_file++;
              #endif
            }
            
            #ifdef SERVER_PROFILING
              unsigned long res_prof = millis() - go_prof;
              sclient.println();
              sclient.print("<!-- ms: ");
              sclient.print(res_prof);
              sclient.println(" -->");
          
              sclient.print("<!-- bytes: ");
              sclient.print(bytes_file * MAX_BUFFER_SIZE);
              sclient.println(" -->");
          
              float transfer_speed = (1000.0/(float)res_prof)*((float)bytes_file*128.0);
              sclient.print("<!-- speed: ");
              sclient.print(transfer_speed);
              sclient.println(" -->");      
            
            
              sclient.println();
              sclient.println("<!-- File: -->");
              sclient.print("<!-- ms: ");
              sclient.print(res_prof2);
              sclient.println(" -->");
          
              sclient.print("<!-- bytes: ");
              sclient.print(bytes_file2 * MAX_BUFFER_SIZE);
              sclient.println(" -->");
          
              float transfer_speed2 = (1000.0/(float)res_prof2)*((float)bytes_file2*128.0);
           
              sclient.print("<!-- speed: ");
              sclient.print(transfer_speed2);
              sclient.println(" -->");             
            #endif
            
            webFile.close();
          } // if (webFile)
          
          #ifdef SERVER_PROFILING
            // display received HTTP request on serial port
            Serial.println(HTTP_req);
          #endif
          
          // Reset buffer index and all buffer elements to 0
          req_index = 0;
          StrClear(HTTP_req, REQ_BUF_SIZE);     
     
          #ifdef SERVER_PROFILING
            unsigned long res_problem = millis() - go_problem;
            Serialprint("problem... %d\n", res_problem);  
          #endif
          
          break;
        }
        
        // every line of text received from the client ends with \r\n
        if (c == '\n') {
          
          /* last character on line of received text starting new line with next character read */
          
          currentLineIsBlank = true;
        } else if (c != '\r') {
            // a text character was received from client
            currentLineIsBlank = false;
          }
      } // if (client.available())
    } // while (client.connected())
    delay(5); // give the web browser time to receive the data
    sclient.stop(); // close the connection

  } // if (client)
} // serverWorks2

void serverWorks() {
  for (int sock = 0; sock < MAX_SOCK_NUM; sock++) {
    EthernetClient sclient = server.available_(sock);
    serverWorks2(sclient);
  }
}

#endif // SERVER_FEATURE
