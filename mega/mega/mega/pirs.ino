/*
  Modul PIRs
  part of Arduino Mega Server project
*/

#ifdef PIRS_FEATURE

// pins
int pir1pin = 22; // STD
int pir2pin = 23; // HAL
int pir3pin = 24; // KID
int pir4pin = 25; // KUH
int pir5pin = 26; // PRH
int pir6pin = 30; // CLO

// states
int pir1state = LOW; int pir1 = 0;
int pir2state = LOW; int pir2 = 0;
int pir3state = LOW; int pir3 = 0;
int pir4state = LOW; int pir4 = 0;
int pir5state = LOW; int pir5 = 0;
int pir6state = LOW; int pir6 = 0;

// init
void pirsInit() {
  pinMode(pir1pin, INPUT);
  pinMode(pir2pin, INPUT);
  pinMode(pir3pin, INPUT);
  pinMode(pir4pin, INPUT);
  pinMode(pir5pin, INPUT);
  pinMode(pir6pin, INPUT);
  modulPirs = 1;
}

// works
void pirsWorks() {
  // pir1 (STD)
  pir1 = digitalRead(pir1pin);
  if (pir1 == HIGH) { 
    if (pir1state == LOW) {
      Serialprint("Detect motion STD\n");
      pir1state = HIGH;
      sendRequest("pirSTD", 1);
      #ifdef LEDS_FEATURE
        if (MODE == LED_PIR_01) {
          //green(led1, bright);
        }
      #endif
    }
  } else {
    if (pir1state == HIGH){
      Serialprint("End motion STD\n");
      pir1state = LOW;
      sendRequest("pirSTD", 0);
      #ifdef LEDS_FEATURE
        //black(led1);
      #endif
    }
  }
    
  // pir2 (HAL)
  pir2 = digitalRead(pir2pin);
  if (pir2 == HIGH) { 
    if (pir2state == LOW) {
      Serialprint("Detect motion HAL\n");
      pir2state = HIGH;
      sendRequest("pirHAL", 1);
      #ifdef LEDS_FEATURE
        if (MODE == LED_PIR_01) {
          //blue(led1, bright);
        }
      #endif
    }
  } else {
    if (pir2state == HIGH){
      Serialprint("End motion HAL\n");
      pir2state = LOW;
      sendRequest("pirHAL", 0);
      #ifdef LEDS_FEATURE
        //black(led1);
      #endif
    }
  }

  // pir3 (KID)
  pir3 = digitalRead(pir3pin);
  if (pir3 == HIGH) { 
    if (pir3state == LOW) {
      // Serialprint("Detect motion KID\n");
      pir3state = HIGH;
      // setReqSens01("pirKID", 1);
      /*if (MODE == LED_PIR_01) {
        yellow(BRIGHT);
      }  */
    }
  } else {
    if (pir3state == HIGH){
      // Serialprint("End motion KID\n");
      pir3state = LOW;
      // setReqSens01("pirKID", 0);
      #ifdef LEDS_FEATURE
        //black(led1);
      #endif
    }
  }

  // pir4 (KUH)
  pir4 = digitalRead(pir4pin);
  if (pir4 == HIGH) { 
    if (pir4state == LOW) {
      Serialprint("Detect motion KUH\n");
      pir4state = HIGH;
      sendRequest("pirKUH", 1);
      #ifdef LEDS_FEATURE
        if (MODE == LED_PIR_01) {
          //cyan(led1, bright);
        } 
      #endif
    }
  } else {
    if (pir4state == HIGH){
      Serialprint("End motion KUH\n");
      pir4state = LOW;
      sendRequest("pirKUH", 0);
      #ifdef LEDS_FEATURE
        //black(led1);
      #endif
    }
  }

  // pir5 (PRH)
  pir5 = digitalRead(pir5pin);
  if (pir5 == HIGH) { 
    if (pir5state == LOW) {
      Serialprint("Detect motion PRH\n");
      pir5state = HIGH;
      sendRequest("pirPRH", 1);
      #ifdef LEDS_FEATURE
        if (MODE == LED_PIR_01) {
          //red(led1, bright);
        }
      #endif
    }
  } else {
    if (pir5state == HIGH){
      Serialprint("End motion PRH\n");
      pir5state = LOW;
      sendRequest("pirPRH", 0);
      #ifdef LEDS_FEATURE
        //black(led1);
      #endif
    }
  }
  // pir6 (CLO)
  pir6 = digitalRead(pir6pin);
  if (pir6 == HIGH) { 
    if (pir6state == LOW) {
      Serialprint("Detect motion CLO\n");
      pir6state = HIGH;
      sendRequest("pirTLT", 1);
      #ifdef LEDS_FEATURE
        if (MODE == LED_PIR_01) {
          //magenta(led1, bright);
        } 
      #endif
    }
  } else {
    if (pir6state == HIGH){
      Serialprint("End motion CLO\n");
      pir6state = LOW;
      sendRequest("pirTLT", 0);
      #ifdef LEDS_FEATURE
        //black(led1);
      #endif
    }
  }
} // pirsWorks

#endif // PIRS_FEATURE
