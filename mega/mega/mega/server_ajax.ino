/*
  Modul Server Ajax
  part of Arduino Mega Server project
  Parse HTTP requests and XML Ajax functions
*/

#ifdef SERVER_FEATURE

char HTTP_1_1_200_OK[] = "HTTP/1.1 200 OK";
char CONTENT_TYPE_TEXT_HTML[] = "Content-Type: text/html";
char CONTENT_TYPE_TEXT_XML[] = "Content-Type: text/xml";
char CONNECTION_KEEP_ALIVE[] = "Connection: keep-alive";
char CONNECTION_CLOSE[] = "Connnection: close";

char basePir[] = "pir";
char baseContact[] = "cont";
char basePower[] = "p";
char baseLine[] = "line";
char baseMAC[] = "mac";
char baseIP[] = "ip";

char inputs_start[] = "<inputs>";
char inputs_end[] = "</inputs>";

char strChecked[] = "checked";
char strUnChecked[] = "unchecked";

// send standard HTML answer
void sendHTMLanswer(EthernetClient cl) {
  cl.println(HTTP_1_1_200_OK);
  cl.println(CONTENT_TYPE_TEXT_HTML);
  cl.println(CONNECTION_CLOSE);
  cl.println();
}

// send standard XML answer
void sendXMLanswer(EthernetClient cl) {
  cl.println(HTTP_1_1_200_OK);
  cl.println(CONTENT_TYPE_TEXT_XML);
  cl.println(CONNECTION_KEEP_ALIVE);
  cl.println();
}

// send XML version title
void sendXMLtitle(EthernetClient cl) {
  cl.println(F("<?xml version = \"1.0\" ?>"));
}

void sendTagInt(char tagBase[], char tagCount[], int val, EthernetClient cl) {
  cl.print("<"); cl.print(tagBase); cl.print(tagCount); cl.print(">");
  cl.print(val);
  cl.print("</"); cl.print(tagBase); cl.print(tagCount); cl.println(">");
}

void sendTagByte(char tagBase[], char tagCount[], byte val, EthernetClient cl) {
  cl.print("<"); cl.print(tagBase); cl.print(tagCount); cl.print(">");
  cl.print(val);
  cl.print("</"); cl.print(tagBase); cl.print(tagCount); cl.println(">");
}

void sendTagByteHEX(char tagBase[], char tagCount[], byte val, EthernetClient cl) {
  cl.print("<"); cl.print(tagBase); cl.print(tagCount); cl.print(">");
  cl.print(val, HEX);
  cl.print("</"); cl.print(tagBase); cl.print(tagCount); cl.println(">");
}

void sendTagFloat(char tagBase[], char tagCount[], float val, EthernetClient cl) {
  cl.print("<"); cl.print(tagBase); cl.print(tagCount); cl.print(">");
  cl.print(val);
  cl.print("</"); cl.print(tagBase); cl.print(tagCount); cl.println(">");
}

void sendTagStr(char tagBase[], char tagCount[], char s[], EthernetClient cl) {
  cl.print("<"); cl.print(tagBase); cl.print(tagCount); cl.print(">");
  cl.print(s);
  cl.print("</"); cl.print(tagBase); cl.print(tagCount); cl.println(">");
}

void sendTagString(char tagBase[], char tagCount[], String str, EthernetClient cl) {
  cl.print("<"); cl.print(tagBase); cl.print(tagCount); cl.print(">");
  cl.print(str);
  cl.print("</"); cl.print(tagBase); cl.print(tagCount); cl.println(">");
}

/* -------------------------------------------------
  Function parseRequest(EthernetClient cl)
    "GET / ", "GET /index.htm",
    "GET / ", ".htm",
    "GET / ", ".css",
    "GET /", ".jpg", ".gif", ".png", ".js", ".pde",
    and Ajax XML requests
---------------------------------------------------- */

