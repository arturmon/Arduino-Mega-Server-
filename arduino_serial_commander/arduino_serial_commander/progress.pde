/*
  Modul Progress
  part of Arduino Serial Commander
  part of Arduino Mega Server project  
*/

int currentPercent = 0;

void drawProgress(long current, long total) {
  fill(255);
  stroke(153);
  rect(30, 60, 100 * 5, 20);
  fill(50, 120, 220);

  float LL = total;  
  
  float corr = 1;
  if (LL < 100) {
    corr = 100 / LL;
  }
  
  float onePercent = LL / 100;
  if (onePercent < 1) {
    onePercent = 1; 
  }
  
  currentPercent = int((current / onePercent) * corr);
  rect(30, 60, currentPercent * 5, 20);
  
  if (currentPercent < 50) {
    fill(0, 0, 0);
  } else {
      fill(255, 255, 255);
    }
    
  if (currentPercent < 98) {
    text(currentPercent + "%", 270, 75);
  } else {
      text("Done", 270, 75);
    }  
} // drawProgress

void drawTransfering() {
  fill(255);
  stroke(153);
  rect(30, 60, 100 * 5, 20);
  fill(0, 40, 200);
  text("Transfering...", 240, 75);
}

