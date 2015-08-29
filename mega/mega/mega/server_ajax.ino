/*
  Modul Server Ajax
  part of Arduino Mega Server project
  Parse HTTP requests and XML Ajax functions
  //"Connection: keep-alive"
*/

#ifdef SERVER_FEATURE

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

// Server answers

void sendHtmlAnswer(EthernetClient cl) {cl.println(F("HTTP/1.1 200 OK")); cl.println(F("Content-Type: text/html")); cl.println(F("Connnection: close")); cl.println();}
void sendCssAnswer (EthernetClient cl) {cl.println(F("HTTP/1.1 200 OK")); cl.println(F("Content-Type: text/css"));  cl.println(F("Connnection: close")); cl.println();}
void sendJsAnswer  (EthernetClient cl) {cl.println(F("HTTP/1.1 200 OK")); cl.println(F("Content-Type: application/javascript")); cl.println(F("Connnection: close")); cl.println();}
void sendImgAnswer (EthernetClient cl) {cl.println(F("HTTP/1.1 200 OK")); cl.println(F("Content-Type: image/png")); cl.println(F("Connnection: close")); cl.println();}
void sendXmlAnswer (EthernetClient cl) {cl.println(F("HTTP/1.1 200 OK")); cl.println(F("Content-Type: text/xml"));  cl.println(F("Connnection: close")); cl.println();}

void sendErrorAnswer(char mess[], EthernetClient cl) {
  cl.print(mess);
  cl.println(F(" ERROR"));
  cl.println(F("Connnection: close"));
  cl.println();
}

void sendXmlVersion(EthernetClient cl) {
  cl.println(F("<?xml version = \"1.0\" ?>"));
}

// Tags

void sendTagInt(char tagBase[], char tagCount[], int val, EthernetClient cl) {
  cl.print("<"); cl.print(tagBase); cl.print(tagCount); cl.print(">");
  cl.print(val);
  cl.print("</"); cl.print(tagBase); cl.print(tagCount); cl.println(">");
}

