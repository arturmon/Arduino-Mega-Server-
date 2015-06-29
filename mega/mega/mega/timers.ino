/*
  Modul Timers
  part of Arduino Mega Server project
*/

unsigned long cycle_start = 0;
unsigned long cycle_end = 0;
unsigned long cycle_delta = 0;

void timersInit() {
  unsigned long uptimeSec = millis() / 1000;
  timeSec = uptimeSec;
  timer1s = uptimeSec;  
  timer4s = uptimeSec; 
  timer20s = uptimeSec;
  timer30s = uptimeSec;
  timer1m = uptimeSec;
  timer3m = uptimeSec;
  timer5m = uptimeSec;
}

void timersWorks() {
  timeSec = millis() / 1000;
  if (timeSec - timer1s >   0) {timer1s =  timeSec; cycle1s = true;}
  if (timeSec - timer4s >   3) {timer4s =  timeSec; cycle4s = true;}
  if (timeSec - timer20s > 19) {timer20s = timeSec; cycle20s = true;}
  if (timeSec - timer30s > 29) {timer30s = timeSec; cycle30s = true;}
  if (timeSec - timer1m >  59) {timer1m =  timeSec; cycle1m = true;}
  if (timeSec - timer3m > 179) {timer3m =  timeSec; cycle3m = true;}
  if (timeSec - timer5m > 299) {timer5m =  timeSec; cycle5m = true;}  
}

void eraseCyclos() {
  cycle1s = false;
  cycle4s = false;
  cycle20s = false;
  cycle30s = false;
  cycle1m = false;
  cycle3m = false;
  cycle5m = false;
}

void profStart() {
  cycle_start = millis() / 1000;
}

void profCalc() {
  cycle_end = millis() / 1000;
  cycle_delta = cycle_end - cycle_start;
   
  if (cycle_delta > 0) {
    //Serial.print("-->");
    //Serial.print(cycle_delta);
    //Serial.println("s");
  }
}

