/*
  Modul Electro
  part of Arduino Mega Server project
  Electro functions
*/

#ifdef ELECTRO_FEATURE

const int MAX_UI_SENSORS = 14; // max 14

byte U = 0;
//              U [1  2  3  4  5][1  2   3   4   5   6   7   8]
int pinsUI[] = {0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15};
// диапазон токовых пинов
int START_PIN = 1;
int END_PIN = MAX_UI_SENSORS;

int samples = 400;

/* Коэффициенты для калибровки значений.
   Подбираются опытным путем, сверяясь с эталонным прибором */
double VCAL = 46.00; // для напряжения
//               U [1     2     3     4     5]   [1     2     3     4     5     6     7     8]
double ICAL[] = {0, 1.35, 1.28, 0.73, 0.73, 1.28, 0.73, 0.72, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73};
// вычисляемые коэффициенты для калибровки значений
double UI_RATIO[MAX_UI_SENSORS];

int const MAX_VOLTAGE = 280;
int const MIN_VOLTAGE = 160;

// Значения отсчётов
int sampleUI[MAX_UI_SENSORS];
int prevSampleUI[MAX_UI_SENSORS];
 
// Значения для фильтров
double filteredUI[MAX_UI_SENSORS];
double prevFilteredUI[MAX_UI_SENSORS]; 

// Для расчета мощности среднеквадратическим методом
double sumSquareUI[MAX_UI_SENSORS]; // сумма квадратов напряжения и тока

// Полезные значения переменных
double UIrms[MAX_UI_SENSORS];
double apparentPower[MAX_UI_SENSORS];

byte const UI_COLLECT = 1;
byte refreshCount = 0;

// Среднее значение из нескольких замеров
double sumUPrms[MAX_UI_SENSORS];
double middleUPrms[MAX_UI_SENSORS];

// переменные для Ajax
double ajaxUPrms[MAX_UI_SENSORS];

// Electro

void electroInit() {
  UI_RATIO[0] = 50.5 / 1024 * VCAL;
  for (int i = 1; i < MAX_UI_SENSORS; i++) { 
    UI_RATIO[i] = (long double)15.15 * 5 / 1024 * ICAL[i];
  }
  // electro throttle
  for (int i = 0; i < 5; i++) { 
    cycle(START_PIN, END_PIN, samples);
    calcPover(START_PIN, END_PIN, samples);
  }
  modulElectro = 1;
  buttonElectro = 1;
}

void electroWorks() {
  getUIP("packPower1", START_PIN, END_PIN, samples);
}

void cycle(byte STT, byte STP, int cycles) {
  // Замеры значений, удаление постоянного смещения 2,5В,
  // и суммирование квадратов значений в цикле   
     
  for (int j = 0; j < cycles; j++) {
    
    // сохраняем предыдущие значения
    prevSampleUI[U] = sampleUI[U];
    for (int i = STT; i < STP; i++) {
      prevSampleUI[i] = sampleUI[i];
    }

    // Получение значений
    sampleUI[U] = analogRead(pinsUI[U]);
    for (int i = STT; i < STP; i++) {
      sampleUI[i] = analogRead(pinsUI[i]);
    }
    
    // Фильтр для удаления постоянного смещения 2,5В
    prevFilteredUI[U] = filteredUI[U];
    filteredUI[U] = 0.996 * (prevFilteredUI[U] + sampleUI[U] - prevSampleUI[U]);
    for (int i = STT; i < STP; i++) { 
      prevFilteredUI[i] = filteredUI[i];
      filteredUI[i] = 0.996 * (prevFilteredUI[i] + sampleUI[i] - prevSampleUI[i]);
    }
    
    // Суммируем квадраты
    sumSquareUI[U] += filteredUI[U] * filteredUI[U];
    for (int i = STT; i < STP; i++) {
      sumSquareUI[i] += filteredUI[i] * filteredUI[i];
    }
  } // for (int i = 0; i < cycles; i++)  
} // cycle()

void calcPover(byte STT, byte STP, int cycles) {
  // рассчет напряжения и тока (rms)  
  UIrms[U] = UI_RATIO[U] * sqrt(sumSquareUI[U] / cycles);
  for (int i = STT; i < STP; i++) {
    UIrms[i] = UI_RATIO[i] * sqrt(sumSquareUI[i] / cycles);
  }
  
  // коррекция малых искажений тока 0.12А ~ 27.6Вт
  for (int i = STT; i < STP; i++) {
    if (UIrms[i] < 0.12) {
      UIrms[i] = 0.0;
    }
  }
  
  // расчет мощности
  for (int i = STT; i < STP; i++) {
    apparentPower[i] = UIrms[U] * UIrms[i];
  }

  // сброс накопленных значений
  sumSquareUI[U] = 0;
  for (int i = STT; i < STP; i++) {
    sumSquareUI[i] = 0;
  }  
}

void collectValues(byte STT, byte STP) {
  refreshCount++;
    
  // среднее значение из нескольких замеров
  sumUPrms[U] += UIrms[U];
  middleUPrms[U] = sumUPrms[U] / refreshCount;
  for (int i = STT; i < STP; i++) {
    sumUPrms[i] += apparentPower[i];
    middleUPrms[i] = sumUPrms[i] / refreshCount;
  }
}

void clearCollectValues(byte STT, byte STP) {
  refreshCount = 0;
  sumUPrms[U] = 0;
  middleUPrms[U] = 0;
        
  for (int i = STT; i < STP; i++) {
    sumUPrms[i] = 0;
    middleUPrms[i] = 0;
  }
}

