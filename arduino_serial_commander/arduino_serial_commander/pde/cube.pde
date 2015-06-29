/*   
 * Interactive RGB Cube
 * v1.0  2011-12-12
 * v1.1  2011-12-22  input handling adapted for Android
 * v1.2  2012-01-11  small improvements
 * tested with OpenProcessing v1.5.1 and v2.0a4
 *
 * press mouse button to rotate cube
 * press +/- to change cube resolution
 * press a/q to change cube size
/*

//import processing.opengl.*;
 
int wm = 90;
int dim = 3;  // RGB_Cube resolution
float gridSize = wm / dim;
float rescale = 0.95;      // 0.2 .. 1.0
float boxSize = gridSize * rescale;
float rotX = PI*-3/4;
float rotY = -PI/6;
float angleDelta = 0.002;
float rotAngle = -angleDelta;
boolean showFPS = false;
boolean menuMode = false;
int buttonSize = 68;
int by = 739;  // button top Y-value

/* ----------------------------------------------------- */

void setup() {
  size(200, 180, P3D);
  //size(screenWidth, screenHeight, P3D); // for Android
  by = height - buttonSize;
  //orientation (PORTRAIT); // for Android
  noStroke();
  noSmooth();
  mouseY = height * 100 / 45;
}
 
void reset() {
  dim = 6;
  rescale = 0.75;
  gridSize = wm / dim;
  boxSize = gridSize * rescale;
  rotX = PI*-3/4;
  rotY = -PI/6;
  frameRate(30); //����� ���������
}

/* ----------------------------------------------------- */

void draw() {
  background(0);
  noSmooth();
  if (mouseY > by)
    //drawButtons();
  //frameRate(30);
  fill(222);
  textMode(SCREEN);
  if (frameCount < 200) {
    text ("press +/- to change resolution, a/q to change cube size, r to reset", 10, 20);
  }
  if (showFPS) {
    text (round(frameRate) + " fps",width - 50,20);//������ fps
  }
  lights();
  translate(width / 2, height * 0.47, 0);  //����� ������
  if (mousePressed) {
    if (!menuMode) {
      rotX -= 0.002 * (pmouseX - mouseX);
      rotY += 0.002 * (pmouseY - mouseY);
    } 
    else if ((mouseX >= buttonSize) && (mouseX <= 3*buttonSize) && (mouseY > by)) { // +/- button ?
      doButtonCommand();
    }
  }
  rotX += rotAngle; 
  rotateX(rotY);
  rotateY(rotX);
 
  // draw RGB cubes
  strokeWeight(0);
  float d2 = dim * 0.5 - 0.5;
  for (int r = 0; r < dim; r++) {
    for (int g = 0; g < dim; g++) {
      for (int b = 0; b < dim; b++) {
        pushMatrix();
        fill(255 * r / (dim - 1), 255 * g / (dim - 1), 255 * b / (dim - 1));
        translate((r - d2) * gridSize, (g - d2) * gridSize, (b - d2) * gridSize);
        box(boxSize);
        popMatrix();       
      }
    }
  }
}

void drawRect(int x) {
  strokeWeight(4);
  stroke(88);
  fill(222);
  rect (x, by, buttonSize, buttonSize);   
}

void changeGridCount(int delta) {
  dim = constrain(dim + delta, 2, 16);
  gridSize = wm / dim;
  boxSize = gridSize * rescale;
}

void changeGridSize(int delta) {
  rescale = constrain(rescale + 0.02 * delta, 0.2, 1.0);
  boxSize = gridSize * rescale;
}

void changeRotation() {
  if (rotAngle < 0.0) rotAngle = angleDelta;
  else if (rotAngle > 0.0) rotAngle = 0.0;
  else rotAngle = -angleDelta;
}

void mousePressed() {
  menuMode = (mouseY > by);
  if (menuMode) doButtonCommand();
}

void mouseReleased() {
  menuMode = false;
}

void doButtonCommand() {
  if      (mouseX <     buttonSize) reset();
  else if (mouseX < 2 * buttonSize) changeGridSize(-1);
  else if (mouseX < 3 * buttonSize) changeGridSize(+1);
  else if (mouseX < 4 * buttonSize) changeGridCount(-1);
  else if (mouseX < 5 * buttonSize) changeGridCount(+1);
  else if (mouseX < 6 * buttonSize) changeRotation();
  else if (mouseX < 7 * buttonSize) showFPS = !showFPS;
}

void keyPressed() {
  if      (key == 'f') showFPS = !showFPS;
  else if (key == 'r') reset();
  else if (key == 's') save("RGB_Cube.png");
  else if (key == 'o') changeRotation();
  else if (key == 'q') changeGridSize(+1);
  else if (key == 'a') changeGridSize(-1);
  else if (key == '+') changeGridCount(+1);
  else if (key == '-') changeGridCount(-1); 
}
 
void drawButtons() {
  int x = 1; // reset
  drawRect(x);
  noStroke();
  fill(88);
  rect (x + 25, by + 26, 16, 16);
 
  x = 1 + buttonSize;
  drawRect (x); // size -
  line (x + 24, by + 33, x + 40, by + 33);
   
  x = 1 + 2 * + buttonSize;
  drawRect (x); // size +
  line (x + 24, by + 33, x + 44, by + 33);
  line (x + 34, by + 23, x + 34, by + 43);
 
  x = 1 + 3 * buttonSize;
  drawRect (x); // grid -
  strokeWeight(0);
  fill(88);
  for (int ni = 0; ni < 4; ni++) {
    rect (x + 19 + 26 * (ni%2), by + 18 + 26 * (ni/2), 6, 6);
  }
  x = 1 + 4 * buttonSize;
  drawRect(x); // grid +
  strokeWeight(0);
  fill(88);
  for (int ni = 0; ni < 16; ni++) {
    rect (x + 13 + 12 * (ni%4), by + 12 + 12 * (ni/4), 6, 6);
  } 
  x = 1 + 5 * buttonSize;
  drawRect(x);   // rotate +/-
  noStroke();
  fill(88);
  ellipse (x + 33, by + 35, 29, 14);
  fill(222);
  ellipse (x + 33, by + 33, 22, 10);
 
  x = 1 + 6 * buttonSize;
  drawRect(x);   // rotate +/-
  fill(88);
  text ("fps", x + 26, by + 38);   
}
