/* -----------------------------------------
  supply.js v.0.12
  part of Arduino Mega Server project
  Supply Power functions
-------------------------------------------- */

var electro_marker1 = 0;
var electro_marker2 = 0;
var electro_marker3 = 0;
var electro_marker4 = 0;
var electro_marker5 = 0;
var electro_marker6 = 0;

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
} // getElectroData()

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
} // getElectroForm()

/* end */