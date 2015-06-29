/* -----------------------------------------
  electro.js v.0.1
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

          // HTTP request
          document.getElementById("httpReq").innerHTML = this.responseXML.getElementsByTagName('httpReq')[0].childNodes[0].nodeValue;

          // HTTP request temp
          document.getElementById("http-req-temp").innerHTML = this.responseXML.getElementsByTagName('httpreqtemp')[0].childNodes[0].nodeValue;

          // XML-req
          document.getElementById("xml-req").innerHTML = this.responseText;

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
            
        } //if (this.responseXML != null)
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
          
          // XML-req
          document.getElementById("xml-electro-data").innerHTML = this.responseText;
          
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
          } catch (err) {
              volt = "0";
            }
          document.getElementById("volt").innerHTML = Math.round(parseInt(volt), 0);
          try {
            var p1 = this.responseXML.getElementsByTagName('p1')[0].childNodes[0].nodeValue;
          } catch (err) {
              p1 = "0";
            }
          document.getElementById("p1").innerHTML = Math.round(parseInt(p1), 0);
          try {
            var p2 = this.responseXML.getElementsByTagName('p2')[0].childNodes[0].nodeValue;
          } catch (err) {
              p2 = "0";
            }
          document.getElementById("p2").innerHTML = Math.round(parseInt(p2), 0);
          try {
            var p3 = this.responseXML.getElementsByTagName('p3')[0].childNodes[0].nodeValue;
          } catch (err) {
              p3 = "0";
            }
          document.getElementById("p3").innerHTML = Math.round(parseInt(p3), 0);
          try {
            var p4 = this.responseXML.getElementsByTagName('p4')[0].childNodes[0].nodeValue;
          } catch (err) {
              p4 = "0";
            }
          document.getElementById("p4").innerHTML = Math.round(parseInt(p4), 0);
          try {
            var p5 = this.responseXML.getElementsByTagName('p5')[0].childNodes[0].nodeValue;
          } catch (err) {
              p5 = "0";
            }
          document.getElementById("p5").innerHTML = Math.round(parseInt(p5), 0);
          try {
          var p6 = this.responseXML.getElementsByTagName('p6')[0].childNodes[0].nodeValue;
          } catch (err) {
              p6 = "0";
            }
          document.getElementById("p6").innerHTML = Math.round(parseInt(p6), 0);
          try {
            var p7 = this.responseXML.getElementsByTagName('p7')[0].childNodes[0].nodeValue;
          } catch (err) {
              p7 = "0";
            }
          document.getElementById("p7").innerHTML = Math.round(parseInt(p7), 0);
          try {
            var p8 = this.responseXML.getElementsByTagName('p8')[0].childNodes[0].nodeValue;
          } catch (err) {
              p8 = "0";
            }
          document.getElementById("p8").innerHTML = Math.round(parseInt(p8), 0);
          try {
            var p9 = this.responseXML.getElementsByTagName('p9')[0].childNodes[0].nodeValue;
          } catch (err) {
              p9 = "0";
            }
          document.getElementById("p9").innerHTML = Math.round(parseInt(p9), 0);
          try {
            var p10 = this.responseXML.getElementsByTagName('p10')[0].childNodes[0].nodeValue;
          } catch (err) {
              p10 = "0";
            }
          document.getElementById("p10").innerHTML = Math.round(parseInt(p10), 0);
          try {
            var p11 = this.responseXML.getElementsByTagName('p11')[0].childNodes[0].nodeValue;
          } catch (err) {
              p11 = "0";
            }
          document.getElementById("p11").innerHTML = Math.round(parseInt(p11), 0);
          try {
            var p12 = this.responseXML.getElementsByTagName('p12')[0].childNodes[0].nodeValue;
          } catch (err) {
              p12 = "0";
            }
          document.getElementById("p12").innerHTML = Math.round(parseInt(p12), 0);
          try {
            var p13 = this.responseXML.getElementsByTagName('p13')[0].childNodes[0].nodeValue;
          } catch (err) {
              p13 = "0";
            }
          document.getElementById("p13").innerHTML = Math.round(parseInt(p13), 0);

          // draw bar
          drawBar(p2, p3, p4, p6, p7, p8, p9, p10, p11, p12, p13);
        } //if (this.responseXML != null)
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
