/*
  Modul Serial Operations
  part of Arduino Serial Commander
  part of Arduino Mega Server project  
*/

// stream markers
String START_TRANSFER_FILENAME = "FAA";
String END_TRANSFER_FILENAME = "FBB";
String START_TRANSFER_FILE = "GOO";
String END_TRANSFER_FILE = "?Z?";
String START_ERROR_PROTECTION = "E1R";
String END_ERROR_PROTECTION = "E2R";
String LED_ON = "LD1";
String LED_OFF = "LD0";

void serialInit() {
  // Show serial ports
  //println(Serial.list());
  //port = new Serial(this, Serial.list()[0], COM_SPEED);
  port = new Serial(this, COM_PORT, COM_SPEED);
}

void sendStartTransfer() {
  port.write(START_TRANSFER_FILENAME);
  port.write(currentFile);
  port.write(END_TRANSFER_FILENAME);
  port.write(START_TRANSFER_FILE);
  port.write('\n');
  delay(50);
}  

void sendEndTransfer() {
  port.write(END_TRANSFER_FILE);
}

void sendErrorProtection() {
  port.write(START_ERROR_PROTECTION);
  port.write('\n');
  delay(40); 
  for (int i = 0; i < 8; i++) {
    port.write("12345678901234567890123456789012345678901234567890123456789012345678901234567890");
    port.write('\n');
    delay(40);
  }
  port.write(END_ERROR_PROTECTION);
  port.write('\n');
  delay(40); 
} 

void transfer() {
  boolean protect = false;

  for (int i = 0; i < binarys.length; i++) {
    if (binarys[i] == 10 && !protect) {
      sendErrorProtection();
      protect = true;
    }
    port.write(binarys[i]);
  } 
  currentLine = 5000;
}

/*
byte[] binarys2 = new byte[40000];

void test() {
  for (int i = 0; i < 40000; i++) {
    binarys2[i] = 65;
  }
}

void transfer() {
  boolean protect = false;
  
  test();
  
  for (int i = 0; i < binarys2.length; i++) {
    if (binarys2[i] == 10 && !protect) {
      sendErrorProtection();
      protect = true;
    }
    port.write(binarys2[i]);
  } 
  currentLine = 5000;
}
*/
