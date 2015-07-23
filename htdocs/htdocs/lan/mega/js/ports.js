/* -----------------------------------------
  ports.js v.0.1
  part of Arduino Mega Server project
  Ports functions
-------------------------------------------- */

var showAjaxInfo = false;

function getPorts() {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        if (this.responseXML != null) {

          // HTTP request
          document.getElementById("get-ports-request").innerHTML = this.responseXML.getElementsByTagName('httpReq')[0].childNodes[0].nodeValue;

          // XML-req
          document.getElementById("get-ports-response").innerHTML = this.responseText;

          // Pins status

          try {
            var pin2 = this.responseXML.getElementsByTagName('pin2')[0].childNodes[0].nodeValue;
          } catch (err) {
              pin2 = "-1";
            }
          document.getElementById("pin2").innerHTML = stateOnOff(pin2);
          document.getElementById("pin2").style.background = stateOnOffBackground(pin2);
          document.getElementById("pin2").style.color = stateOnOffColor(pin2);

          try {
            var pin3 = this.responseXML.getElementsByTagName('pin3')[0].childNodes[0].nodeValue;
          } catch (err) {
              pin3 = "-1";
            }
          document.getElementById("pin3").innerHTML = stateOnOff(pin3);
          document.getElementById("pin3").style.background = stateOnOffBackground(pin3);
          document.getElementById("pin3").style.color = stateOnOffColor(pin3);

          try {
            var pin4 = this.responseXML.getElementsByTagName('pin4')[0].childNodes[0].nodeValue;
          } catch (err) {
              pin4 = "-1";
            }
          document.getElementById("pin4").innerHTML = stateOnOff(pin4);
          document.getElementById("pin4").style.background = stateOnOffBackground(pin4);
          document.getElementById("pin4").style.color = stateOnOffColor(pin4);

          try {
            var pin5 = this.responseXML.getElementsByTagName('pin5')[0].childNodes[0].nodeValue;
          } catch (err) {
              pin5 = "-1";
            }
          document.getElementById("pin5").innerHTML = stateOnOff(pin5);
          document.getElementById("pin5").style.background = stateOnOffBackground(pin5);
          document.getElementById("pin5").style.color = stateOnOffColor(pin5);

          try {
            var pin6 = this.responseXML.getElementsByTagName('pin6')[0].childNodes[0].nodeValue;
          } catch (err) {
              pin6 = "-1";
            }
          document.getElementById("pin6").innerHTML = stateOnOff(pin6);
          document.getElementById("pin6").style.background = stateOnOffBackground(pin6);
          document.getElementById("pin6").style.color = stateOnOffColor(pin6);

          try {
            var pin7 = this.responseXML.getElementsByTagName('pin7')[0].childNodes[0].nodeValue;
          } catch (err) {
              pin7 = "-1";
            }
          document.getElementById("pin7").innerHTML = stateOnOff(pin7);
          document.getElementById("pin7").style.background = stateOnOffBackground(pin7);
          document.getElementById("pin7").style.color = stateOnOffColor(pin7);

          try {
            var pin8 = this.responseXML.getElementsByTagName('pin8')[0].childNodes[0].nodeValue;
          } catch (err) {
              pin8 = "-1";
            }
          document.getElementById("pin8").innerHTML = stateOnOff(pin8);
          document.getElementById("pin8").style.background = stateOnOffBackground(pin8);
          document.getElementById("pin8").style.color = stateOnOffColor(pin8);

          try {
            var pin9 = this.responseXML.getElementsByTagName('pin9')[0].childNodes[0].nodeValue;
          } catch (err) {
              pin9 = "-1";
            }
          document.getElementById("pin9").innerHTML = stateOnOff(pin9);
          document.getElementById("pin9").style.background = stateOnOffBackground(pin9);
          document.getElementById("pin9").style.color = stateOnOffColor(pin9);

          try {
            var pin10 = this.responseXML.getElementsByTagName('pin10')[0].childNodes[0].nodeValue;
          } catch (err) {
              pin10 = "-1";
            }
          document.getElementById("pin10").innerHTML = stateOnOff(pin10);
          document.getElementById("pin10").style.background = stateOnOffBackground(pin10);
          document.getElementById("pin10").style.color = stateOnOffColor(pin10);

          try {
            var pin22 = this.responseXML.getElementsByTagName('pin22')[0].childNodes[0].nodeValue;
          } catch (err) {
              pin22 = "-1";
            }
          document.getElementById("pin22").innerHTML = stateOnOff(pin22);
          document.getElementById("pin22").style.background = stateOnOffBackground(pin22);
          document.getElementById("pin22").style.color = stateOnOffColor(pin22);

          try {
            var pin23 = this.responseXML.getElementsByTagName('pin23')[0].childNodes[0].nodeValue;
          } catch (err) {
              pin23 = "-1";
            }
          document.getElementById("pin23").innerHTML = stateOnOff(pin23);
          document.getElementById("pin23").style.background = stateOnOffBackground(pin23);
          document.getElementById("pin23").style.color = stateOnOffColor(pin23);

          try {
            var pin24 = this.responseXML.getElementsByTagName('pin24')[0].childNodes[0].nodeValue;
          } catch (err) {
              pin24 = "-1";
            }
          document.getElementById("pin24").innerHTML = stateOnOff(pin24);
          document.getElementById("pin24").style.background = stateOnOffBackground(pin24);
          document.getElementById("pin24").style.color = stateOnOffColor(pin24);

          try {
            var pin25 = this.responseXML.getElementsByTagName('pin25')[0].childNodes[0].nodeValue;
          } catch (err) {
              pin25 = "-1";
            }
          document.getElementById("pin25").innerHTML = stateOnOff(pin25);
          document.getElementById("pin25").style.background = stateOnOffBackground(pin25);
          document.getElementById("pin25").style.color = stateOnOffColor(pin25);

          try {
            var pin26 = this.responseXML.getElementsByTagName('pin26')[0].childNodes[0].nodeValue;
          } catch (err) {
              pin26 = "-1";
            }
          document.getElementById("pin26").innerHTML = stateOnOff(pin26);
          document.getElementById("pin26").style.background = stateOnOffBackground(pin26);
          document.getElementById("pin26").style.color = stateOnOffColor(pin26);

          try {
            var pin27 = this.responseXML.getElementsByTagName('pin27')[0].childNodes[0].nodeValue;
          } catch (err) {
              pin27 = "-1";
            }
          document.getElementById("pin27").innerHTML = stateOnOff(pin27);
          document.getElementById("pin27").style.background = stateOnOffBackground(pin27);
          document.getElementById("pin27").style.color = stateOnOffColor(pin27);

          try {
            var pin30 = this.responseXML.getElementsByTagName('pin30')[0].childNodes[0].nodeValue;
          } catch (err) {
              pin30 = "-1";
            }
          document.getElementById("pin30").innerHTML = stateOnOff(pin30);
          document.getElementById("pin30").style.background = stateOnOffBackground(pin30);
          document.getElementById("pin30").style.color = stateOnOffColor(pin30);

          try {
            var pin31 = this.responseXML.getElementsByTagName('pin31')[0].childNodes[0].nodeValue;
          } catch (err) {
              pin31 = "-1";
            }
          document.getElementById("pin31").innerHTML = stateOnOff(pin31);
          document.getElementById("pin31").style.background = stateOnOffBackground(pin31);
          document.getElementById("pin31").style.color = stateOnOffColor(pin31);

        } //if (this.responseXML != null)
      } // if (this.status == 200)
    } // if (this.readyState == 4)
  } // request.onreadystatechange = function()

  // send HTTP GET request
  request.open("GET", "request_ports" + randomNoCache(), true);
  request.send(null);
  setTimeout('getPorts()', 1000);
} // getPorts

function hideAjaxInfo() {
  if (showAjaxInfo) {
    document.getElementById("ajax-request").style.display = "none";
    document.getElementById("ajax-response").style.display = "none";
    showAjaxInfo = false;
  } else {
      document.getElementById("ajax-request").style.display = "inline-block";
      document.getElementById("ajax-response").style.display = "inline-block";
      showAjaxInfo = true;
    }
}

function start() {
  getPorts();
  getDashData();
}
