/* -----------------------------------------   

  sample2.js v.0.12
  part of Arduino Mega Server project
  Sample2 generic functions
-------------------------------------------- */

var strLED1 = "";
var strLED2 = "";
var strLED3 = "";
var strLED4 = "";
var LED3_state = 0;
var LED4_state = 0;

function drawBar(a, b, c, d, e, f) {
  var
    container = document.getElementById('containerBar'),
    data = [],
    graph, i;

    // Sample the sine function
    // for (i = 0; i < 4 * Math.PI; i += 0.2) {
    // data.push([i, i/2]);
    // }

    data.push([0, a]);
    data.push([1, b]);
    data.push([2, c]);
    data.push([3, d]);
    data.push([4, e]);
    data.push([5, f]);

    // Draw Graph
    graph = Flotr.draw(container, [ data ], {
    yaxis : {
      max : 11000,
      min : 0
    },
    bars: {
      show: true,
      horizontal: false,
      shadowSize: 0,
      barWidth: 0.5
    },
    mouse: {
      track: true,
      relative: true
    },
    xaxis: {
      showLabels: false
    }
  });
} // drawBar( )

function drawPie(a, b, c, d, e, f) {
  var container = document.getElementById('containerPie'),
  d1 = [],
  d2 = [],
  d3 = [],
  d4 = [],
  d5 = [],
  d6 = [],
  graph;

  d1.push([0, parseInt(a)]);
  d2.push([0, parseInt(b)]);
  d3.push([0, parseInt(c)]);
  d4.push([0, parseInt(d)]);
  d5.push([0, parseInt(e)]);
  d6.push([0, parseInt(f)]);

  graph = Flotr.draw(container, [
    {   data: d1,
        label: 'A1'  },
    {   data: d2,
        label: 'A2'  },
    {   data: d3,
        label: 'A3'  },
    {   data: d4,
        label: 'A4'  },
    {   data: d5,
        label: 'A5',
        pie: {
          explode: 40
        }
    },
    {   data: d6,
        label: 'A6' }
    ], {
        HtmlText: false,
        grid: {
            verticalLines: false,
            horizontalLines: false
        },
        xaxis: {
            showLabels: false
        },
        yaxis: {
            showLabels: false
        },
        pie: {
            show: true,
            explode: 4
        },
        mouse: {
            track: true
        },
        legend: {
            position: 'se',
            backgroundColor: '#D2E8FF'
        }
    });
}  // drawPie( )

