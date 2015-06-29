/*
  Modul Generic Functions v.0.1
  part of Arduino Serial Commander
  part of Arduino Mega Server project
*/

int MAX_WIDTH = 570;
int MAX_HEIGHT = 380;

void viewInit() {
  size(MAX_WIDTH, MAX_HEIGHT);
  smooth();
  //rectMode(CORNER);
}

void fontInit() {
  font = loadFont("Courier-48.vlw");
  textFont(font, 12);
}

void clearBackground() {
  background(30, 30, 30);
}

void drawInfoFile(int y, int current, int total) {
  fill(255, 255, 255); text("File:",   30, y); fill(160, 240, 160); text(currentFile,            70, y);
  fill(255, 255, 255); text("Lines:", 180, y); fill(160, 240, 160); text(current + "/" + total, 225, y);
}  

void drawInfoPort(int y, int current, int total) {
  fill(255, 255, 255); text("Port:",  310, y); fill(160, 240, 160); text(COM_PORT,  350, y);
  fill(255, 255, 255); text("Speed:", 440, y); fill(160, 240, 160); text(COM_SPEED, 490, y);
}

void drawMonitoring(int y) {
  fill(160, 240, 160);
  text("Monitoring COM port...", 50, y);
}

void drawHelp() {
  fill(240, 240, 240); text("Dev with Processing 1.5.1", 60, 60);
  fill(240, 240, 240); text("Yes, it's only alpha 0.1...", 60, 80);
  fill(160, 240, 160); text(":)", 60, 100);
  fill(160, 240, 160); text("Arduino Serial Commander", 60, 140);
  fill(160, 240, 160); text("part of Arduino Mega Server project", 60, 160);
  fill(160, 240, 160); text("(for sending files to Mega Server)", 60, 180);
}

void drawLogo(int x, int y) {
  fill(220, 200, 80);
  text("Arduino Serial Commander", x, y);
  fill(200, 200, 200);
  text("version " + version, x + 90, y + 15);
}

String trimString(String s, int len) {
  String s2;
  if (s.length() > len) {
    s2 = s.substring(0, len);
  } else {
      s2 = s.substring(0, s.length());
    }
  return s2;
}

boolean regionMouseOver(int x, int y, int lenX, int lenY) {
  if (mouseX > x && mouseX < x + lenX &&
      mouseY > y && mouseY < y + lenY) {
    return true;
  } else {
      return false;
    }
}

