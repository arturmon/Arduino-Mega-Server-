/* -----------------------------------------
   
  cube2.pde v.0.11
  part of Arduino Mega Server project
  
  Correct errots:
  lifer correct
-------------------------------------------- */

/* sketch:  RGB_Cube.pde
   Interactive RGB Cube
   press mouse button to rotate cube
   press +/- to change cube resolution
   press a/q to change cube size
   v1.0  2011-12-12
   v1.1  2011-12-22  input handling adapted for Android
   v1.2  2012-01-11  small improvements
   tested with OpenProcessing v1.5.1 and v2.0a4
   import processing.opengl.*;
*/

int wm = 100; // Размер гиперкуба
int dim = 6; // Кол-во кубиков
float gridSize = wm / dim;
float rescale = 0.4; // Размер кубиков (0.2 .. 1.0)
float boxSize = gridSize * rescale;
float rotX = PI * -3/4;
float rotY = -PI / 5;
float angleDelta = 0.008;
float rotAngle = -angleDelta;
boolean showFPS = false;
boolean menuMode = false;
int buttonSize = 68;
int by = 739; // button top Y-value

long timeSec;
long timer1s;
boolean cycle1s = false;

int xxx = 2; int dx = 1;
int yyy = 3; int dy = 1;
int zzz = 4; int dz = 1;

//int fig = 1; // Вид объекта (0 -, 1 box, 2 sphere, 3 mix)

// Var's for connect to JavaScript
float for_dash_marker1 = 0;
float for_dash_marker2 = 0;
float for_dash_marker3 = 0;
int for_electro_marker1 = 0;
int for_electro_marker2 = 0;
int for_electro_marker3 = 0;
int for_electro_marker4 = 0;
int for_electro_marker5 = 0;
int for_electro_marker6 = 0;
float for_lifer = 0;


/* setup
---------------------------------------- */

void setup() {
  size(180, 180, P3D); // for Android
  by = height - buttonSize;
  noStroke();
  noSmooth();
  mouseY = height * 100 / 45;
  //PFont fontA = loadFont("arial");
  //textFont(fontA, 16);

  timer1s = millis() / 1000;
}

/* draw
---------------------------------------- */