void sendElectroMajor(char obj[], byte STT, byte STP) {
  // для посылки дробной части значения
  int UPrms_[MAX_UI_SENSORS];  

  // Вычисляем дробные части значений для формирования строки
  UPrms_[U] = (middleUPrms[U] - (int)middleUPrms[U]) * 100;
  for (int i = STT; i < STP; i++) {
    UPrms_[i] = (middleUPrms[i] - (int)middleUPrms[i]) * 100;
  }
  
  if (STT == START_PIN && STP == END_PIN) {
    sprintf(buf, "GET /objects/?object=%s&op=m&m=update&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d HTTP/1.0",
      obj, "u", (int)middleUPrms[U], abs(UPrms_[U]),
      "p1", (int)middleUPrms[1], abs(UPrms_[1]),  "p2", (int)middleUPrms[2], abs(UPrms_[2]),
      "p3", (int)middleUPrms[3], abs(UPrms_[3]),  "p4", (int)middleUPrms[4], abs(UPrms_[4]),
      "p5", (int)middleUPrms[5], abs(UPrms_[5]),  "p6", (int)middleUPrms[6], abs(UPrms_[6]), 
      "p7", (int)middleUPrms[7], abs(UPrms_[7]),  "p8", (int)middleUPrms[8], abs(UPrms_[8]),
      "p9", (int)middleUPrms[9], abs(UPrms_[9]),  "p10",(int)middleUPrms[10],abs(UPrms_[10]),
      "p11",(int)middleUPrms[11],abs(UPrms_[11]), "p12",(int)middleUPrms[12],abs(UPrms_[12]),
      "p13",(int)middleUPrms[13],abs(UPrms_[13]));
    sendHTTPRequest();
  }
} // sendElectroMajor()

void getUIP(char obj[], byte STT, byte STP, int cycles) {
  #ifdef ELECTRO_DEBUG
    int prof_start = millis();
  #endif  
  
  cycle(STT, STP, cycles);
  calcPover(STT, STP, cycles);

  #ifdef ELECTRO_DEBUG
    int prof_stop = millis();
    int prof_time = prof_stop - prof_start;
    timeStamp();
    Serialprint("Electro cycle: %dms\n", prof_time);
  #endif
  
  // выдача результатов
  if (UIrms[U] > MIN_VOLTAGE && UIrms[U] < MAX_VOLTAGE) { // отсечение заведомо неправильных результатов
    
    collectValues(STT, STP);
    
    // выдача результатов после нужного кол-ва замеров
    if (refreshCount == UI_COLLECT) {

      #ifdef ELECTRO_DEBUG
        // calc time duration
        checkEvent(&prevEventElectroCycle);
      #endif
      
      // for Ajax
      ajaxUPrms[U] = middleUPrms[U];
      for (int i = STT; i < STP; i++) {
        ajaxUPrms[i] = middleUPrms[i];
      }      

      // send electro data to MajorDoMo
      sendElectroMajor(obj, STT, STP);
      
      // обнуление значений нескольких замеров
      clearCollectValues(STT, STP);
    } // if (refreshCount == UI_COLLECT)
  } else { // if (UIrms[U] > MIN_VOLTAGE && UIrms[U] < MAX_VOLTAGE)
      // ...
    }
} // getUIP()


// U & I signal form
int const MAX_FORM_POINTS = 90;
int pointsU[MAX_FORM_POINTS];
int pointsI[MAX_FORM_POINTS];

// Power supply frequency
int const MAX_FREQS = 206;
long periodInMicros = 0;
int cyclosPerPeriod = 0;

/* ----------------------------------------
  Function synchroSignal()
    Synchronization of signal power supply
    "up" - "down" (start: middle ~ 50%)
------------------------------------------- */

void synchroSignal(byte uPin) {
  int val;
  int i = 0;
  int j = 0;
  int limitCyclos = MAX_FREQS;

  /* Limits of signal:
     top - 960
     middle - 810
     bottom - 660 */  
  
  // limits areas of signal
  int limitTopArea = 900;
  int limitMiddleAreaTop = 820;

  // synchronization of signal

  do { // check top area
    val = analogRead(uPin);
    i++; if (i > limitCyclos) {break;}
  } while (val < limitTopArea);
  
  do { // check top of middle area
    val = analogRead(uPin);
    j++; if (j > limitCyclos) {break;}    
  } while (val > limitMiddleAreaTop);
} // synchroSignal()

/* ----------------------------------------
  Function getFormArrays
    Get arrays of points U & I for graphics
------------------------------------------- */

void getFormArrays(byte pinU, byte pinI) {
  synchroSignal(pinU);
  for (int i = 0; i < MAX_FORM_POINTS; i++) {
    pointsU[i] = analogRead(pinU);
    pointsI[i] = analogRead(pinI);
  }
}

/* ----------------------------------------
  Function getFreqPeriod
    Get periodInMicros and cyclosPerPeriod
    of U signal
------------------------------------------- */

void getFreqPeriod(byte pinU) {
  unsigned long startTime;
  int startVal;
  int tempVal;

  periodInMicros = 0;
  cyclosPerPeriod = 0;

  synchroSignal(pinU);
  
  startTime = micros();
  startVal = analogRead(pinU);
  for (int i = 0; i < MAX_FREQS; i++) {
    tempVal = analogRead(pinU);
    if ((i > 146 && i < 206) && (tempVal < startVal + 2 && tempVal > startVal - 10)) {
      periodInMicros = micros() - startTime;
      cyclosPerPeriod = i;
      break;
    }
  }
} // getFrecPeriod

/* -----------------
  Function freqWorks
-------------------- */

void freqWorks() {
  getFormArrays(0, 1);
  getFreqPeriod(0);
}

#endif // ELECTRO_FEATURE