void parseRequest(EthernetClient cl) {
  // Files requests
        
  if (StrContains(HTTP_req, "GET / ") || StrContains(HTTP_req, "GET /index.htm")) {
    sendHTMLanswer(cl);
    webFile = SD.open("index.htm");
  }
  else if (StrContains(HTTP_req, "GET /") && StrContains(HTTP_req, ".htm")) {
    char *str_htm; 
    str_htm = strtok(HTTP_req, "GET /");
    sendHTMLanswer(cl);
    webFile = SD.open(str_htm);
  }               
  else if (StrContains(HTTP_req, "GET /") && StrContains(HTTP_req, ".css")) {
    char *str_css;
    str_css = strtok(HTTP_req, "GET /");
    webFile = SD.open(str_css);
    if (webFile) {
      cl.println(HTTP_1_1_200_OK);
      cl.print(str_css);
      cl.println(" OK");
      cl.println();
    } else {
        cl.print(str_css);
        cl.println(" ERROR");
        cl.println();
      }
  }          
  else if (StrContains(HTTP_req, "GET /") && (StrContains(HTTP_req, ".jpg") ||
                                              StrContains(HTTP_req, ".gif") ||
                                              StrContains(HTTP_req, ".png") ||
                                              StrContains(HTTP_req, ".js") ||
                                              StrContains(HTTP_req, ".pde"))) {
    char *str_file; 
    str_file = strtok(HTTP_req, "GET /");
    webFile = SD.open(str_file);
    if (webFile) {
      cl.println(HTTP_1_1_200_OK);
      cl.println();
    }
  }
  // Ajax XML requests
        
  else if (StrContains(HTTP_req, "request_generic")) {
    sendXMLanswer(cl);
    SetLEDs();
    responseGeneric(cl);
  }             
  else if (StrContains(HTTP_req, "request_network")) {
    sendXMLanswer(cl);
    responseNetwork(cl);
  }     
  else if (StrContains(HTTP_req, "request_ports")) {
    sendXMLanswer(cl);
    responsePorts(cl);
  }  
  else if (StrContains(HTTP_req, "request_electro_control")) {
    sendXMLanswer(cl);
    SetLEDs_electro();
    responseElectroControl(cl);
  }
  else if (StrContains(HTTP_req, "request_electro")) {
    sendXMLanswer(cl);
    responseElectro(cl);
  }
  else if (StrContains(HTTP_req, "request_sdcard")) {
    sendXMLanswer(cl);
    responseSDcard(cl);
  }
  else if (StrContains(HTTP_req, "request_dash")) {
    sendXMLanswer(cl);
    responseDash(cl);
  }        
} // parseRequest

void sendContacts(EthernetClient cl) {
  #ifdef CONTACTS_FEATURE
    sendTagByte(baseContact, "1", cont1objectState, cl);
    sendTagByte(baseContact, "2", cont2objectState, cl);
  #endif
}

void sendFreeRAM(EthernetClient cl) {
  sendTagInt("freeRAM", "", freeMem(), cl);
}

void sendPirs(EthernetClient cl) {
  #ifdef PIRS_FEATURE
    sendTagInt(basePir, "1", pir1, cl);
    sendTagInt(basePir, "2", pir2, cl);
    sendTagInt(basePir, "3", pir3, cl);
    sendTagInt(basePir, "4", pir4, cl);
    sendTagInt(basePir, "5", pir5, cl);
    sendTagInt(basePir, "6", pir6, cl);
  #endif
}

void sendElectro(EthernetClient cl) {
  #ifdef ELECTRO_FEATURE    
    sendTagFloat("volt", "", elPower[0], cl);
    sendTagFloat(basePower, "1",  elPower[1],  cl);
    sendTagFloat(basePower, "2",  elPower[2],  cl);
    sendTagFloat(basePower, "3",  elPower[3],  cl);
    sendTagFloat(basePower, "4",  elPower[4],  cl);
    sendTagFloat(basePower, "5",  elPower[5],  cl);
    sendTagFloat(basePower, "6",  elPower[6],  cl);
    sendTagFloat(basePower, "7",  elPower[7],  cl);
    sendTagFloat(basePower, "8",  elPower[8],  cl);
    sendTagFloat(basePower, "9",  elPower[9],  cl);
    sendTagFloat(basePower, "10", elPower[10], cl);
    sendTagFloat(basePower, "11", elPower[11], cl);
    sendTagFloat(basePower, "12", elPower[12], cl);
    sendTagFloat(basePower, "13", elPower[13], cl);
  #endif
}

void sendEventsList(EthernetClient cl) {
  #ifdef ELECTRO_FEATURE
    sendTagFloat(baseLine, "0", Uarray[0], cl);
    sendTagFloat(baseLine, "1", Uarray[1], cl);
    sendTagFloat(baseLine, "2", Uarray[2], cl);
    sendTagFloat(baseLine, "3", Uarray[3], cl);
    sendTagFloat(baseLine, "4", Uarray[4], cl);
    sendTagFloat(baseLine, "5", Uarray[5], cl);
    sendTagFloat(baseLine, "6", Uarray[6], cl);
    sendTagFloat(baseLine, "7", Uarray[7], cl);
    sendTagFloat(baseLine, "8", Uarray[8], cl);
    sendTagFloat(baseLine, "9", Uarray[9], cl);
  #endif
}

