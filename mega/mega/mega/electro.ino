/*
  Modul Electro
  part of Arduino Mega Server project
  Electro functions
*/

#ifdef ELECTRO_FEATURE

const int MAX_UI_SENSORS = 2; // 14
const int START_I_SENSOR = 1;
const int UI_REFRESH_MIN = 1;
int samples = 400;
                // 1  2  3  4  5  1  2   3   4   5   6   7   8
int pinsUI[] = {0, 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15};

// коэффициенты для калибровки выводимых значений
double VCAL = 46.00;
                    // 1     2     3     4     5     1     2     3     4     5     6     7     8
double ICAL[] = {0, 1.35, 1.28, 0.73, 0.73, 1.28, 0.72, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73, 0.73};
double PHASECAL = 2.3; // для мощности

double UI_RATIO[MAX_UI_SENSORS];

// образцы переменных
int sampleUI[MAX_UI_SENSORS];
int oldSampleUI[MAX_UI_SENSORS];
 
// переменные для фильтров
double filteredUI[MAX_UI_SENSORS];
double oldFilteredUI[MAX_UI_SENSORS];

// калибровочное значение фазы мгновенного напряжения
double shiftedU; 

// расчет переменной для мощности
double sqUI[MAX_UI_SENSORS];
double sumUI[MAX_UI_SENSORS];

double instP[MAX_UI_SENSORS];
double sumP[MAX_UI_SENSORS];

// полезные значения переменных
double UIrms[MAX_UI_SENSORS];
double power[MAX_UI_SENSORS];

double sumPWR[MAX_UI_SENSORS]; 
int iPWR[MAX_UI_SENSORS]; 
double dPWR[MAX_UI_SENSORS];

double sumUIrms[MAX_UI_SENSORS]; 
int iUIrms[MAX_UI_SENSORS]; 
double dUIrms[MAX_UI_SENSORS];

int tmpUIrms[MAX_UI_SENSORS];
int tmpPwr[MAX_UI_SENSORS];

int START_PIN = 1; int END_PIN = MAX_UI_SENSORS;

// Results
double elPower[MAX_UI_SENSORS];
double Uarray[10]; // вывод 10 значений напряжения

void addVolt(double dd) {
  for (int i = 9; i > 0; i--) { 
    Uarray[i] = Uarray[i - 1];
  } 
  Uarray[0] = dd;
}  

void electroInit() {
  UI_RATIO[0] = 50.5 / 1024 * VCAL;
  for (int i = 1; i < MAX_UI_SENSORS; i++) { 
    UI_RATIO[i] = (long double)15.15 * 5 / 1024 * ICAL[i];
  }
  modulElectro = 1;
  buttonElectro = 1;
}

void electroWorks() {
  getUIP("packPower1", START_PIN, END_PIN, samples);
}