function getArduinoIO() {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        if (this.responseXML != null) {

          // XML file received - contains analog values, switch values and LED states
          var count;

          // get analog inputs
          var num_an = this.responseXML.getElementsByTagName('analog').length;
          for (count = 0; count < num_an; count++) {
            document.getElementsByClassName("analog")[count].innerHTML =
              this.responseXML.getElementsByTagName('analog')[count].childNodes[0].nodeValue;
          }

          var aa = this.responseXML.getElementsByTagName('analog')[0].childNodes[0].nodeValue;
          var bb = this.responseXML.getElementsByTagName('analog')[1].childNodes[0].nodeValue;
          var cc = this.responseXML.getElementsByTagName('analog')[2].childNodes[0].nodeValue;
          var dd = this.responseXML.getElementsByTagName('analog')[3].childNodes[0].nodeValue;
          var ee = this.responseXML.getElementsByTagName('analog')[4].childNodes[0].nodeValue;
          var ff = this.responseXML.getElementsByTagName('analog')[5].childNodes[0].nodeValue;

          labelAnalog(aa, 'place_a0', '', 'A0', 'rgba(100, 160, 230, 1)'); // '°'
          labelAnalog(bb, 'place_a1', '', 'A1', 'rgba(100, 160, 230, 1)');
          labelAnalog(cc, 'place_a2', '', 'A2', 'rgba(200, 100, 100, 1)');
          labelAnalog(dd, 'place_a3', '', 'A3', 'rgba(200, 100, 100, 1)');
          labelAnalog(ee, 'place_a4', '', 'A4', 'rgba(200, 100, 100, 1)');
          labelAnalog(ff, 'place_a5', '', 'A5', 'rgba(200, 100, 100, 1)');

          drawBar(aa, bb, cc, dd, ee, ff);
          drawPie(aa, bb, cc, dd, ee, ff);

          // Uptime
          document.getElementById("uptime").innerHTML = this.responseXML.getElementsByTagName('uptime')[0].childNodes[0].nodeValue;

          // httpReq
          document.getElementById("httpReq").innerHTML = this.responseXML.getElementsByTagName('httpReq')[0].childNodes[0].nodeValue;

          // HTTP req temp
          document.getElementById("http-req-temp").innerHTML = this.responseXML.getElementsByTagName('httpreqtemp')[0].childNodes[0].nodeValue;

          // XML-req
          document.getElementById("xml-req").innerHTML = this.responseText;

          // get switch inputs
          var num_an = this.responseXML.getElementsByTagName('switch').length;
          for (count = 0; count < num_an; count++) {
            document.getElementsByClassName("switches")[count].innerHTML =
              this.responseXML.getElementsByTagName('switch')[count].childNodes[0].nodeValue;
          }

          var dd2 = this.responseXML.getElementsByTagName('switch')[0].childNodes[0].nodeValue;
          var dd3 = this.responseXML.getElementsByTagName('switch')[1].childNodes[0].nodeValue;
          var dd5 = this.responseXML.getElementsByTagName('switch')[2].childNodes[0].nodeValue;

          dd0 = 'RX';
          dd1 = 'TX';
          dd4 = 'ETH';
          dd6 = 'D';
          dd7 = 'D';
          dd8 = 'D';
          dd9 = 'D';
          dd10 = 'ETH';
          dd11 = 'ETH';
          dd12 = 'ETH';
          dd13 = 'ETH';

          label(dd0, 'place_d0', '', 'D0', 'rgba(100, 100, 100, 1)');
          label(dd1, 'place_d1', '', 'D1', 'rgba(100, 100, 100, 1)');
          label(dd2, 'place_d2', '', 'D2', 'rgba(200, 150, 100, 1)');
          label(dd3, 'place_d3', '', 'D3', 'rgba(200, 150, 100, 1)');
          label(dd4, 'place_d4', '', 'D4', 'rgba(180, 180, 180, 1)');
          label(dd5, 'place_d5', '', 'D5', 'rgba(200, 150, 100, 1)');
          label(dd6, 'place_d6', '', 'D6', 'rgba(200, 250, 100, 1)');
          label(dd7, 'place_d7', '', 'D7', 'rgba(200, 250, 100, 1)');
          label(dd8, 'place_d8', '', 'D8', 'rgba(200, 250, 100, 1)');
          label(dd9, 'place_d9', '', 'D9', 'rgba(200, 250, 100, 1)');
          label(dd10, 'place_d10', '', 'D10', 'rgba(180, 180, 180, 1)');
          label(dd11, 'place_d11', '', 'D11', 'rgba(180, 180, 180, 1)');
          label(dd12, 'place_d12', '', 'D12', 'rgba(180, 180, 180, 1)');
          label(dd13, 'place_d13', '', 'D13', 'rgba(180, 180, 180, 1)');

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
          if (this.responseXML.getElementsByTagName('LED')[2].childNodes[0].nodeValue === "on") {
            document.getElementById("LED3").innerHTML = "LED 3 is ON (D5)";
            document.getElementById("ld5").innerHTML = "ON";
            LED3_state = 1;
          } else {
              document.getElementById("LED3").innerHTML = "LED 3 is OFF (D5)";
              document.getElementById("ld5").innerHTML = "OFF";
              LED3_state = 0;
            }

          // LED 4
          if (this.responseXML.getElementsByTagName('LED')[3].childNodes[0].nodeValue === "on") {
            document.getElementById("LED4").innerHTML = "LED 4 is ON (D3)";
            document.getElementById("ld3").innerHTML = "ON";
            LED4_state = 1;
          } else {
              document.getElementById("LED4").innerHTML = "LED 4 is OFF (D3)";
              document.getElementById("ld3").innerHTML = "OFF";
              LED4_state = 0;
            }

        } //if (this.responseXML != null)
      } // if (this.status == 200)
    } // if (this.readyState == 4)
  } // end request.onreadystatechange = function()

  // send HTTP GET request with LEDs to switch on/off if any
  request.open("GET", "request_generic" + strLED1 + strLED2 + strLED3 + strLED4 + randomNoCache(), true);
  request.send(null);
  setTimeout('getArduinoIO()', 1000);
  strLED1 = "";
  strLED2 = "";
  strLED3 = "";
  strLED4 = "";
} // getArduinoIO()

/* -----------------------------------------
  service LEDs when checkbox checked/unchecked
-------------------------------------------- */
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