void sendModules(EthernetClient cl) {
  sendTagByte("modulRtc",         "", modulRtc, cl);
  sendTagByte("modulEthernet",    "", modulEthernet, cl);
  sendTagByte("modulSdCard",      "", modulSdCard, cl);
  sendTagByte("modulServer",      "", modulServer, cl);
  sendTagByte("modulMajor",       "", modulMajor, cl);
  sendTagByte("modulLaurent",     "", modulLaurent, cl);
  sendTagByte("modulUpload",      "", modulUpload, cl);
  sendTagByte("modulPirs",        "", modulPirs, cl);
  sendTagByte("modulContacts",    "", modulContacts, cl);
  sendTagByte("modulTemp",        "", modulTemp, cl);
  sendTagByte("dashModulElectro", "", modulElectro, cl);
  sendTagByte("modulLeds",        "", modulLeds, cl);
  sendTagByte("modulKeys",        "", modulKeys, cl);
  sendTagByte("modulPing",        "", modulPing, cl);
}

void sendDigitalPorts(EthernetClient cl) {
  sendTagByte("pin2",  "", digitalRead(2),  cl);
  sendTagByte("pin3",  "", digitalRead(3),  cl);
  sendTagByte("pin4",  "", digitalRead(4),  cl);
  sendTagByte("pin5",  "", digitalRead(5),  cl);
  sendTagByte("pin6",  "", digitalRead(6),  cl);
  sendTagByte("pin7",  "", digitalRead(7),  cl);
  sendTagByte("pin8",  "", digitalRead(8),  cl);
  sendTagByte("pin9",  "", digitalRead(9),  cl);
  sendTagByte("pin10", "", digitalRead(10), cl);
  sendTagByte("pin22", "", digitalRead(22), cl);
  sendTagByte("pin23", "", digitalRead(23), cl);
  sendTagByte("pin24", "", digitalRead(24), cl);
  sendTagByte("pin25", "", digitalRead(25), cl);
  sendTagByte("pin26", "", digitalRead(26), cl);
  sendTagByte("pin27", "", digitalRead(27), cl);
  sendTagByte("pin30", "", digitalRead(30), cl);
  sendTagByte("pin31", "", digitalRead(31), cl);
}

void sendUptime(EthernetClient cl) {
  makeUptimeString("0", "");
  sendTagStr("uptime", "", uptimeString, cl);
}

void clientPrintDigits(int digits, EthernetClient cl) {
  if(digits < 10) {cl.print('0');}
  cl.print(digits);
}

void sendTime(EthernetClient cl) {  
  cl.print("<time>");
    clientPrintDigits(hour(), cl);
    if (second() % 2 == 0) {
      cl.print(" ");
    } else {
        cl.print(":");
      }
    clientPrintDigits(minute(), cl);
  cl.println("</time>");
}

void sendDay(EthernetClient cl) {  
  cl.print("<day>");
    cl.print(day());
  cl.println("</day>");
}

void sendMonth(EthernetClient cl) {  
  cl.print("<month>");
    cl.print(month());
  cl.println("</month>");
}

void sendWeekday(EthernetClient cl) {  
  cl.print("<weekday>");
    cl.print(weekday());
  cl.println("</weekday>");
}

void sendCPUload(EthernetClient cl) {
  sendTagInt("cycDelay", "", cyclosDelay, cl);
  sendTagInt("cycInSec", "", cyclosInSec, cl);
}

/* --------------------------------------------
  Function printHTTPreq(EthernetClient cl)
    Print HTTP Req
----------------------------------------------- */
void printHTTPreq(EthernetClient cl) {
  
  cl.print("<httpReq>");
    for (int i = 0; i < req_index; i++) {
      if (HTTP_req[i] == '&') {
        cl.print(' ');
      } else {  
          cl.print(HTTP_req[i]);
        }
    }
  cl.println("</httpReq>");
}

/* --------------------------------------------
  Function printHTTPreqTemp(EthernetClient cl)
    Print HTTP Req Temp
----------------------------------------------- */
void printHTTPreqTemp(EthernetClient cl) {
  cl.print("<httpreqtemp>");
    for (int i = 0; i < req_index_temp; i++) {
      if (HTTP_req_temp[i] == '&') {
        cl.print(' ');
      } else {  
          cl.print(HTTP_req_temp[i]);
        }
    }
  cl.println("</httpreqtemp>"); 
}

