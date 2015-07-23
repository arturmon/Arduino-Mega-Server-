/*
  Modul Listing
  part of Arduino Serial Commander
  part of Arduino Mega Server project 
*/

String listingLines[];
int currLine = 0;
//byte trimLength = 82; // size 10
byte trimLength = 70; // size 12

// infoWindow
int windowX = 30;
int windowY = 90;
int windowLenX = 470;
int windowLenY = 90;
int windowTextX = windowX + 4;

void clearListingBox() {
  stroke(50);
  fill(0, 0, 0);
  rect(windowX, windowY, windowX + windowLenX, windowY + windowLenY);
}

void drawListing() {
  currLine = currentLine;

  if (lines.length - currentLine < 11) {
    currLine = lines.length - 11;
  }
  
  textFont(font, 12);
  
  for (int h = 0; h < 11; h++) {
    if (listingMode == RECEIVE) {
      fill(160, 240, 160);
      text(trimString(receivingLines[11 - h], trimLength), windowTextX, 110 + 15 * h);
    } else {
        fill(255, 200, 255);
        text(trimString(lines[currLine + h], trimLength), windowTextX, 110 + 15 * h);
    }
  }  
  textFont(font, 12); 
} // drawListing
