/*
  Modul LEDs
  part of Arduino Mega Server project
*/

#ifdef LEDS_FEATURE

byte R = 0;
byte G = 1;
byte B = 2;
byte led1[] = {6, 7, 5}; // RGB pins

byte fade = 3;
byte bright = 30;

void ledsInit() {
  pinMode(led1[R], OUTPUT); 
  pinMode(led1[G], OUTPUT);
  pinMode(led1[B], OUTPUT);
  black(led1);
  modulLeds = 1;
}

// set color LED
void black  (byte pins[])         {analogWrite(pins[R], 0); analogWrite(pins[G], 0); analogWrite(pins[B], 0);}
void white  (byte pins[], byte v) {analogWrite(pins[R], v); analogWrite(pins[G], v); analogWrite(pins[B], v);}
void red    (byte pins[], byte v) {analogWrite(pins[R], v); analogWrite(pins[G], 0); analogWrite(pins[B], 0);}
void green  (byte pins[], byte v) {analogWrite(pins[R], 0); analogWrite(pins[G], v); analogWrite(pins[B], 0);}
void blue   (byte pins[], byte v) {analogWrite(pins[R], 0); analogWrite(pins[G], 0); analogWrite(pins[B], v);}
void yellow (byte pins[], byte v) {analogWrite(pins[R], v); analogWrite(pins[G], v); analogWrite(pins[B], 0);}
void magenta(byte pins[], byte v) {analogWrite(pins[R], v); analogWrite(pins[G], 0); analogWrite(pins[B], v);}
void cyan   (byte pins[], byte v) {analogWrite(pins[R], 0); analogWrite(pins[G], v); analogWrite(pins[B], v);}
void color  (byte pins[], byte r, byte g, byte b) {analogWrite(pins[R], r); analogWrite(pins[G], g); analogWrite(pins[B], b);}

void analogShow(byte pins[]) {
  int r, g, b;
  for (r = 0; r < 256; r++) {analogWrite(pins[R], r); delay(fade);} // blue - magenta
  for (b = 255; b > 0; b--) {analogWrite(pins[B], b); delay(fade);} // magenta - red
  for (g = 0; g < 256; g++) {analogWrite(pins[G], g); delay(fade);} // red - yellow
  for (r = 255; r > 0; r--) {analogWrite(pins[R], r); delay(fade);} // yellow - green
  for (b = 0; b < 256; b++) {analogWrite(pins[B], b); delay(fade);} // green - green/blue
  for (g = 255; g > 0; g--) {analogWrite(pins[G], g); delay(fade);} // green/blue - blue
}

#endif // LEDS_FEATURE