#ifdef PING_FEATURE
void sendDevicesOnline(EthernetClient cl) {
  for (byte i = 0; i < TOTAL_NET_DEVICES; i++) {
    sendTagByte(netDevicesNames[i], "", online[i], cl);
  }
}
#endif

/* Generic
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

void SetLEDs(void) {

  // LED 1 (pin 6)
  if (StrContains(HTTP_req, "LED1=1")) {
    LED_state[0] = 1;  // save LED state
    digitalWrite(6, HIGH);
  } else if (StrContains(HTTP_req, "LED1=0")) {
      LED_state[0] = 0;  // save LED state
      digitalWrite(6, LOW);
    }

    // LED 2 (pin 7)
  if (StrContains(HTTP_req, "LED2=1")) {
    LED_state[1] = 1;
    digitalWrite(7, HIGH);
  } else if (StrContains(HTTP_req, "LED2=0")) {
      LED_state[1] = 0;
      digitalWrite(7, LOW);
    }

  // LED 3 (pin 5)
  if (StrContains(HTTP_req, "LED3=1")) {
    LED_state[2] = 1;
    digitalWrite(5, HIGH);
  } else if (StrContains(HTTP_req, "LED3=0")) {
      LED_state[2] = 0;
      digitalWrite(5, LOW);
    }

  // LED 4 (pin 3)
  if (StrContains(HTTP_req, "LED4=1")) {
    LED_state[3] = 1;
    digitalWrite(3, HIGH);
  } else if (StrContains(HTTP_req, "LED4=0")) {
      LED_state[3] = 0;
      digitalWrite(3, LOW);
    }
} // SetLEDs

void responseGeneric(EthernetClient cl) {
  int analog_val;            // stores value read from analog inputs
  int count;                 // used by 'for' loops
  int sw_arr[] = {42, 43, 45};  // pins interfaced to switches
    
  sendXMLtitle(cl);

  cl.println("<inputs>");
    // analog inputs
    for (count = 0; count <= 5; count++) { // A2 to A5
      analog_val = analogRead(count);
      cl.print("<analog>");
        cl.print(analog_val);
      cl.println("</analog>");
    }

    // uptime 
    sendUptime(cl);

    // HTTP_req
    printHTTPreq(cl);

    // HTTP_req_temp
    printHTTPreqTemp(cl);

    // switches
    for (count = 0; count < 3; count++) {
      cl.print("<switch>");
        if (digitalRead(sw_arr[count])) {cl.print("ON");}
                                   else {cl.print("OFF");}
      cl.println("</switch>");
    }
    
    // checkbox LED states    
    cl.print("<LED>"); // LED1 (switch)
      if (LED_state[0]) {cl.print(strChecked);}
                   else {cl.print(strUnChecked);}
    cl.println("</LED>");

    cl.print("<LED>"); // LED2 (switch)
      if (LED_state[1]) {cl.print(strChecked);}
                   else {cl.print(strUnChecked);}
    cl.println("</LED>");

    // button LED states
    cl.print("<LED>"); // LED3 (button)
      if (LED_state[2]) {cl.print("on");}
                   else {cl.print("off");}
    cl.println("</LED>");

    cl.print("<LED>"); // LED4 (button)
      if (LED_state[3]) {cl.print("on");}
                   else {cl.print("off");}
    cl.println("</LED>");
  cl.println("</inputs>");
}

/* Network
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

void responseNetwork(EthernetClient cl) {
  sendXMLtitle(cl);
  cl.println("<inputs>");  
    sendTagByteHEX(baseMAC, "1", SELF_MAC[0], cl);
    sendTagByteHEX(baseMAC, "2", SELF_MAC[1], cl);
    sendTagByteHEX(baseMAC, "3", SELF_MAC[2], cl);
    sendTagByteHEX(baseMAC, "4", SELF_MAC[3], cl);
    sendTagByteHEX(baseMAC, "5", SELF_MAC[4], cl);
    sendTagByteHEX(baseMAC, "6", SELF_MAC[5], cl);
    sendTagByte(baseIP, "1", SELF_IP[0], cl);
    sendTagByte(baseIP, "2", SELF_IP[1], cl);
    sendTagByte(baseIP, "3", SELF_IP[2], cl);
    sendTagByte(baseIP, "4", SELF_IP[3], cl);
    
    #ifdef PING_FEATURE
      sendDevicesOnline(cl);
    #endif    
  cl.println("</inputs>");
}

/* Ports
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

void responsePorts(EthernetClient cl) {
  sendXMLtitle(cl);
  cl.println("<inputs>");
    printHTTPreq(cl);
    sendDigitalPorts(cl);
  cl.println("</inputs>");
}

/* Electro
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

void SetLEDs_electro(void) {
  // LED 1 (pin 6)
  if (StrContains(HTTP_req, "LED1=1")) {
    LED_state2[0] = 1;  // save LED state
    digitalWrite(6, HIGH);
  } else if (StrContains(HTTP_req, "LED1=0")) {
      LED_state2[0] = 0;  // save LED state
      digitalWrite(6, LOW);
    }

    // LED 2 (pin 7)
  if (StrContains(HTTP_req, "LED2=1")) {
    LED_state2[1] = 1;
    digitalWrite(7, HIGH);
  } else if (StrContains(HTTP_req, "LED2=0")) {
      LED_state2[1] = 0;
      digitalWrite(7, LOW);
    }  
  
  // LED 3 (pin 5)
  if (modulElectro != MODUL_NOT_COMPILLED) {
    if (StrContains(HTTP_req, "LED3=1")) {
      buttonElectro = 1;
      modulElectro = MODUL_ENABLE;
    } else if (StrContains(HTTP_req, "LED3=0")) {
      buttonElectro = 0;
      modulElectro = MODUL_DISABLE;
    }
  }

  // LED 4 (pin 3)
  if (StrContains(HTTP_req, "LED4=1")) {
    LED_state2[3] = 1;
    digitalWrite(3, HIGH);
  } else if (StrContains(HTTP_req, "LED4=0")) {
      LED_state2[3] = 0;
      digitalWrite(3, LOW);
    }  
  
}

void responseElectroControl(EthernetClient cl) {
  sendXMLtitle(cl);
  
  cl.println("<inputs>");
    printHTTPreq(cl);
    printHTTPreqTemp(cl);
    sendTagByte("modulElectro", "", modulElectro, cl);
 
    cl.print("<LED>"); // LED1
      if (LED_state2[0]) {cl.print(strChecked);} 
                   else {cl.print(strUnChecked);}
    cl.println("</LED>");

    cl.print("<LED>"); // LED2
      if (LED_state2[1]) {cl.print(strChecked);}
                   else {cl.print(strUnChecked);}
    cl.println("</LED>");

     
    cl.print("<LED>");
      if (buttonElectro) {cl.print("on");} //
                    else {cl.print("off");}
    cl.println("</LED>");

    // button LED state
    cl.print("<LED>"); // LED4
      if (LED_state2[3]) {cl.print("on");}
                   else {cl.print("off");}
    cl.println("</LED>");
  cl.println("</inputs>");
} // responseElectroControl

void responseElectro(EthernetClient cl) {
  sendXMLtitle(cl);

  cl.println("<inputs>");
    sendTagByte("modulElectro", "", modulElectro, cl);
    sendElectro(cl);
  cl.println("</inputs>");
}

/* SD card
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

void responseSDcard(EthernetClient cl) {
  sendXMLtitle(cl);

  cl.println("<inputs>");
    sendTagStr("work", "", "work", cl);
    #ifdef SD_FEATURE
      sendTagByte("SDcardType", "", SDcardType(), cl);
      sendTagByte("SDcardFileSystem", "", SDcardFileSystem(), cl);
      sendTagInt("SDvolumeSize", "", SDvolumeSize(), cl);
      //sendTagString("SDrootDir", "", strDirectory(SDroot), cl);
    #endif
  cl.println("</inputs>");
}

/* Dash
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

void responseDash(EthernetClient cl) {
  sendXMLtitle(cl);

  cl.println("<inputs>");
    sendUptime(cl);
    sendFreeRAM(cl);
    sendCPUload(cl);
    sendTagByte("lifer", "", lifer, cl);
    sendTime(cl);
    sendDay(cl);
    sendMonth(cl);
    sendWeekday(cl);
    sendModules(cl);
            
    #ifdef PIRS_FEATURE
      sendPirs(cl);
    #endif    
    
    #ifdef CONTACTS_FEATURE
      sendContacts(cl);
    #endif 
    
    #ifdef ELECTRO_FEATURE
      sendTagFloat("voltage", "", elPower[0], cl);
      sendTagFloat("power", "", elPower[1], cl);
    #endif    
    
    #ifdef PING_FEATURE
      sendDevicesOnline(cl);
    #endif
  cl.println("</inputs>");
}

#endif // SERVER_FEATURE
