/*
  Arduino Serial Commander v.0.12
  part of Arduino Mega Server project
*/

import processing.serial.*;

String version = "0.12";
String COM_PORT = "COM3";
//String COM_PORT = "COM10";
int COM_SPEED = 9600;
Serial port;

byte RECEIVE = 1;
byte SEND = 2;
byte listingMode = RECEIVE;
byte ON = 1;
byte OFF = 0;
byte ledMode = OFF;
String currentFile = "index.htm";
String filePath = "";
String lines[];
byte binarys[];

int currentLine = 0;
long currentByte = 0;
String receivingLines[] = {"", "", "", "", "", "", "", "", "", "", "", "", ""};
int currentReceiving = 0;

// Font
PFont font;

// Work logic
boolean TRANSFER = false;
boolean DONE = false;
boolean ANSWER = false;

/* FUNCTIONS
----------------------------------------------------- */

void sendWorks() {
  listingMode = SEND;
  clearListingBox();

  // Go
  if (currentLine < lines.length && TRANSFER) {
    transfer();
  }

  // Done
  if (currentLine >= lines.length && !DONE) {
    sendEndTransfer();
    DONE = true; 
    TRANSFER = false;
    //ANSWER = true;
    //clearLines();
  }
  
  // Answer
  if (ANSWER) {
    answer();
  }

  // Button "Upload"
  if (regionMouseOver(butUploadX, butUploadY, butUploadLenX, butUploadLenY)) {
    mouseOverButUpload = true;  
    
    if (mousePressed == true) {
      delay(700);
      TRANSFER = true;
      DONE = false; 
      reInit();
      loadBinarys();
      sendStartTransfer();
    }
    
  } else {
      mouseOverButUpload = false;
    } // regionMouseOver
    
  if (TRANSFER || mouseOverButUpload) {
    drawButton(butUploadX, butUploadY, butUploadLenX, butUploadLenY, butUploadTitle, butUploadColorActive, butUploadStrokeActive);
  } else {
    drawButton(butUploadX, butUploadY, butUploadLenX, butUploadLenY, butUploadTitle, butUploadColorPassive, butUploadStrokePassive);
  }  

  // Button "Open"
  if (regionMouseOver(butOpenX, butOpenY, butOpenLenX, butOpenLenY)) {
    drawButton(butOpenX, butOpenY, butOpenLenX, butOpenLenY, butOpenTitle, butOpenColorActive, butOpenStrokeActive);

    if (mousePressed == true) {
      delay(300);
      dialogOpenFile(); 
    }
    
  } else {
      drawButton(butOpenX, butOpenY, butOpenLenX, butOpenLenY, butOpenTitle, butOpenColorPassive, butOpenStrokePassive);
    } // regionMouseOver
    
  drawInfoFile(40, currentLine, lines.length);
  drawInfoPort(40, currentLine, lines.length);
  
  if (DONE) {
    drawProgress(100, 100);
  } else {
      if (TRANSFER) {
        drawTransfering();
      } else {
          drawProgress(0, 100);
        }
    }

  drawListing();
} // sendWorks


void receiveWorks() {
  listingMode = RECEIVE;
  clearListingBox();
  
  readPort();
  
  // Button "Send command"
  if (regionMouseOver(butModeX, butModeY, butModeLenX, butModeLenY)) {
    drawButton(butModeX, butModeY, butModeLenX, butModeLenY, butModeTitle, butModeColorActive, butModeStrokeActive);

    if (mousePressed == true) {
      delay(300);
      if (ledMode == ON) {
      port.write(LED_OFF);
      port.write('\n');
      ledMode = OFF;
    } else {
        port.write(LED_ON);
        port.write('\n');
        ledMode = ON;
      }
    delay(40);
    }
  
  } else {
      drawButton(butModeX, butModeY, butModeLenX, butModeLenY, butModeTitle, butModeColorPassive, butModeStrokePassive);
    } // regionMouseOver
    
  drawMonitoring(65);
  drawInfoPort(65, currentLine, lines.length);    
  drawListing();
} // receiveWorks

void helpWorks() {
  listingMode = RECEIVE;
  drawHelp();
}

/* Setup
----------------------------------------------------- */

void setup() {
  viewInit();
  fontInit();
  serialInit();
  receivingInit();
  loadLines();
  loadBinarys();
}

/* Draw
----------------------------------------------------- */

void draw() {
  clearBackground();
  drawMenu();

  switch(menuActive) {
    case 0:
      sendWorks();
      break;
    case 1:
      if (!TRANSFER) {
        receiveWorks();
      }
      break;
    case 2:
      if (!TRANSFER) {
        helpWorks();
      }
      break;      
  }

  drawLogo(360, 304);
} // draw

