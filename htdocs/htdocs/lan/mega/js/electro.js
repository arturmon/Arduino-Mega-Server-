/* -----------------------------------------
  electro.js v.0.11
  part of Arduino Mega Server project
  Electro functions
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

function getArduinoIO() {
  electro_marker2 = 1;

  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState == 4) {

      electro_marker1 = 1;
      electro_marker2 = 0;

      if (this.status == 200) {
        if (this.responseXML != null) {
          var count;

          //electro_marker1 = 1;
          //electro_marker2 = 0;

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

          // LED 3
          var modElectro = this.responseXML.getElementsByTagName('modulElectro')[0].childNodes[0].nodeValue;
          if (modElectro != "2") {
            if (this.responseXML.getElementsByTagName('LED')[2].childNodes[0].nodeValue === "on") {
              document.getElementById("button-electro").innerHTML = "ON";
              document.getElementById("button-electro").style.background = modulActive;
              LED3_state = 1;
            } else {
                document.getElementById("button-electro").innerHTML = "OFF";
                document.getElementById("button-electro").style.background = modulPassive;
                LED3_state = 0;
              }
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

  // send HTTP GET request with LEDs to switch on/off if any
  request.open("GET", "request_electro_control" + strLED1 + strLED2 + strLED3 + strLED4 + randomNoCache(), true);
  request.send(null);
  setTimeout('getArduinoIO()', 1000);
  strLED1 = "";
  strLED2 = "";
  strLED3 = "";
  strLED4 = "";

} // getArduinoIO

/* ------------------------
  Function getElectroData()
    Get Electro Data
--------------------------- */

function getElectroData() {
  electro_marker4 = 1;

  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        if (this.responseXML != null) {

          electro_marker3 = 1;
          electro_marker4 = 0;

          // Electro modul
          var modulElectro = this.responseXML.getElementsByTagName('modulElectro')[0].childNodes[0].nodeValue;
          var modulElectroStatus = "";

          switch (modulElectro) {
            case "0":
              modulElectroStatus = "выключен";
            break;
            case "1":
              modulElectroStatus = "включен";
            break;
            default:
              modulElectroStatus = "отсутствует";
              document.getElementById("button-electro").innerHTML = "-";
              document.getElementById("button-electro").style.background = modulDisable;
            break;
          }
          document.getElementById("modul-electro").innerHTML = modulElectroStatus;


          // Electro
          try {
            var volt = this.responseXML.getElementsByTagName('volt')[0].childNodes[0].nodeValue;
            volt = Math.round(parseInt(volt), 0);
          } catch (err) {
              volt = "...";
            }
          document.getElementById("volt").innerHTML = volt;
          try {
            var p1 = this.responseXML.getElementsByTagName('p1')[0].childNodes[0].nodeValue;
            p1 = Math.round(parseInt(p1), 0);
          } catch (err) {
              p1 = "...";
            }
          document.getElementById("p1").innerHTML = p1;
          try {
            var p2 = this.responseXML.getElementsByTagName('p2')[0].childNodes[0].nodeValue;
            p2 = Math.round(parseInt(p2), 0);
          } catch (err) {
              p2 = "...";
            }
          document.getElementById("p2").innerHTML = p2;
          try {
            var p3 = this.responseXML.getElementsByTagName('p3')[0].childNodes[0].nodeValue;
            p3 = Math.round(parseInt(p3), 0);
          } catch (err) {
              p3 = "...";
            }
          document.getElementById("p3").innerHTML = p3;
          try {
            var p4 = this.responseXML.getElementsByTagName('p4')[0].childNodes[0].nodeValue;
            p4 = Math.round(parseInt(p4), 0);
          } catch (err) {
              p4 = "...";
            }
          document.getElementById("p4").innerHTML = p4;
          try {
            var p5 = this.responseXML.getElementsByTagName('p5')[0].childNodes[0].nodeValue;
            p5 = Math.round(parseInt(p5), 0);
          } catch (err) {
              p5 = "...";
            }
          document.getElementById("p5").innerHTML = p5;
          try {
          var p6 = this.responseXML.getElementsByTagName('p6')[0].childNodes[0].nodeValue;
          p6 = Math.round(parseInt(p6), 0);
          } catch (err) {
              p6 = "...";
            }
          document.getElementById("p6").innerHTML = p6;
          try {
            var p7 = this.responseXML.getElementsByTagName('p7')[0].childNodes[0].nodeValue;
            p7 = Math.round(parseInt(p7), 0);
          } catch (err) {
              p7 = "...";
            }
          document.getElementById("p7").innerHTML = p7;
          try {
            var p8 = this.responseXML.getElementsByTagName('p8')[0].childNodes[0].nodeValue;
            p8 = Math.round(parseInt(p8), 0);
          } catch (err) {
              p8 = "...";
            }
          document.getElementById("p8").innerHTML = p8;
          try {
            var p9 = this.responseXML.getElementsByTagName('p9')[0].childNodes[0].nodeValue;
            p9 = Math.round(parseInt(p9), 0);
          } catch (err) {
              p9 = "...";
            }
          document.getElementById("p9").innerHTML = p9;
          try {
            var p10 = this.responseXML.getElementsByTagName('p10')[0].childNodes[0].nodeValue;
            p10 = Math.round(parseInt(p10), 0);
          } catch (err) {
              p10 = "...";
            }
          document.getElementById("p10").innerHTML = p10;
          try {
            var p11 = this.responseXML.getElementsByTagName('p11')[0].childNodes[0].nodeValue;
            p11 = Math.round(parseInt(p11), 0);
          } catch (err) {
              p11 = "...";
            }
          document.getElementById("p11").innerHTML = p11;
          try {
            var p12 = this.responseXML.getElementsByTagName('p12')[0].childNodes[0].nodeValue;
            p12 = Math.round(parseInt(p12), 0);
          } catch (err) {
              p12 = "...";
            }
          document.getElementById("p12").innerHTML = p12;
          try {
            var p13 = this.responseXML.getElementsByTagName('p13')[0].childNodes[0].nodeValue;
            p13 = Math.round(parseInt(p13), 0);
          } catch (err) {
              p13 = "...";
            }
          document.getElementById("p13").innerHTML = p13;

          graph('graph-test', 3, p1, '', bufferElectro1, '', 2, 'rgba(4, 169, 174, 1)', 'rgba(204,9,51, 1)', 'lightblue');
          graph('graph-cond', 3, p4, '', bufferElectro2, '', 2, 'rgba(4, 169, 174, 1)', 'rgba(213,125,12, 1)', 'lightblue');
          graph('graph-plita', 3, p2, '', bufferElectro3, '', 2, 'rgba(4, 169, 174, 1)', 'rgba(166,0,151, 1)', 'lightblue');
          graph('graph-str', 3, p3, '', bufferElectro4, '', 2, 'rgba(4, 169, 174, 1)', 'rgba(75,152,190, 1)', 'lightblue');

          device('device-plita', 3, p2, 'Плита',             200, 500, 900, 1500);
          device('device-str',   3, p3, 'Стиральная машина', 60, 300, 1500, 2000);
          device('device-cond',  3, p4, 'Кондиционер',       60, 100, 600, 1500);
          // draw bar
          drawBar(p2, p3, p4, p6, p7, p8, p9, p10, p11, p12, p13);
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
  getDashData();
}
