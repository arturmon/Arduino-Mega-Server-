/*
  Modul Answer
  part of Arduino Serial Commander
  part of Arduino Mega Server project
*/


String cBack = "";
String receivingString = "";

void answer() {
  /*  
  char c = char(port.read());

  if (c != '\n') { // make string
    cBack += c;
  } else {
      int z = currentLine + 10;
      if (z >= lines.length) {
        z = lines.length - 1;
      }
      lines[z] = cBack; // заполняем массив lines
      cBack = "";
      currentLine++;
        
      if (currentLine >= lines.length) { // если файл обратно получен
        ANSWER = false;
      }
    }
  */
} // answer

void receivingInit() {
  for (int i = 0; i < 12; i++) {
    receivingLines[i] = "";
  }
} 

void readPort() { 
 // (myPort.available() > 0) {
 // char c = char(port.read());
 
 int b = port.read();
 char c = char(b);
 
  if (c != '\n') { // make string
    if (byte(c) != -1) {
      receivingString += c;
    }
  } else {
      for (int i = 11; i > 0; i--) {
        receivingLines[i] = receivingLines[i - 1];
      }
      receivingLines[0] = receivingString;
      receivingString = "";
    }
} // readPort

