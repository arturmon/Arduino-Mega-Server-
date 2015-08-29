/* -----------------------------------------   

  full2.js v.0.12
  part of Arduino Mega Server project
  Fullscreen with power didits
-------------------------------------------- */

// Timeline graphics
const MAX_GRAPH_BUFFER = 150;
var bufferElectro1 = [];

// Main function
function getFull2Data() {
  dash_marker2 = parseFloat("1.0");
  dash_marker3 = parseFloat("1.0");

  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        if (this.responseXML != null) {

          dash_marker1 = parseFloat("1.0");
          dash_marker2 = parseFloat("0.0");

          try {
            var pwr = this.responseXML.getElementsByTagName('power')[0].childNodes[0].nodeValue;
          } catch (err) {
              pwr = "0";
            }
          var power = Math.round(parseInt(pwr), 0);

          // Cyclos / CPU load
          var cyclosDelay = this.responseXML.getElementsByTagName('cycDelay')[0].childNodes[0].nodeValue;
          var cyclosInSec = this.responseXML.getElementsByTagName('cycInSec')[0].childNodes[0].nodeValue;

          document.getElementById("big-dig").innerHTML = power;
          line('info-graph1', power, bufferElectro1, 'rgba(55, 55, 55, 1)');

        } // if (this.responseXML != null)
      } // if (this.status == 200)
    } // if (this.readyState == 4)
  } // request.onreadystatechange = function()

  dash_marker1 = parseFloat("0.0");

  // send HTTP GET request with LEDs to switch on/off if any
  request.open("GET", "request_dash" + randomNoCache(), true);
  request.send(null);
  setTimeout('getFull2Data()', 1000);
  dash_marker3 = parseFloat("0.0");
} // getFull2Data()

/* end */