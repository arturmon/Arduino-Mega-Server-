/*
  Modul Generic
  part of Arduino Mega Server project
  Generic functions
*/

/* --------------------------
  Function int freeMem()
    Return free RAM in KBytes
----------------------------- */

int freeMem() {
  extern int __heap_start, *__brkval;
  int v;
  return (int) &v - (__brkval == 0 ? (int) &__heap_start : (int) __brkval);
}

// CPU load / Cyclos in second

int summCyclosInSec = 0;
int cyclosInSec = 0;

void cyclosInSecCalc() {
  cyclosInSec = (100 - summCyclosInSec - 5) * 1.1;
  if (cyclosInSec < 0) {cyclosInSec = 0;}
  if (cyclosInSec > 100) {cyclosInSec = 100;}
  summCyclosInSec = 0;
}

void cyclosInSecWork() {
  summCyclosInSec++;
  if (cycle1s) {cyclosInSecCalc();}
}

// CPU load / Cyclos delay

unsigned long pointCpu = 0;
unsigned long oldPointCpu = 0;
unsigned long deltaCpu = 0;
byte const MAX_CPU_BUFFER = 10;
unsigned long bufferCpuLoad[MAX_CPU_BUFFER];
int cyclosDelay = 0;

void shiftCpuLoad(unsigned long tick) {
  for (byte i = MAX_CPU_BUFFER - 1; i > 0; i--) {
    bufferCpuLoad[i] = bufferCpuLoad[i - 1];
  }
  bufferCpuLoad[0] = tick;
}

void averageCpuLoad() {
  unsigned long summ = 0;
  
  for (byte i = 0; i < MAX_CPU_BUFFER; i++) {
    summ += bufferCpuLoad[i];
  }
  cyclosDelay = summ / MAX_CPU_BUFFER;
}

void cyclosDelayWork() {
  pointCpu = millis();
  deltaCpu = pointCpu - oldPointCpu;
  oldPointCpu = pointCpu;
  shiftCpuLoad(deltaCpu);
  averageCpuLoad();
  cyclosDelay -= 8;
  if (cyclosDelay < 0) {cyclosDelay = 0;}
  if (cyclosDelay > 100) {cyclosDelay = 100;}
}

