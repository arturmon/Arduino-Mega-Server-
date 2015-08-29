/*
  Mod for Arduino Mega Server project
  fix bug delay answer server
*/

#ifndef ethernetserver_h
#define ethernetserver_h

#include "Server.h"

class EthernetClient;

class EthernetServer : 
public Server {
private:
  uint16_t _port;
  //void accept();
  void accept_(int sock);
public:
  EthernetServer(uint16_t);
  //EthernetClient available();
  EthernetClient available_(int sock);
  virtual void begin();
  virtual void begin_(int sock);
  virtual size_t write(uint8_t);
  virtual size_t write(const uint8_t *buf, size_t size);
  using Print::write;
};

#endif
