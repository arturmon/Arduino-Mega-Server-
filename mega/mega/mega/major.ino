/* ----------------------------------------------
  Modul MajorDoMo
  part of Arduino Mega Server project
  
  sprintf(buf, "GET /objects/?script=testScript");
  sendHTTPRequest();
------------------------------------------------- */

#ifdef MAJORDOMO_FEATURE

char majorMegaObject[] = "ncMega01";
char majorCommObject[] = "comm_mega01";

// MajorDoMo net settings
byte MAJOR_IP[] = {192, 168, 2, 8};
int MAJOR_PORT = 80;

// EthernetClient object
EthernetClient mclient;

void majordomoInit() {

  Serialprint("Connect to MajorDoMo... ");
  if (mclient.connect(MAJOR_IP, MAJOR_PORT)) {
    Serialprint("OK\n");
    //mclient.println("GET /search?q=arduino HTTP/1.0");
    mclient.println();
  } else {
      Serialprint("failed\n");
    }
  delay(200);
  mclient.stop();
  modulMajor = 1;
}

void sendHTTPRequest() {
  if (mclient.connect(MAJOR_IP, MAJOR_PORT)) { 
    timeStamp();
    Serial.println(buf);
    mclient.println(buf);
    mclient.println("Host: 192.168.2.8");
    mclient.println();   
    delay(100); // 500 max
    mclient.stop();
  } else {
      timeStamp();
      Serialprint("not connected\n");
    }
}

/* ---------------------
  Function sendRequest
    object:   <...>
    method:   "update"
    variable: "v"
    value:    <...>
------------------------ */

void sendRequest(char object[], int value) {
  sprintf(buf, "GET /objects/?object=%s&op=m&m=update&v=%d", object, value); 
  sendHTTPRequest();
}

/* --------------------------------------------
  Function sendRequestMinus
    Посылка объект - значение с дробной частью
    и подстановкой знака перед значением
    object:   <...>
    method:   "update"
    variable: "v"
    value:    minus<...>.<...>
----------------------------------------------- */

void sendRequestMinus(char object[], char minus[], int value, int value_) {
  sprintf(buf, "GET /objects/?object=%s&op=m&m=update&v=%s%0d.%d HTTP/1.0", object, minus, value, value_);
  sendHTTPRequest();
}

/* -----------------------------
  Function sendRequestVariable ?
    object:   <...>
    method:   "update"
    variable: <...>
    value:    <...>
-------------------------------- */

void sendRequestVariable(char object[], char variable[], int value) {
  sprintf(buf, "GET /objects/?object=%s&op=m&m=update&%s=%d", object, variable, value); 
  sendHTTPRequest();
}

/* -------------------------------------------
  Function sendReqSensor ?
    Посылка объект - значение с дробной частью
    (метод и переменная заранее заданы)
    object:   ...
    method:   "update"
    variable: "v"
    value:    "..."."..."
---------------------------------------------- */

void sendReqSensor(char object[], int value, int value_) {
  sprintf(buf, "GET /objects/?object=%s&op=m&m=update&v=%0d.%d HTTP/1.0", object, value, value_);
  sendHTTPRequest();
}

/* ----------------------------------------------------
  Function sendReqSensor_ ?
    Посылка объект - значение с дробной частью
    с условием если дробная часть < 10, добавляется s2,
    если > 10, то добавляется s3    
    object:   ...
    method:   "update"
    variable: "v"
    value:    "...".zero"..."
------------------------------------------------------ */

void sendReqSensor_(char object[], char zero[], char empty[], int value, int value_) {
  if (value_ < 10) {
    sprintf(buf, "GET /objects/?object=%s&op=m&m=update&v=%0d.%s%d HTTP/1.0", object, value, zero, value_);
  } else {
    sprintf(buf, "GET /objects/?object=%s&op=m&m=update&v=%0d.%s%d HTTP/1.0", object, value, empty, value_);
  }
  sendHTTPRequest();
}

/* ---------------------------------------------------------
  Function sendReqSensorFloat ?
    Стандартная посылка объект - значение с плавающей точкой
    (метод и переменная заранее заданы)
    object:   ...
    method:   "update"
    variable: "v"
    value:    ...
------------------------------------------------------------ */

void sendReqSensorFloat(char object[], float value) {
  sprintf(buf, "GET /objects/?object=%s&op=m&m=update&v=%F HTTP/1.0", object, value);
  sendHTTPRequest();
} 

/* ------------------------------------------------------
  Function majordomoMegaLive
    Уведомление MajorDomo о том, что Mega жива и работает
--------------------------------------------------------- */

void majordomoMegaLive() {
  if (cycle1m) {
    sendRequest(majorMegaObject, 1);
    checkEvent(&prevEventMegaLive);
  }
}

#endif // MAJORDOMO_FEATURE
