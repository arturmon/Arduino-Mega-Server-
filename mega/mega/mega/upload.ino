/*
  Modul Serial Upload
  part of Arduino Mega Server project
*/

#ifdef UPLOAD_FEATURE

// Serial
char incomingByte; // to read incoming serial data

char buffer[4] = ""; // for markers
char buffer2[4] = ""; // for clear buffer <!>
char buffer_spaces[4] = {' ', ' ', ' '};

//char fn[20] = ""; // for name
char fn_temp[20] = "";
char fn_empty[20] = "";

// Serial stream markers
char START_FILENAME_MARKER[4] = "FAA";
char STOP_FILENAME_MARKER[4] =  "FBB";
char START_TRANSFER_MARKER[4] = "GOO";
char STOP_TRANSFER_MARKER[4] =  "?Z?";
char START_ERROR_PROTECTION_MARKER[4] = "E1R";
char STOP_ERROR_PROTECTION_MARKER[4] =  "E2R";
char LED_ON[4] =  "LD1";
char LED_OFF[4] = "LD0";

File myFile;

// Logic
boolean name = false;
boolean start = false;
boolean done = false;
boolean answer = false;
boolean answer_short = false;
boolean skipTransfer = false;

long countFirst = 0;

void uploadInit() {
  modulUpload = 1;
}

void uploadWorks() {
  // Serial stream commands
  
  if (checkBuffer(LED_ON)) {
    clearBuffer();
    digitalWrite(6, HIGH);
    Serialprint("OK, received: ");
    Serial.println(LED_ON);
  }
  
  if (checkBuffer(LED_OFF)) {
    clearBuffer();
    digitalWrite(6, LOW);
    Serialprint("OK, received: ");
    Serial.println(LED_OFF);
  }

  // check START_FILENAME_MARKER and set mode "name"
  if (checkBuffer(START_FILENAME_MARKER)) {
    clearBuffer();
    name = true;
    mode = MODE_UPDATE;
  } 
    
  // check STOP_FILENAME_MARKER and open file on SD-card to write
  if (checkBuffer(STOP_FILENAME_MARKER)) {
    clearBuffer();
    name = false;
    copyFN();
    reversFN();

    if (SD.exists(fn)) {
      SD.remove(fn);
    }
    myFile = SD.open(fn, FILE_WRITE);
  }    

  // check START_ERROR_PROTECTION_MARKER and set mode "skipTransfer"
  if (checkBuffer(START_ERROR_PROTECTION_MARKER)) {
    clearBuffer();
    skipTransfer = true;
    start = false;
  }  

  // check STOP_ERROR_PROTECTION_MARKER and continue transfer
  if (checkBuffer(STOP_ERROR_PROTECTION_MARKER)) {
    clearBuffer_spaces();
    skipTransfer = false;
    start = true;
  }   
 
  if (checkBuffer(START_TRANSFER_MARKER)) {
    clearBuffer_spaces();
    start = true;
    countFirst = 0;
    done = false;
    mode = MODE_UPDATE;
  }
  
  if (checkBuffer(STOP_TRANSFER_MARKER)) {
    clearBuffer();
    done = true;
    start = false;
  }  
  
  if (Serial.available() > 0) {
    incomingByte = getBuffer(Serial.read());
    
    if (name) {
      addFN(incomingByte);
    }
    
    if (start) {
      if (myFile) {
        countFirst++;
        if (countFirst > 4) {
          if (!skipTransfer) {
            myFile.print(incomingByte);
          }
        }
      } else {
         //Serial.println("error opening file");
        }
    } // if (start)
  } // if (Serial.available() > 0) 
  
  if (done) {
    myFile.close();
    Serial.end();
    copyFN();
    clearFNonly();
    done = false;
    skipTransfer = false;
    answer_short = true;
  }
  
  if (answer_short) {
    delay(300);
    Serial.begin(9600);
    Serial.print("\n[");
    Serial.print(fn_temp);
    Serial.println("]");
    Serial.println("OK");
    delay(300);
    answer_short = false;
    mode = MODE_SERVER;
  }
} // uploadWorks

/* ----------------------------------------
  Function addFN(char c)
    Add char to FileName and move old chars
    TODO: rewrite function with cycle
------------------------------------------- */

void addFN(char c) {
  fn[19] = fn[18];
  fn[18] = fn[17];
  fn[17] = fn[16];
  fn[16] = fn[15];  
  fn[15] = fn[14];
  fn[14] = fn[13];
  fn[13] = fn[12];
  fn[12] = fn[11];
  fn[11] = fn[10];
  fn[10] = fn[9];
  fn[9] = fn[8];
  fn[8] = fn[7];
  fn[7] = fn[6];
  fn[6] = fn[5];
  fn[5] = fn[4];
  fn[4] = fn[3];
  fn[3] = fn[2];
  fn[2] = fn[1];
  fn[1] = fn[0];
  fn[0] = c;
}

void copyFN() {
  for (int i = 0; i < 20; i++) {
    fn_temp[i] = fn[i];
  }
}

void reversFN() {
  for (int i = 18; i >= 0; i--) {
    if (fn[i] == fn[19]) {
      continue;
    } else {
        for (int j = 0; j <= i; j++) {
          fn[j] = fn_temp[i - j];
        }
        break;
      }
  }
}

void clearFN() {
  for (int i = 0; i < 20; i++) {
    fn[i] = fn_empty[i];
    fn_temp[i] = fn_empty[i];
  }
}

void clearFNonly() {
  for (int i = 0; i < 20; i++) {
    fn[i] = fn_empty[i];
  }
}

// Markers

void addBuffer(char c) {
  buffer[2] = buffer[1];
  buffer[1] = buffer[0];
  buffer[0] = c;
}

void clearBuffer() {
  buffer[0] = buffer2[0];
  buffer[1] = buffer2[1];
  buffer[2] = buffer2[2];
}

void clearBuffer_spaces() {
  buffer[0] = buffer_spaces[0];
  buffer[1] = buffer_spaces[1];
  buffer[2] = buffer_spaces[2];
}

boolean checkBuffer(char s[]) {
  if (buffer[2] == s[0] && buffer[1] == s[1] && buffer[0] == s[2]) {
    return true;
  } else {
      return false;
    }
}

void replaceBuffer(char s[]) {
  buffer[2] = s[0];
  buffer[1] = s[1];
  buffer[0] = s[2];
}

char getBuffer(char c) {
  char temp = buffer[2];
  
  buffer[2] = buffer[1];
  buffer[1] = buffer[0];
  buffer[0] = c;
  
  return temp;
}

#endif // UPLOAD_FEATURE