void getUIP(char obj[], int STT, int STP, int count) {
  int prof1 = millis();
  
  for (int i = 0; i < count; i++) {
    oldSampleUI[0] = sampleUI[0];
    for (int n = STT; n < STP; n++) {
      oldSampleUI[n] = sampleUI[n];
    }

    sampleUI[0] = analogRead(pinsUI[0]);
    for (int n = STT; n < STP; n++) {
      sampleUI[n] = analogRead(pinsUI[n]);
    }
    
    oldFilteredUI[0] = filteredUI[0];
    filteredUI[0] = 0.996 * (oldFilteredUI[0] + sampleUI[0] - oldSampleUI[0]);
    for (int n = STT; n < STP; n++) { 
      oldFilteredUI[n] = filteredUI[n];
      filteredUI[n] = 0.996 * (oldFilteredUI[n] + sampleUI[n] - oldSampleUI[n]); // Цифровой фильтр для удаления постоянного смещения 2,5В
    }
   
    // Калибруем фазу
    shiftedU = oldFilteredUI[0] + PHASECAL * (filteredUI[0] - oldFilteredUI[0]);

    // среднеквадратический метод расчета
    sqUI[0] = filteredUI[0] * filteredUI[0]; // 1) square current values
    sumUI[0] += sqUI[0];
    for (int n = STT; n < STP; n++) {
      sqUI[n] = filteredUI[n] * filteredUI[n]; // 1) square current values
      sumUI[n] += sqUI[n];
    }
    
    for (int n = STT; n < STP; n++) {
      instP[n] = shiftedU * filteredUI[n]; // Мгновенная мощность
      sumP[n] += instP[n];
    }
  } // for (int i = 0; i < count; i++)
  
  // расчет корня из среднего напряжения и тока (rms)  
  UIrms[0] = UI_RATIO[0] * sqrt(sumUI[0] / count);
  for (int n = STT; n < STP; n++) {
    UIrms[n] = UI_RATIO[n] * sqrt(sumUI[n] / count);
  }
  
  // коррекция малых искажений
  if (UIrms[0] < 0.1) {
    UIrms[0] = 0.0;
  }
  
  // коррекция малых искажений
  for (int n = STT; n < STP; n++) {
    if (UIrms[n] < 0.1) {
      UIrms[n] = 0.0;
    }
  }
  
  // расчет величины мощности
  for (int n = STT; n < STP; n++) {
    power[n] = UIrms[0] * UIrms[n];
  }
 
  // сброс накопленных значений
  sumUI[0] = 0;
  sumP[0] = 0;
  for (int n = STT; n < STP; n++) {
    sumUI[n] = 0;
    sumP[n] = 0;
  }

  // Prof time
  int prof2 = millis();
  int prof00 = prof2 - prof1;
  timeStamp();
  Serial.print(">>> ");
  Serial.println(prof00);

  // выдача результатов
  if (UIrms[0] < 300) {
    iUIrms[0]++;
    sumUIrms[0] = sumUIrms[0] + UIrms[0];
    dUIrms[0] = sumUIrms[0] / iUIrms[0];
    
    iPWR[0]++;
    sumPWR[0] = sumPWR[0] + power[0];
    dPWR[0] = sumPWR[0] / iPWR[0];
      
    for (int n = STT; n < STP; n++) {
      iUIrms[n]++;
      sumUIrms[n] = sumUIrms[n] + UIrms[n];
      dUIrms[n] = sumUIrms[n] / iUIrms[n];
      
      iPWR[n]++;
      sumPWR[n] = sumPWR[n] + power[n];
      dPWR[n] = sumPWR[n] / iPWR[n];
    }  
    
    if (iUIrms[0] == UI_REFRESH_MIN) {
      tmpUIrms[0] = (dUIrms[0] - (int)dUIrms[0]) * 100;
      tmpPwr[0] = (dPWR[0] - (int)dPWR[0]) * 100;
      for (int n = STT; n < STP; n++) {
        tmpUIrms[n] = (dUIrms[n] - (int)dUIrms[n]) * 100;
        tmpPwr[n] = (dPWR[n] - (int)dPWR[n]) * 100;
        elPower[n] = dPWR[n];
      }
    
      // Results
      elPower[0] = dUIrms[0];
      addVolt(elPower[0]);
      //checkEventElectroCycle();
      checkEvent(&prevEventElectroCycle);
      /*
      sprintf(buf, "GET /objects/?object=%s&op=m&m=update&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d HTTP/1.0", 
        "pack01", "u", (int)dUIrms[0], abs(tmpUIrms[0]),  
        "i1", (int)dUIrms[1], abs(tmpUIrms[1]), "i2", (int)dUIrms[2], abs(tmpUIrms[2]), "i3", (int)dUIrms[3], abs(tmpUIrms[3]), 
        "i4", (int)dUIrms[4], abs(tmpUIrms[4]), "i5", (int)dUIrms[5], abs(tmpUIrms[5]), "i6", (int)dUIrms[6], abs(tmpUIrms[6]), 
        "i7", (int)dUIrms[7], abs(tmpUIrms[7]), "i8", (int)dUIrms[8], abs(tmpUIrms[8]), "i9", (int)dUIrms[9], abs(tmpUIrms[9]), 
        "i10", (int)dUIrms[10], abs(tmpUIrms[10]), "i11", (int)dUIrms[11], abs(tmpUIrms[11]), 
        "i12", (int)dUIrms[12], abs(tmpUIrms[12]), "i13", (int)dUIrms[13], abs(tmpUIrms[13]));
      sendHTTPRequest(); 
      */  
      /*
      if (STT == START_PIN && STP == END_PIN) {
        sprintf(buf, "GET /objects/?object=%s&op=m&m=update&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d HTTP/1.0", 
          obj, "u", (int)dUIrms[0], abs(tmpUIrms[0]),  
          "p1", (int)dPWR[1], abs(tmpPwr[1]), "p2", (int)dPWR[2], abs(tmpPwr[2]), "p3", (int)dPWR[3], abs(tmpPwr[3]), 
          "p4", (int)dPWR[4], abs(tmpPwr[4]), "p5", (int)dPWR[5], abs(tmpPwr[5]), "p6", (int)dPWR[6], abs(tmpPwr[6]), 
          "p7", (int)dPWR[7], abs(tmpPwr[7]), "p8", (int)dPWR[8], abs(tmpPwr[8]), "p9", (int)dPWR[9], abs(tmpPwr[9]), 
          "p10", (int)dPWR[10], abs(tmpPwr[10]), "p11", (int)dPWR[11], abs(tmpPwr[11]), 
          "p12", (int)dPWR[12], abs(tmpPwr[12]), "p13", (int)dPWR[13], abs(tmpPwr[13]));
        sendHTTPRequest();
      }
     */
      /*
      if (STT == stt1 && STP == stp1) {
        sprintf(buf, "GET /objects/?object=%s&op=m&m=update&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d&%s=%0d.%d HTTP/1.0", 
          obj, "u", (int)dUIrms[0], abs(tmpUIrms[0]),  
          "p1", (int)dPWR[1], abs(tmpPwr[1]), "p2", (int)dPWR[2], abs(tmpPwr[2]), 
          "p3", (int)dPWR[3], abs(tmpPwr[3]), "p4", (int)dPWR[4], abs(tmpPwr[4]), 
          "p5", (int)dPWR[5], abs(tmpPwr[5]));
          sendHTTPRequest();
        }
      */
      iUIrms[0] = 0;
      sumUIrms[0] = 0;
      dUIrms[0] = 0;
      iPWR[0] = 0; 
      sumPWR[0] = 0;
      dPWR[0] = 0;
        
      for (int n = STT; n < STP; n++) {
        iUIrms[n] = 0;
        sumUIrms[n] = 0;
        dUIrms[n] = 0;

        iPWR[n] = 0; 
        sumPWR[n] = 0;
        dPWR[n] = 0;
      }
    } // end of (iUIrms[0] == UI_REFRESH_MIN)
  } // end of (UIrms[0] < 400)
} // getUIP()

#endif // ELECTRO_FEATURE
