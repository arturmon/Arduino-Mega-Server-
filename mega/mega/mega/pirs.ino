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
      Serial.println("Detect motion STD");
      pir1state = HIGH;
      sendRequest("pirSTD", 1);
      if (MODE == LED_PIR_01) {
        green(led1, bright);
      }
    }
  } else {
    if (pir1state == HIGH){
      Serial.println("End motion STD");
      pir1state = LOW;
      sendRequest("pirSTD", 0);
      //black(led1);
    }
  }
    
  // pir2 (HAL)
  pir2 = digitalRead(pir2pin);
  if (pir2 == HIGH) { 
    if (pir2state == LOW) {
      Serial.println("Detect motion HAL");
      pir2state = HIGH;
      sendRequest("pirHAL", 1);
      if (MODE == LED_PIR_01) {
        blue(led1, bright);
      }
    }
  } else {
    if (pir2state == HIGH){
      Serial.println("End motion HAL");
      pir2state = LOW;
      sendRequest("pirHAL", 0);
      //black(led1);
    }
  }

  // pir3 (KID)
  pir3 = digitalRead(pir3pin);
  if (pir3 == HIGH) { 
    if (pir3state == LOW) {
      // Serial.println("Detect motion KID");
      pir3state = HIGH;
      // setReqSens01("pirKID", 1);
      /*if (MODE == LED_PIR_01) {
        yellow(BRIGHT);
      }  */
    }
  } else {
    if (pir3state == HIGH){
      // Serial.println("End motion KID");
      pir3state = LOW;
      // setReqSens01("pirKID", 0);
      //black(led1);
    }
  }

  // pir4 (KUH)
  pir4 = digitalRead(pir4pin);
  if (pir4 == HIGH) { 
    if (pir4state == LOW) {
      Serial.println("Detect motion KUH");
      pir4state = HIGH;
      sendRequest("pirKUH", 1);
      if (MODE == LED_PIR_01) {
        cyan(led1, bright);
      }  
    }
  } else {
    if (pir4state == HIGH){
      Serial.println("End motion KUH");
      pir4state = LOW;
      sendRequest("pirKUH", 0);
      //black(led1);
    }
  }

  // pir5 (PRH)
  pir5 = digitalRead(pir5pin);
  if (pir5 == HIGH) { 
    if (pir5state == LOW) {
      Serial.println("Detect motion PRH");
      pir5state = HIGH;
      sendRequest("pirPRH", 1);
      if (MODE == LED_PIR_01) {
        red(led1, bright);
      }  
    }
  } else {
    if (pir5state == HIGH){
      Serial.println("End motion PRH");
      pir5state = LOW;
      sendRequest("pirPRH", 0);
      //black(led1);
    }
  }
  // pir6 (CLO)
  pir6 = digitalRead(pir6pin);
  if (pir6 == HIGH) { 
    if (pir6state == LOW) {
      Serial.println("Detect motion CLO");
      pir6state = HIGH;
      sendRequest("pirTLT", 1);
      if (MODE == LED_PIR_01) {
        magenta(led1, bright);
      }  
    }
  } else {
    if (pir6state == HIGH){
      Serial.println("End motion CLO");
      pir6state = LOW;
      sendRequest("pirTLT", 0);
      //black(led1);
    }
  }
} // pirsWorks

#endif // PIRS_FEATURE
