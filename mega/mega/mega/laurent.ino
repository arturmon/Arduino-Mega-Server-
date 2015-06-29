/*
  Modul Laurent
  part of Arduino Mega Server project
 
  byte CRbyte = 13; // HEX 0x0D
  byte LFbyte = 10; // HEX 0x0A
*/

#ifdef LAURENT_FEATURE

byte LAURENT_IP[] = {192, 168, 2, 19};
int LAURENT_PORT = 2424;

EthernetClient lclient;

void laurentInit() {
  Serial.print("Connect to Laurent... ");
  if (lclient.connect(LAURENT_IP, LAURENT_PORT)) {
    Serial.println("OK");
    lclient.stop();
    
    // Send test command
    Serial.println("Selftest... ");
    sprintf(buf, "$KE");   
    sendLaurentRequest();

    // Send password (default: "Laurent")
    Serial.println("Password... ");
    sprintf(buf, "$KE,PSW,SET,Laurent");   
    sendLaurentRequest();
  } else {
      Serial.println("failed");
    }
  delay(500);
    
  // останавливаем выдачу DATA
  sprintf(buf, "$KE,DAT,OFF");
  sendLaurentRequest();
  delay(100);
  
  // выключаем реле
  sprintf(buf, "$KE,REL,2,0");
  sendLaurentRequest();
  
  modulLaurent = 1;
} // laurentInit

void sendLaurentRequest() {
  if (lclient.connect(LAURENT_IP, LAURENT_PORT)) { 
    Serial.print("Command: ");
    Serial.println(buf);
    lclient.println(buf);
    delay(100);
  
    Serial.print("Answer:  ");
    while(lclient.available() != 0) {
      char c = lclient.read();
      Serial.print(c);
    }
    delay(500);
    lclient.stop();
  } else {
      Serial.println("- Error sending command");
    }
} // sendLaurentRequest

#endif // LAURENT_FEATURE
