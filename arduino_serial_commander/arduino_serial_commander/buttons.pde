/*
  Modul Buttons v.0.1
  part of Arduino Serial Commander
  part of Arduino Mega Server project
*/

// Button "Upload"
int butUploadX = 50;
int butUploadY = 296;
byte butUploadLenX = 100;
byte butUploadLenY = 20;
String butUploadTitle = "Upload!";
color butUploadColorActive = color(130, 80, 80);
color butUploadStrokeActive = color(160, 120, 120);
color butUploadColorPassive = color(140);
color butUploadStrokePassive = color(153);
boolean mouseOverButUpload = false;

// Button "Open"
int butOpenX = 165;
int butOpenY = 296;
byte butOpenLenX = 40;
byte butOpenLenY = 20;
String butOpenTitle = "Open";
color butOpenColorActive = color(80, 130, 80);
color butOpenStrokeActive = color(120, 160, 120);
color butOpenColorPassive = color(140);
color butOpenStrokePassive = color(153);

// Button "Send command"
int butModeX = 50;
int butModeY = 296;
byte butModeLenX = 120;
byte butModeLenY = 20;
String butModeTitle = "Send command ";
color butModeColorActive = color(160, 90, 60);
color butModeStrokeActive = color(160, 120, 120);
color butModeColorPassive = color(140);
color butModeStrokePassive = color(153);

void drawButton(int x, int y, byte lenX, byte lenY, String title, color butColor, color butStroke) {
  fill(butColor);
  stroke(butStroke);
  rect(x, y, lenX, lenY);
  fill(255);
  text(title, x + (lenX / 2 - title.length() * 3), butUploadY + 15);
}

