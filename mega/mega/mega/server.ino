/* 
  Modul Server
  part of Arduino Mega Server project
*/

#ifdef SERVER_FEATURE

// network
int SERVER_PORT = 80;
EthernetServer server(SERVER_PORT); // create a server

// parse HTTP requests
#define REQ_BUF_SIZE 60 // size of buffer used to capture HTTP requests
char HTTP_req[REQ_BUF_SIZE] = {0}; // buffered HTTP request stored as null terminated string
char req_index = 0;
char HTTP_req_temp[REQ_BUF_SIZE] = {0};
char req_index_temp = 0;

// parse network commands
byte MAX_LEN_REQUEST = 25;
String request = String(MAX_LEN_REQUEST);

// files
File webFile; // web page file on the SD card

void serverInit() {
  server.begin(); // start to listen for clients
  delay(200);
  modulServer = 1;
}

void serverWorks() {
  EthernetClient sclient = server.available();  // try to get client

  if (sclient) { // got client?
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
          
          // send web page to client
          if (webFile) {
            while(webFile.available()) {
              sclient.write(webFile.read());
            }
            webFile.close();
          }
          
          // display received HTTP request on serial port
          Serial.println(HTTP_req);
        
          // Reset buffer index and all buffer elements to 0
          req_index = 0;
          StrClear(HTTP_req, REQ_BUF_SIZE);          
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
    delay(1); // give the web browser time to receive the data
    sclient.stop(); // close the connection
  } // if (client)
} // serverWorks()

#endif // SERVER_FEATURE
