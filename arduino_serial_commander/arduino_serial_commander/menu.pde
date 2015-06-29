/*
  Modul Menu v.0.1
  part of Arduino Serial Commander
  part of Arduino Mega Server project 
*/

byte MAX_MENU = 3;
int PUNKT_WIDTH = MAX_WIDTH / MAX_MENU;
byte PUNKT_HEIGHT = 30;
String[] menuItems = {"Uploading", "Monitoring", "Help"};
int menuActive = 0;

color menuColor = color(110, 110, 110);
color menuStroke = color(180, 180, 180);
color menuColorActive = color(0, 163, 168);
color menuStrokeActive = color(200, 200, 240);
color menuColorOver = color(120, 120, 130);
color menuStrokeOver = color(180, 180, 120);

void drawMenu() {
  for (int i = 0; i < MAX_MENU; i++) {
    if (menuActive == i) {
      fill(menuColorActive);
    } else {
        fill(menuColor);
      }

    if (regionMouseOver(PUNKT_WIDTH * i, MAX_HEIGHT - PUNKT_HEIGHT, PUNKT_WIDTH, PUNKT_HEIGHT)) {
      if (i != menuActive) {
        fill(menuColorOver);
      }
      if (mousePressed == true) {
        delay(100);
        menuActive = i;
      }
    }      
    noStroke();
    rect(PUNKT_WIDTH * i, MAX_HEIGHT - PUNKT_HEIGHT, PUNKT_WIDTH, PUNKT_HEIGHT);
    stroke(menuStroke);
    line(PUNKT_WIDTH * i, MAX_HEIGHT - PUNKT_HEIGHT, PUNKT_WIDTH * i, MAX_HEIGHT);
    fill(255);
    text(menuItems[i], PUNKT_WIDTH * i + (PUNKT_WIDTH / 2 - menuItems[i].length() * 3), MAX_HEIGHT - PUNKT_HEIGHT + 19); 
  }
} // drawMenu
