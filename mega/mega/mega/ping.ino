/*
  Modul Ping
  part of Arduino Mega Server project
  Response net devices
  
  Warning! Use modify ICMPPing library
*/

#ifdef PING_FEATURE

#include <ICMPPing.h> // + 1378 bytes

byte const TOTAL_NET_DEVICES = 10;
char netDevicesNames[TOTAL_NET_DEVICES][4] = {"SWH", "HOM", "MED", "CMP", "PRN", "MGA", "UN1", "UN2", "LRN", "APC"};
byte ips[TOTAL_NET_DEVICES][4] = {{192, 168, 2, 16}, // 1 SWITCH
                                  {192, 168, 2, 8},  // 2 HOME
                                  {192, 168, 2, 28}, // 3 MEDIA
                                  {192, 168, 2, 6},  // 4 COMP
                                  {192, 168, 2, 18}, // 5 PRINTER
                                  {127, 168, 2, 37}, // 6 MEGA
                                  {192, 168, 2, 17}, // 7 UNO1
                                  {192, 168, 2, 38}, // 8 UNO2
                                  {192, 168, 2, 19}, // 9 LAURENT
                                  {192, 168, 2, 14}};//10 APC
byte online[TOTAL_NET_DEVICES] = {0, 0, 0, 0, 0, 0, 0, 0, 0, 0};
byte countOnline; // for cycle

SOCKET pingSocket = 0;
char pingMessage[64]; // 256 original
ICMPPing ping(pingSocket);

void pingInit() {
  modulPing = 1;
}

void pingWorks() {
  for (countOnline = 0; countOnline < TOTAL_NET_DEVICES; countOnline++) {
    if (countOnline == 5) { // self
      online[countOnline] = 1;
      continue;
    }
    online[countOnline] = ping(1, ips[countOnline], pingMessage);
    /*Serial.print(netDevicesNames[countOnline]);
    Serial.print(": ");
    Serial.print(online[countOnline]);
    Serial.print(" ");
    Serial.println(pingMessage);*/
  }   
}

#endif // PING_FEATURE
