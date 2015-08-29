/* -----------------------------------------
  settings.js v.0.12
  part of Arduino Mega Server project
  Settings functions
-------------------------------------------- */

var strLED1 = "";
var strLED2 = "";
var strLED3 = "";
var strLED4 = "";
var strRD2 = "";
var reload = false;

var oldValRD2 = "";

var LED3_state = 0;
var LED4_state = 0;

function getSettings() {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {
    if (this.readyState == 4) {

      if (this.status == 200) {
        if (this.responseXML != null) {
          var count;

          // LED 1 (Mode One/Major)
          if (this.responseXML.getElementsByTagName('LED')[0].childNodes[0].nodeValue === "checked") {
            document.LED_form.LED1.checked = true;
          } else {
              document.LED_form.LED1.checked = false;
            }

          // LED 2
          /*
          if (this.responseXML.getElementsByTagName('LED')[1].childNodes[0].nodeValue === "checked") {
            document.LED_form.LED2.checked = true;
            document.getElementById("ld7").innerHTML = "ON";
          } else {
              document.LED_form.LED2.checked = false;
              document.getElementById("ld7").innerHTML = "OFF";
            }
          */

          // RD2
          var valRD2 = this.responseXML.getElementsByTagName('RD2')[0].childNodes[0].nodeValue;

          if (oldValRD2 != "" && oldValRD2 != valRD2) {reload = true;}

          switch (valRD2) {
            case "2": document.getElementById("rd2").checked = true; break;
            case "5": document.getElementById("rd5").checked = true; break;
            case "6": document.getElementById("rd6").checked = true; break;
            default:  document.getElementById("rd7").checked = true;
          }
          oldValRD2 = valRD2;

          // LED 3
          var modElectro = this.responseXML.getElementsByTagName('modulElectro')[0].childNodes[0].nodeValue;
          if (modElectro != "2") {
            if (this.responseXML.getElementsByTagName('LED')[2].childNodes[0].nodeValue === "on") {
              LED3_state = 1;
            } else {
                LED3_state = 0;
              }
          }
          // LED 4
          if (this.responseXML.getElementsByTagName('LED')[3].childNodes[0].nodeValue === "on") {
            document.getElementById("LED4").innerHTML = "KEY 3 is ON (D3)";
            LED4_state = 1;
          } else {
              document.getElementById("LED4").innerHTML = "KEY 3 is OFF (D3)";
              LED4_state = 0;
            }

        } // if (this.responseXML != null)
      } // if (this.status == 200)
    } // if (this.readyState == 4)
  } // request.onreadystatechange = function()

  if (reload) {
    reload = false;
    alert('Сейчас стиль оформления будет изменён. Перезагрузка может занять несколько секунд...')
    location.reload();
  }

  // send HTTP GET request with LEDs to switch on/off if any
  request.open("GET", "request_settings" + strLED1 + strLED2 + strLED3 + strLED4 + strRD2 + randomNoCache(), true);
  request.send(null);
  setTimeout('getSettings()', 1000);
  strLED1 = "";
  strLED2 = "";
  strLED3 = "";
  strLED4 = "";
  strRD2 = "";

} // getSettings()

/* -------------------------------------------
  service LEDs when checkbox checked/unchecked
---------------------------------------------- */

function GetCheck() {
  if (LED_form.LED1.checked) {
    strLED1 = "&LED1=1";
  } else {
      strLED1 = "&LED1=0";
    }
  /*
  if (LED_form.LED2.checked) {
    strLED2 = "&LED2=1";
  } else {
      strLED2 = "&LED2=0";
    }
  */
}

function setRadio() {
  strRD2 = "&RD2=0";

  if (document.getElementById("rd2").checked) {
    strRD2 = "&RD2=2";
  }

  if (document.getElementById("rd5").checked) {
    strRD2 = "&RD2=5";
  }

  if (document.getElementById("rd6").checked) {
    strRD2 = "&RD2=6";
  }

  if (document.getElementById("rd7").checked) {
    strRD2 = "&RD2=7";
  }
}

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

/* end */