void draw() {
  background(0);
  noSmooth();

  timeSec = millis() / 1000;
  if (timeSec - timer1s > 1) {timer1s = timeSec; cycle1s = true;}  
  
  if (mouseY > by - 380 && mouseY < by + 30) {
    //drawButtons();
  }

  frameRate(30);
  fill(22);
  textMode(SCREEN);
  
  if (frameCount < 100) {
    text("press +/- to change resolution, a/q to change cube size, r to reset", 10, 20);
  }
  
  if (showFPS) {
    fill(200);
    //text(round(frameRate) + " fps", 80, 10);
    text(for_lifer, 10, 20);
    text(dash_marker2, 10, 40);
    text(dash_marker3, 10, 60);
  }

  try {for_dash_marker1 = float(dash_marker1);} catch (exception) {for_dash_marker1 = float("0.0");}
  try {for_dash_marker2 = float(dash_marker2);} catch (exception) {for_dash_marker2 = float("0.0");}
  try {for_dash_marker3 = float(dash_marker3);} catch (exception) {for_dash_marker3 = float("0.0");}
  try {for_electro_marker1 = electro_marker1;} catch (exception) {for_electro_marker1 = -1;}    
  try {for_electro_marker2 = electro_marker2;} catch (exception) {for_electro_marker2 = -1;}     
  try {for_electro_marker3 = electro_marker3;} catch (exception) {for_electro_marker3 = -1;}    
  try {for_electro_marker4 = electro_marker4;} catch (exception) {for_electro_marker4 = -1;}
  try {for_electro_marker5 = electro_marker5;} catch (exception) {for_electro_marker5 = -1;}    
  try {for_electro_marker6 = electro_marker6;} catch (exception) {for_electro_marker6 = -1;}  
  try {for_lifer = float(liferFloat);} catch (exception) {for_lifer = 10;}

  lights();
  translate(width / 2, height * 0.4, 0); //Точка камеры

  if (mousePressed) {
    if (!menuMode) {
      rotX -= 0.002 * (pmouseX - mouseX);
      rotY += 0.002 * (pmouseY - mouseY);
    } else {
	      if ((mouseX >= buttonSize) && (mouseX <= 3*buttonSize) && (mouseY > by)) {doButtonCommand();} // +/- button
      }    
  }

  rotX += rotAngle; 
  rotateX(rotY);
  rotateY(rotX);
 
  if (cycle1s) {
    if (xxx < 1 || xxx > 4) {dx = -dx;}
    xxx += dx;
    
    if (yyy < 1 || yyy > 4) {dy = -dy;}
    yyy += dy;
    
    if (zzz < 1 || zzz > 4) {dz = -dz;}
    zzz += dz;
  }

  // draw RGB cubes

  strokeWeight(0);
  float d2 = dim * 0.5 - 0.5;
  
  for (int r = 0; r < dim; r++) { // X (width)
    for (int g = 0; g < dim; g++) { // Y (heigth)
	    for (int b = 0; b < dim; b++) { // Z (deep)
        //if ((r > 0 && r < dim - 1) && (g > 0 && g < dim - 1) && (b > 0 && b < dim - 1)) {continue;}
      
        var tempFig = fig;
        var tenpSize = boxSize;
	      pushMatrix();
        //fill(255 * r / (dim - 1), 255 * g / (dim - 1), 255 * b / (dim - 1));
		    fill(47, 47, 47, 180);
		
		    if (r == 0 && g == 0 && b == 0) { // cube x=0, y=0, z=0
			    if (for_dash_marker1 < 1.0) {fill(10, 120, 200);}
			    if (for_dash_marker1 >= 1.0 && for_dash_marker1 <= 1.0) {fill(10, 180, 255); boxSize++;}
			    if (for_dash_marker1 > 1.0) {fill(10, 180, 255); boxSize++;}
		    }
		
		    if (r == 0 && g == 1 && b == 0) { // cube x=0, y=1, z=0
			    if (for_dash_marker2 < 1.0) {fill(10, 120, 200);}
			    if (for_dash_marker2 >= 1.0 && for_dash_marker2 <= 1.0) {fill(10, 180, 255); boxSize++;}
			    if (for_dash_marker2 > 1.0) {fill(10, 180, 255); boxSize++;}
		    }
		
		    if (r == 0 && g == 2 && b == 0) { // cube x=0, y=2, z=0
			    if (for_dash_marker3 < 1.0) {fill(10, 120, 200);}
			    if (for_dash_marker3 >= 1.0 && for_dash_marker3 <= 1.0) {fill(0, 200, 70); boxSize++;}
			    if (for_dash_marker3 > 1.0) {fill(10, 180, 255); boxSize++;}
		    }
        
		    if (r == 1 && g == 0 && b == 0) {
			    if (for_electro_marker1 == 0) {fill(190, 190, 110);}
			    if (for_electro_marker1 == 1) {fill(190, 190, 110); boxSize++;}
		    }        
        
		    if (r == 1 && g == 1 && b == 0) {
			    if (for_electro_marker2 == 0) {fill(190, 190, 110);}
			    if (for_electro_marker2 == 1) {fill(190, 190, 110); boxSize++;}
		    }        
        
		    if (r == 2 && g == 0 && b == 0) {
			    if (for_electro_marker3 == 0) {fill(240, 120, 100);}
			    if (for_electro_marker3 == 1) {fill(240, 120, 100); boxSize++;}
		    }        
        
		    if (r == 2 && g == 1 && b == 0) {
			    if (for_electro_marker4 == 0) {fill(240, 120, 100);}
			    if (for_electro_marker4 == 1) {fill(240, 120, 100); boxSize++;}
		    }        
        
		    if (r == 3 && g == 0 && b == 0) {
			    if (for_electro_marker5 == 0) {fill(240, 120, 150);}
			    if (for_electro_marker5 == 1) {fill(240, 120, 150); boxSize++;}
		    }        
        
		    if (r == 3 && g == 1 && b == 0) {
			    if (for_electro_marker6 == 0) {fill(240, 120, 150);}
			    if (for_electro_marker6 == 1) {fill(240, 120, 150); boxSize++;}
		    }         
        
		    if (r == 4 && g == 0 && b == 4) {
			    boxSize += for_lifer / 2;
			    fill(240, 120, 100);
		    }        
        
		    if (r == xxx && g == yyy && b == zzz) {

			    fill(240, 120, 200);
		    }        
        
        translate((r - d2) * gridSize, (g - d2) * gridSize, (b - d2) * gridSize);
        
        switch(fig) {
          case 1: 
            box(boxSize, boxSize, boxSize);
            break;
          case 2: 
            sphere(boxSize - 5);
            break;
          case 3: 
            box(boxSize, 10, 30);
		        sphere(boxSize);
            break;  
          default:
            // Does not execute
          break;
        }
        
        popMatrix();     
        fig = tempFig;
        boxSize = tenpSize;
      } // for (int b = 0; b < dim; b++)
    } // for (int g = 0; g < dim; g++)
  } // for (int r = 0; r < dim; r++)
  cycle1s = false;
} // draw

