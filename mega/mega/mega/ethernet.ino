/*
  Modul Ethernet
  part of Arduino Mega Server project
*/

// Ethernet settings
byte SELF_MAC[] = {0x00, 0x2A, 0xF5, 0x12, 0x67, 0xFE};
byte SELF_IP[] =  {192, 168, 2, 37};

void ethernetInit() {
  Ethernet.begin(SELF_MAC, SELF_IP);
  modulEthernet = 1;
}

void enableEthernet()  {pinMode(10, OUTPUT); digitalWrite(10, LOW);}
void disableEthernet() {pinMode(10, OUTPUT); digitalWrite(10, HIGH);}

void enableSDcard()  {pinMode(4, OUTPUT); digitalWrite(4, LOW);}
void disableSDcard() {pinMode(4, OUTPUT); digitalWrite(4, HIGH);}