void sendTagLong(char tagBase[], char tagCount[], long val, EthernetClient cl) {
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
    "GET / ", ".js",
    "GET / ", ".pde",
    "GET /", ".jpg", ".gif", ".png"
    and Ajax XML requests
---------------------------------------------------- */

void parseRequest(EthernetClient cl) {
  allowMarkers = false;
  char *fileName;
  // Files requests
        
  if (StrContains(HTTP_req, "GET / ") || StrContains(HTTP_req, "GET /index.htm")) {
    webFile = SD.open("index.htm");
    if (webFile) {sendHtmlAnswer(cl);}
            else {webFile = SD.open("404.htm");}
    allowMarkers = true;
  }
  else if (StrContains(HTTP_req, "GET /") && StrContains(HTTP_req, ".htm")) {
    fileName = strtok(HTTP_req, "GET /");
    webFile = SD.open(fileName);
    if (webFile) {sendHtmlAnswer(cl);}
            else {webFile = SD.open("404.htm");}
    allowMarkers = true;
  }               
  else if (StrContains(HTTP_req, "GET /") && StrContains(HTTP_req, ".css")) {
    fileName = strtok(HTTP_req, "GET /");
    webFile = SD.open(fileName);
    if (webFile) {sendCssAnswer(cl);}
            else {sendErrorAnswer(fileName, cl);}
  }
  else if (StrContains(HTTP_req, "GET /") && StrContains(HTTP_req, ".js")) {
    fileName = strtok(HTTP_req, "GET /");
    webFile = SD.open(fileName);
    if (webFile) {sendJsAnswer(cl);}
            else {sendErrorAnswer(fileName, cl);}
  }
  else if (StrContains(HTTP_req, "GET /") && StrContains(HTTP_req, ".pde")) {
    fileName = strtok(HTTP_req, "GET /");
    webFile = SD.open(fileName);
    if (webFile) {sendJsAnswer(cl);}
            else {sendErrorAnswer(fileName, cl);}
  }  
  else if (StrContains(HTTP_req, "GET /") && (StrContains(HTTP_req, ".gif") ||
                                              StrContains(HTTP_req, ".jpg") ||
                                              StrContains(HTTP_req, ".png"))) {
    fileName = strtok(HTTP_req, "GET /");
    webFile = SD.open(fileName);
    if (webFile) {sendImgAnswer(cl);}
            else {sendErrorAnswer(fileName, cl);}
  }
  
  // Ajax XML requests
        
  else if (StrContains(HTTP_req, "request_generic")) {
    sendXmlAnswer(cl);
    SetLEDs();
    responseGeneric(cl);
  }             
  else if (StrContains(HTTP_req, "request_network")) {
    sendXmlAnswer(cl);
    responseNetwork(cl);
  }     
 /* else if (StrContains(HTTP_req, "request_ports")) {
    sendXmlAnswer(cl);
    responsePorts(cl);
  }  */
  else if (StrContains(HTTP_req, "request_electro_control")) {
    sendXmlAnswer(cl);
    SetLEDs_electro();
    responseElectroControl(cl);
  }
  else if (StrContains(HTTP_req, "request_settings")) {
    sendXmlAnswer(cl);
    SetLEDs_settings();
    responseSettings(cl);
  }  
  else if (StrContains(HTTP_req, "request_electro")) {
    sendXmlAnswer(cl);
    responseElectro(cl);
  }
  else if (StrContains(HTTP_req, "request_el_freq")) {
    sendXmlAnswer(cl);
    checkOscill();
    responseElectroFreq(cl);
  }  
  else if (StrContains(HTTP_req, "request_sdcard")) {
    sendXmlAnswer(cl);
    responseSDcard(cl);
  }
  else if (StrContains(HTTP_req, "request_dash")) {
    checkPage();
    sendXmlAnswer(cl);
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
    char digits[14][3] = {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"};
    
    sendTagFloat("volt", "", ajaxUPrms[0], cl);

    for (int i = 1; i < MAX_UI_SENSORS; i++) {
      sendTagFloat(basePower, digits[i], ajaxUPrms[i], cl);
    }
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
    
  sendXmlVersion(cl);

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
  sendXmlVersion(cl);
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
  sendXmlVersion(cl);
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
  sendXmlVersion(cl);
  
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
  sendXmlVersion(cl);

  cl.println("<inputs>");
    sendTagByte("modulElectro", "", modulElectro, cl);
    sendElectro(cl);
    
    #ifdef ELECTRO_FEATURE
      sendTagFloat("voltage", "", ajaxUPrms[0], cl);
      sendTagFloat("power", "", ajaxUPrms[1], cl);
    #endif 
    
    sendTagLong("period", "", periodInMicros, cl);
    //sendTagLong("cyclosPeriod", "", cyclosPerPeriod, cl);
    //sendTagFloat("freqSupply", "", freqSupply, cl);
  cl.println("</inputs>");
}

/* Settings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

void SetLEDs_settings() {
  // Set modeNetWork
  if (StrContains(HTTP_req, "LED1=1")) {
    modeNetWork = MODE_MAJOR;
  } 
  else if (StrContains(HTTP_req, "LED1=0")) {
    modeNetWork = MODE_ONE;
  }

  // Set modeNetWork

  if (StrContains(HTTP_req, "RD2=5")) {
    currentDesign = HOME_DESIGN;
  } 
  else if (StrContains(HTTP_req, "RD2=6")) {
    currentDesign = MODERN_DESIGN;
  }
  else if (StrContains(HTTP_req, "RD2=7")) {
    currentDesign = DEFAULT_DESIGN;
  }  
  else if (StrContains(HTTP_req, "RD2=2")) {
    currentDesign = AMPERKA_DESIGN;
  } else {
    //currentDesign = AMPERKA_DESIGN;
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
} // SetLEDs_settings

void responseSettings(EthernetClient cl) {
  sendXmlVersion(cl);
  
  cl.println("<inputs>");
    printHTTPreq(cl);
    printHTTPreqTemp(cl);
    sendTagByte("modulElectro", "", modulElectro, cl);
 
    cl.print("<LED>");
      if (modeNetWork == MODE_MAJOR) {cl.print(strChecked);} 
                                else {cl.print(strUnChecked);}
    cl.println("</LED>");

    cl.print("<LED>"); // LED2
      if (currentDesign == AMPERKA_DESIGN) {cl.print(strChecked);}
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


    cl.print("<RD2>"); // LED2
      if (currentDesign == AMPERKA_DESIGN) {cl.print(2);}
      if (currentDesign == HOME_DESIGN) {cl.print(5);}
      if (currentDesign == MODERN_DESIGN) {cl.print(6);}
      if (currentDesign == DEFAULT_DESIGN) {cl.print(7);}
    cl.println("</RD2>");
          
  cl.println("</inputs>");
} // responseSettings

/* Check page
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

void checkPage() {
  currentPage = UNKNOWN_PAGE;
  
  if (StrContains(HTTP_req, "settings-page")) {
    currentPage = SETTINGS_PAGE;
  } 
  else if (StrContains(HTTP_req, "ports-page")) {
    currentPage = PORTS_PAGE;
  }
  else if (StrContains(HTTP_req, "supply-page")) {
    currentPage = SUPPLY_PAGE;
  }
  else if (StrContains(HTTP_req, "electro-page")) {
    currentPage = ELECTRO_PAGE;
  }  
}

/* Oscill
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

void checkOscill() {
  if (StrContains(HTTP_req, "oscill")) {
    oscill = true;
  } else {
      oscill = false;
    }
}

void responseElectroFreq(EthernetClient cl) {
  sendXmlVersion(cl);

  cl.println("<inputs>");
    for (int i = 0; i < MAX_FORM_POINTS; i++) {
      sendTagInt("u", "", pointsU[i], cl);
    }
    for (int i = 0; i < MAX_FORM_POINTS; i++) {
      sendTagInt("i", "", pointsI[i], cl);
    }    
  cl.println("</inputs>");
}

/* SD card
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

void responseSDcard(EthernetClient cl) {
  sendXmlVersion(cl);

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
  sendXmlVersion(cl);

  cl.println(F("<inputs>"));
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
      sendTagFloat("voltage", "", ajaxUPrms[0], cl);
      sendTagFloat("power", "", ajaxUPrms[1], cl);
    #endif    
    
    #ifdef PING_FEATURE
      sendDevicesOnline(cl);
    #endif
    
    #ifdef LAURENT_FEATURE
      sendTagString("laurent", "", lrequest, cl);
    #endif
    
    sendTagByte("mode", "", modeNetWork, cl);
    
    if (currentPage == PORTS_PAGE) {
      printHTTPreq(cl);
      sendDigitalPorts(cl);
    }

    if (currentPage == SUPPLY_PAGE) {
      #ifdef ELECTRO_FEATURE
        sendTagFloat("voltage", "", ajaxUPrms[0], cl);
        sendTagFloat("power", "", ajaxUPrms[1], cl);
      #endif 
    
      sendTagLong("period", "", periodInMicros, cl);
    }

    if (currentPage == ELECTRO_PAGE) {
      #ifdef ELECTRO_FEATURE
        sendTagByte("modulElectro", "", modulElectro, cl);
        sendElectro(cl);
      #endif 
    }
  cl.println(F("</inputs>"));
}

#endif // SERVER_FEATURE