/* functions
---------------------------------------- */

void reset() {
  dim = 5;
  rescale = 0.45;
  gridSize = wm / dim;
  boxSize = gridSize * rescale;
  rotX = PI*-3/4;
  rotY = -PI/5;
  frameRate(30); // можно отключить
}  
  
// Изменение количества кубиков
void changeGridCount (int delta) {
  dim = constrain(dim + delta, 2, 16);
  gridSize = wm / dim;
  boxSize = gridSize * rescale;
} 

// Изменение размера кубиков
void changeGridSize (int delta) {
  rescale = constrain(rescale + 0.02 * delta, 0.2, 1.0);
  boxSize = gridSize * rescale;
}

// Изменение направления вращения
void changeRotation() {
  if (rotAngle < 0.0) rotAngle = angleDelta;
  else if (rotAngle > 0.0) rotAngle = 0.0;
  else rotAngle = -angleDelta;
}

// Изменение фигуры
void changeFig(int delta) {
  fig = fig + delta;
  if (fig < 1) fig = 3;
  if (fig > 3) fig = 1;
} 

// Нижнее меню
void drawRect(int x) {
  strokeWeight(4);
  //stroke(0);
  //fill(222);
  rect (x, by, buttonSize, buttonSize); 
  //fill(255);  
  //text(bbb1, x, by) 
}

void drawButtons() {
  noStroke();
  strokeWeight(0);
  //fill(40, 40, 80);
  fill(200);
  int x = 1;
  text ("Res", x + 10, by + 20);
 
  x = 1 + buttonSize;
  text ("Size-", x + 10, by + 20);
   
  x = 1 + 2*buttonSize;
  text ("Size+", x + 10, by + 20); 
 
  x = 1 + 3*buttonSize;
  text ("Dim-", x + 10, by + 20); 
 
  x = 1 + 4*buttonSize;
  text("Dim+", x + 10, by + 20); 
 
  x = 1 + 5*buttonSize;
  text("Dir", x + 10, by + 20);
 
  x = 1 + 6*buttonSize;
  text("Info", x + 10, by + 20);
  
  x = 1 + 7*buttonSize;
  text("Fig-", x + 10, by + 20);  
  
  x = 1 + 8*buttonSize;
  text("Fig+", x + 10, by + 20);
} // drawButtons

// Mouse and keyboard

void mousePressed() {
  menuMode = (mouseY > by);
  if (menuMode) doButtonCommand();
}

void mouseReleased() {
  menuMode = false;
}

void doButtonCommand() {
  if      (mouseX <   buttonSize) reset();
  else if (mouseX < 2*buttonSize) changeGridSize(-1);
  else if (mouseX < 3*buttonSize) changeGridSize(+1);
  else if (mouseX < 4*buttonSize) changeGridCount(-1);
  else if (mouseX < 5*buttonSize) changeGridCount(+1);
  else if (mouseX < 6*buttonSize) changeRotation();
  else if (mouseX < 7*buttonSize) showFPS = !showFPS;
  else if (mouseX < 8*buttonSize) changeFig(-1);
  else if (mouseX < 9*buttonSize) changeFig(+1);
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

// end
