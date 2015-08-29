/* -----------------------------------------
  full.js v.0.12
  part of Arduino Mega Server project
  Fullscreen with oscilloscope
-------------------------------------------- */

// Timeline graphics
const MAX_FORM_BUFFER = 90;
var bufferElectro6 = [];
var bufferElectro8 = [];

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
          form('freq-1', 3, temp1, '', bufferElectro6, bufferElectro8, 2, 'rgba(240, 180, 0, 1)', 'rgba(255, 221, 0, 1)', 'rgba(255, 255, 255, 1)', 'rgba(180, 80, 20, 1)');
        } // if (this.responseXML != null)
      } // if (this.status == 200)
    } // if (this.readyState == 4)
  } // request.onreadystatechange = function()

  electro_marker5 = 0;

  // send HTTP GET request
  request.open("GET", "request_el_freq" + 'oscill' + randomNoCache(), true);
  request.send(null);
  setTimeout('getElectroForm()', 2000);
} // getElectroForm()

/* end */