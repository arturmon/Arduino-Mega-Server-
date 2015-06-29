/*
  Modul Temperature
  part of Arduino Mega Server project
*/

#ifdef TEMP_FEATURE

#include <DallasTemperature.h>
#include <OneWire.h>

#define ONE_WIRE_BUS 2

PROGMEM byte idTempDat1[] = {40, 240,  72, 81, 3, 0, 0}; // STR [*]
PROGMEM byte idTempDat2[] = {40, 149,  87, 87, 3, 0, 0}; // BLK [&]
PROGMEM byte idTempDat3[] = {40, 221,  16, 81, 3, 0, 0}; // SRV [@]
PROGMEM byte idTempDat4[] = {40,  23,  98, 87, 3, 0, 0}; // WRM [%]
PROGMEM byte idTempDat5[] = {40, 207, 142, 87, 3, 0, 0}; // HOM [^]

float current_temp1, current_temp2, current_temp3, current_temp4, current_temp5;
int temp1_, temp2_, temp3_, temp4_, temp5_;

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
DeviceAddress tempSensor1, tempSensor2, tempSensor3, tempSensor4, tempSensor5;

char object1[] = "analog01";
char object2[] = "analog03";
char object3[] = "analog04";
char object4[] = "analog05";
char object5[] = "analog02";

char removed[] = "removed";
char notPresent[] = "not present";

void tempInit() {
  sensors.begin();
  
  Serial.print("Parasite power is: ");
  if (sensors.isParasitePowerMode()) {Serial.println("ON");}
                                else {Serial.println("OFF");}
  oneWire.reset_search();

  // locate devices on the bus
  Serial.print("Found ");
  Serial.print(sensors.getDeviceCount(), DEC);
  Serial.println(" devices");
  
  sensors.getAddress(tempSensor1, 0);
  sensors.getAddress(tempSensor2, 1);
  sensors.getAddress(tempSensor3, 2);
  sensors.getAddress(tempSensor4, 3);
  sensors.getAddress(tempSensor5, 4);
  
  oneWire.reset_search();
  modulTemp = 1;
}

/* ---------------------------------------
  Function showSerial()
    Show S/N of sensor #1
------------------------------------------ */

void showSerial() {
  Serial.print("S/N: ");
  for (byte i = 0; i < 8; i++) {
    Serial.print(' ');
    Serial.print(tempSensor1[i]); // in DEC
    //Serial.print(tempSensor1[i], HEX); // in HEX
  }
  Serial.println();
}

void tempWorks() {
  sensors.requestTemperatures();
  
  if (tempSensor1[1] == idTempDat1[1] && 
      tempSensor1[2] == idTempDat1[2] && 
      tempSensor1[3] == idTempDat1[3]) {
    current_temp1 = sensors.getTempC(tempSensor1);

    if (current_temp1 != -127) { 
      Serial.print("*");
      Serial.println(current_temp1);
      temp1_ = (current_temp1 - (int)current_temp1) * 100;
      
      if ((current_temp1 < 0) && (current_temp1 > -1)) {
        sendRequestMinus(object1, "-", (int)current_temp1, abs(temp1_)); 
      } else {
          sendRequestMinus(object1, "", (int)current_temp1, abs(temp1_)); 
        }   
    } else {
        Serial.print("*");
        Serial.println(removed); 
      }
  } else {
      Serial.print("*");
      Serial.println(notPresent);
    }    

  if (tempSensor2[1] == idTempDat2[1] && 
      tempSensor2[2] == idTempDat2[2] && 
      tempSensor2[3] == idTempDat2[3]) {
    current_temp2 = sensors.getTempC(tempSensor2);
 
    if (current_temp2 != -127) {
      Serial.print("&");
      Serial.println(current_temp2);
      temp2_ = (current_temp2 - (int)current_temp2) * 100;

      if ((current_temp2 < 0) && (current_temp2 > -1)) {
        sendRequestMinus(object2, "-", (int)current_temp2, abs(temp2_)); 
      } else {
          sendRequestMinus(object2, "", (int)current_temp2, abs(temp2_)); 
        }   
      } else {
        Serial.print("&");
        Serial.println(removed);
        }
  } else {
    Serial.print("&");
    Serial.println(notPresent);
  }

  if (tempSensor3[1] == idTempDat3[1] && 
      tempSensor3[2] == idTempDat3[2] && 
      tempSensor3[3] == idTempDat3[3]) {
    current_temp3 = sensors.getTempC(tempSensor3);
 
    if (current_temp3 != -127) {
      Serial.print("@");
      Serial.println(current_temp3);
      temp3_ = (current_temp3 - (int)current_temp3) * 100;

      if ((current_temp3 < 0) && (current_temp3 > -1)) {
        sendRequestMinus(object3, "-", (int)current_temp3, abs(temp3_)); 
      } else {
          sendRequestMinus(object3, "", (int)current_temp3, abs(temp3_)); 
        }   
      } else {
          Serial.print("@");
          Serial.println(removed);
        }
  } else {
      Serial.print("@");
      Serial.println(notPresent);
    }

  if (tempSensor4[1] == idTempDat4[1] && 
      tempSensor4[2] == idTempDat4[2] && 
      tempSensor4[3] == idTempDat4[3]) {
    current_temp4 = sensors.getTempC(tempSensor4);
 
    if (current_temp4 != -127) {
      Serial.print("%");
      Serial.println(current_temp4);
      temp4_ = (current_temp4 - (int)current_temp4) * 100;

      if ((current_temp4 < 0) && (current_temp4 > -1)) {
        sendRequestMinus(object4, "-", (int)current_temp4, abs(temp4_)); 
      } else {
          sendRequestMinus(object4, "", (int)current_temp4, abs(temp4_)); 
        } 
    } else {
        Serial.print("%");
        Serial.println(removed);        
      }
  } else {
      Serial.print("%");
      Serial.println(notPresent);
    }

  if (tempSensor5[1] == idTempDat5[1] && 
      tempSensor5[2] == idTempDat5[2] && 
      tempSensor5[3] == idTempDat5[3]) {
    current_temp5 = sensors.getTempC(tempSensor5);
 
    if (current_temp5 != -127) {
      Serial.print("^");
      Serial.println(current_temp5);
      temp5_ = (current_temp5 - (int)current_temp5) * 100;

      if ((current_temp5 < 0) && (current_temp5 > -1)) {
        sendRequestMinus(object5, "-", (int)current_temp5, abs(temp5_)); 
      } else {
          sendRequestMinus(object5, "", (int)current_temp5, abs(temp5_)); 
         }   
    } else {
        Serial.print("^");
        Serial.println(removed);
      } 
  } else {
    Serial.print("^");
    Serial.println(notPresent);
  }
} // tempWorks()

#endif // TEMP_FEATURE
