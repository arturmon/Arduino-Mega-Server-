/*
  Modul Laurent
  part of Arduino Mega Server project
 
  byte CRbyte = 13; // HEX 0x0D
  byte LFbyte = 10; // HEX 0x0A
*/

#ifdef LAURENT_FEATURE

byte LAURENT_IP[] = {192, 168, 2, 19};
int LAURENT_PORT = 2424;

byte MAX_LEN_LREQUEST = 25;
String lrequest = String(MAX_LEN_LREQUEST);

EthernetClient lclient;

void laurentInit() {
  Serialprint("Start modul Laurent Init...\n");
  Serialprint("Connect to Laurent... ");
  if (lclient.connect(LAURENT_IP, LAURENT_PORT)) {
    Serialprint("OK\n");
    lclient.stop();
    
    // Send test command
    Serialprint("Selftest...\n");
    sprintf(buf, "$KE");   
    sendLaurentRequest();

    // Send password (default: "Laurent")
    Serialprint("Set password...\n");
    sprintf(buf, "$KE,PSW,SET,Laurent");   
    sendLaurentRequest();
  } else {
      Serialprint("failed/n");
    }
  delay(500);
    
  // останавливаем выдачу DATA
  sprintf(buf, "$KE,DAT,OFF");
  sendLaurentRequest();
  delay(100);
  
  // выключаем реле
  sprintf(buf, "$KE,REL,2,0");
  sendLaurentRequest();
  
  Serialprint("Modul Laurent Init done\n");
  modulLaurent = 1;
} // laurentInit

void sendLaurentRequest() {
  if (lclient.connect(LAURENT_IP, LAURENT_PORT)) { 
    Serialprint("Command: ");
    Serial.println(buf);
    lclient.println(buf);
    delay(100);
  
    Serialprint("Answer:  ");
    lrequest = "";
    while(lclient.available() != 0) {
      char c = lclient.read();
      Serial.print(c);
      if (lrequest.length() < MAX_LEN_LREQUEST) {
        lrequest += (c);
      }
    }
    delay(500);
    lclient.stop();
  } else {
      Serialprint("Error sending command\n");
    }
} // sendLaurentRequest

#endif // LAURENT_FEATURE
