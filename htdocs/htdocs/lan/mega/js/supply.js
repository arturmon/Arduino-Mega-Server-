/* -----------------------------------------
  supply.js v.0.1
  part of Arduino Mega Server project
  Supply Power functions
-------------------------------------------- */

var strLED1 = "";
var strLED2 = "";
var strLED3 = "";
var strLED4 = "";
var LED3_state = 0;
var LED4_state = 0;
var electro_marker1 = 0;
var electro_marker2 = 0;
var electro_marker3 = 0;
var electro_marker4 = 0;
var electro_marker5 = 0;
var electro_marker6 = 0;

/* -------------------------------------------
  Function getArduinoIO()
    TODO: do not use "request_electro_control"
---------------------------------------------- */

function getArduinoIO() {
  electro_marker2 = 1;

  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        if (this.responseXML != null) {
          var count;

          electro_marker1 = 1;
          electro_marker2 = 0;

          // LED 1
          if (this.responseXML.getElementsByTagName('LED')[0].childNodes[0].nodeValue === "checked") {
            document.LED_form.LED1.checked = true;
            document.getElementById("ld6").innerHTML = "ON";
          } else {
              document.LED_form.LED1.checked = false;
              document.getElementById("ld6").innerHTML = "OFF";
            }

          // LED 2
          if (this.responseXML.getElementsByTagName('LED')[1].childNodes[0].nodeValue === "checked") {
            document.LED_form.LED2.checked = true;
            document.getElementById("ld7").innerHTML = "ON";
          } else {
              document.LED_form.LED2.checked = false;
              document.getElementById("ld7").innerHTML = "OFF";
            }

          // LED 4
          if (this.responseXML.getElementsByTagName('LED')[3].childNodes[0].nodeValue === "on") {
            document.getElementById("LED4").innerHTML = "KEY 3 is ON (D3)";
            document.getElementById("ld3").innerHTML = "ON";
            LED4_state = 1;
          } else {
              document.getElementById("LED4").innerHTML = "KEY 3 is OFF (D3)";
              document.getElementById("ld3").innerHTML = "OFF";
              LED4_state = 0;
            }

        } // if (this.responseXML != null)
      } // if (this.status == 200)
    } // if (this.readyState == 4)
  } // request.onreadystatechange = function()

  electro_marker1 = 0;

  // send HTTP GET request with switch on/off
  request.open("GET", "request_electro_control" + strLED1 + strLED2 + strLED3 + strLED4 + randomNoCache(), true);
  request.send(null);
  setTimeout('getArduinoIO()', 1000);
  strLED1 = "";
  strLED2 = "";
  strLED3 = "";
  strLED4 = "";

} // getArduinoIO

/* -----------------------------------
  Function getElectroData()
    TODO: do not use "request_electro"
-------------------------------------- */

function getElectroData() {
  electro_marker4 = 1;

  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        if (this.responseXML != null) {

          electro_marker3 = 1;
          electro_marker4 = 0;

          // Electro
          try {
            var volt = this.responseXML.getElementsByTagName('voltage')[0].childNodes[0].nodeValue;
            volt = Math.round(parseInt(volt), 0);
          } catch (err) {
              volt = "...";
            }
          document.getElementById("volt").innerHTML = volt;
          try {
            var p1 = this.responseXML.getElementsByTagName('power')[0].childNodes[0].nodeValue;
            p1 = Math.round(parseInt(p1), 0);
          } catch (err) {
              p1 = "...";
            }
          document.getElementById("p1").innerHTML = p1;

          graph('graph-voltage', 3, volt, '', bufferElectro9, '', 'pwr', 'rgba(4, 169, 174, 1)', 'rgba(204,9,51, 1)', 'lightblue');
          graph('graph-power', 3, p1, '', bufferElectro1, '', 'pwr', 'rgba(4, 169, 174, 1)', 'rgba(213,125,12, 1)', 'lightblue');

          // Period
          try {
            var period = this.responseXML.getElementsByTagName('period')[0].childNodes[0].nodeValue;
            period -= 100;
          } catch (err) {
              period = "-";
            }
          var frec = 1 / (period / 1000000);

          document.getElementById("freq").innerHTML = frec.toFixed(2);

          graph('graph-freq', 3, frec.toFixed(2), '', bufferElectro7, '', 'pwr', 'rgba(4, 169, 174, 1)', 'rgba(44,77,220, 1)', 'lightblue');
        } // if (this.responseXML != null)
      } // if (this.status == 200)
    } // if (this.readyState == 4)
  } // request.onreadystatechange = function()

  electro_marker3 = 0;

  // send HTTP GET request with LEDs to switch on/off if any
  request.open("GET", "request_electro" + randomNoCache(), true);
  request.send(null);
  setTimeout('getElectroData()', 1000);
} // getElectroData

/* ------------------------
  Function getElectroForm()
    Get Electro Form
--------------------------- */

function getElectroForm() {
  electro_marker6 = 1;

  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        if (this.responseXML != null) {

          electro_marker5 = 1;
          electro_marker6 = 0;

          var temp1 = 0;
          var temp2 = 0;

          var num_an = this.responseXML.getElementsByTagName('u').length;
          for (count = 0; count < num_an; count++) {
            temp1 = this.responseXML.getElementsByTagName('u')[count].childNodes[0].nodeValue;
            bufferElectro6[num_an - count] = temp1;
          }

          var num_an = this.responseXML.getElementsByTagName('i').length;
          for (count = 0; count < num_an; count++) {
            temp2 = this.responseXML.getElementsByTagName('i')[count].childNodes[0].nodeValue;
            bufferElectro8[num_an - count] = temp2;
          }
          form('freq-1', 3, temp1, '', bufferElectro6, bufferElectro8, 2, 'rgba(4, 169, 174, 1)', 'rgba(204,9,51, 1)', 'rgba(44, 140, 255, 1)', 'rgba(255, 255, 255, 1)');
        } //if (this.responseXML != null)
      } // if (this.status == 200)
    } // if (this.readyState == 4)
  } // request.onreadystatechange = function()

  electro_marker5 = 0;

  // send HTTP GET request
  request.open("GET", "request_el_freq" + randomNoCache(), true);
  request.send(null);
  setTimeout('getElectroForm()', 5000);
} // getElectroForm

/* -------------------------------------------
  service LEDs when checkbox checked/unchecked
---------------------------------------------- */

function GetCheck() {
  if (LED_form.LED1.checked) {
    strLED1 = "&LED1=1";
  } else {
      strLED1 = "&LED1=0";
    }

  if (LED_form.LED2.checked) {
    strLED2 = "&LED2=1";
  } else {
      strLED2 = "&LED2=0";
    }
} // GetCheck

/* -----------------------------------------
  service LEDs when button checked/unchecked
-------------------------------------------- */

function GetButton1() {
  if (LED3_state === 1) {
    LED3_state = 0;
    strLED3 = "&LED3=0";
  } else {
      LED3_state = 1;
      strLED3 = "&LED3=1";
    }
}

function GetButton2() {
  if (LED4_state === 1) {
    LED4_state = 0;
    strLED4 = "&LED4=0";
  } else {
      LED4_state = 1;
      strLED4 = "&LED4=1";
    }
}

function start() {
  getArduinoIO();
  getElectroData();
  getElectroForm();
  getDashData();
}
