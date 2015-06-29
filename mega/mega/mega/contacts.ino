/*
  Modul Contacts
  part of Arduino Mega Server project
*/

#ifdef CONTACTS_FEATURE

byte cont1pin = 27; // HOM
byte cont2pin = 31; // CLO

byte OPEN = 1;
byte CLOSE = 0;

char cont1sign[] = ";"; char cont1object[] = "contHOM";
char cont2sign[] = "+"; char cont2object[] = "contCLO";

char cont1openMess[] = "Open!"; char cont1closeMess[] = "Closed";
char cont2openMess[] = "Sliv!"; char cont2closeMess[] = "Norm";

// states
  // 0 - open
  // 1 - close
  // 2 - not defined
  // 3 - not defined and not contXstatus
byte cont1state = 2; byte old_cont1state = 3; byte cont1objectState = 2;
byte cont2state = 2; byte old_cont2state = 3; byte cont2objectState = 2;

void contactsInit() {
  pinMode(cont1pin, INPUT);
  pinMode(cont2pin, INPUT);
  modulContacts = 1;
}

void printAndSend(char sign[], char mess[]) {
  timeStamp();
  Serial.print(sign);
  Serial.println(mess);
}

void contactsWorks() {
  // cont1 (HOM)
  cont1state = digitalRead(cont1pin);

  if (cont1state != old_cont1state) {
      old_cont1state = cont1state;
      
      if (cont1state == 0) {
        cont1objectState = OPEN;
        printAndSend(cont1sign, cont1openMess);
        sendRequest(cont1object, OPEN);
      } else {
        cont1objectState = CLOSE;
        printAndSend(cont1sign, cont1closeMess);
        sendRequest(cont1object, CLOSE);
      }
  }
  
  if (cycle1m) {
    old_cont1state = cont1state;

    if (cont1state == 0) {
      printAndSend(cont1sign, cont1openMess);
      sendRequest(cont1object, 1);
    } else {
        printAndSend(cont1sign, cont1closeMess);
        sendRequest(cont1object, 0);
      }
  }

  // cont2 (CLO)
  cont2state = digitalRead(cont2pin);
  
  if (cont2state == 1) {
    if (cont2state != old_cont2state) {
      old_cont2state = cont2state;
      printAndSend(cont2sign, cont2openMess);
      sendRequest(cont2object, 1);
    }
  } else {
      if (cont2state != old_cont2state) {
        old_cont2state = cont2state;
        printAndSend(cont2sign, cont2closeMess);
        sendRequest(cont2object, 0);
      }
  }

  if (cycle1m) {
    old_cont2state = cont2state;

    if (cont2state == 1) {
      printAndSend(cont2sign, cont2openMess);
      sendRequest(cont2object, 1);
    } else {
        printAndSend(cont2sign, cont2closeMess);
        sendRequest(cont2object, 0);
      }
  }
} // contactsWorks

#endif // CONTACTS_FEATURE
