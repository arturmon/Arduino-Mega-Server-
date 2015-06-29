/* -----------------------------------------
  dash.js v.0.1
  part of Arduino Mega Server project
  Dashboard functions
-------------------------------------------- */

// Var's for Processing sketch
var dash_marker1 = 0; // ok XML func
var dash_marker2 = 0; // not ok XML func
var dash_marker3 = 0; // in XML func
var fig = 2; // type of 3D model

// Device online
var TOTAL_NET_DEVICES = 10;
var netDevicesNames = ["SWH", "HOM", "MED", "CMP", "PRN", "MGA", "UN1", "UN2", "LRN", "APC"];

// Timeline graphics
const MAX_CPU_LOAD_BUFFER = 16;
var bufferCpuLoad1 = [];
var bufferCpuLoad2 = [];
var bufferCpuLoad3 = [];
var bufferCpuLoad4 = [];
var bufferCpuLoad5 = [];
var bufferCpuLoad6 = [];

// Main function
function getDashData() {
  dash_marker2 = parseFloat("1.0");
  dash_marker3 = parseFloat("1.0");
  
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        if (this.responseXML != null) {

          dash_marker1 = parseFloat("1.0");
          dash_marker2 = parseFloat("0.0");
          

          // Moduls
          try {
            var modulRtc = this.responseXML.getElementsByTagName('modulRtc')[0].childNodes[0].nodeValue;
          } catch (err) {
              modulRtc = "-1";
            }
          document.getElementById("modul-rtc").innerHTML = "RTC";
          document.getElementById("modul-rtc").style.background = modulBackground(modulRtc);
          document.getElementById("modul-rtc").style.color = modulColor(modulRtc);

          try {
            var modulEthernet = this.responseXML.getElementsByTagName('modulEthernet')[0].childNodes[0].nodeValue;
          } catch (err) {
              modulEthernet = "-1";
            }
          document.getElementById("modul-ethernet").innerHTML = "ETR";
          document.getElementById("modul-ethernet").style.background = modulBackground(modulEthernet);
          document.getElementById("modul-ethernet").style.color = modulColor(modulEthernet);

          try {
            var modulSdCard = this.responseXML.getElementsByTagName('modulSdCard')[0].childNodes[0].nodeValue;
          } catch (err) {
              modulSdCard = "-1";
            }
          document.getElementById("modul-sd-card").innerHTML = "SDC";
          document.getElementById("modul-sd-card").style.background = modulBackground(modulSdCard);
          document.getElementById("modul-sd-card").style.color = modulColor(modulSdCard);

          try {
            var modulServer = this.responseXML.getElementsByTagName('modulServer')[0].childNodes[0].nodeValue;
          } catch (err) {
              modulServer = "-1";
            }
          document.getElementById("modul-server").innerHTML = "SRV";
          document.getElementById("modul-server").style.background = modulBackground(modulServer);
          document.getElementById("modul-server").style.color = modulColor(modulServer);

          try {
            var modulMajor = this.responseXML.getElementsByTagName('modulMajor')[0].childNodes[0].nodeValue;
          } catch (err) {
              modulMajor = "-1";
            }
          document.getElementById("modul-major").innerHTML = "MAJ";
          document.getElementById("modul-major").style.background = modulBackground(modulMajor);
          document.getElementById("modul-major").style.color = modulColor(modulMajor);

          try {
          var modulLaurent = this.responseXML.getElementsByTagName('modulLaurent')[0].childNodes[0].nodeValue;
          } catch (err) {
              modulLaurent = "-1";
            }
          document.getElementById("modul-laurent").innerHTML = "LRT";
          document.getElementById("modul-laurent").style.background = modulBackground(modulLaurent);
          document.getElementById("modul-laurent").style.color = modulColor(modulLaurent);

          try {
            var modulUpload = this.responseXML.getElementsByTagName('modulUpload')[0].childNodes[0].nodeValue;
          } catch (err) {
              modulUpload = "-1";
            }
          document.getElementById("modul-upload").innerHTML = "UPL";
          document.getElementById("modul-upload").style.background = modulBackground(modulUpload);
          document.getElementById("modul-upload").style.color = modulColor(modulUpload);

          try {
            var modulPirs = this.responseXML.getElementsByTagName('modulPirs')[0].childNodes[0].nodeValue;
          } catch (err) {
              modulPirs = "-1";
            }
          document.getElementById("modul-pirs").innerHTML = "PIR";
          document.getElementById("modul-pirs").style.background = modulBackground(modulPirs);
          document.getElementById("modul-pirs").style.color = modulColor(modulPirs);

          try {
            var modulContacts = this.responseXML.getElementsByTagName('modulContacts')[0].childNodes[0].nodeValue;
          } catch (err) {
              modulContacts = "-1";
            }
          document.getElementById("modul-contacts").innerHTML = "CNT";
          document.getElementById("modul-contacts").style.background = modulBackground(modulContacts);
          document.getElementById("modul-contacts").style.color = modulColor(modulContacts);

          try {
            var modulTemp = this.responseXML.getElementsByTagName('modulTemp')[0].childNodes[0].nodeValue;
          } catch (err) {
              modulTemp = "-1";
            }
          document.getElementById("modul-temp").innerHTML = "TMP";
          document.getElementById("modul-temp").style.background = modulBackground(modulTemp);
          document.getElementById("modul-temp").style.color = modulColor(modulTemp);

          try {
            var modulElectro = this.responseXML.getElementsByTagName('dashModulElectro')[0].childNodes[0].nodeValue;
          } catch (err) {
              modulElectro = "-1";
            }
          document.getElementById("dash-modul-electro").innerHTML = "ELC";
          document.getElementById("dash-modul-electro").style.background = modulBackground(modulElectro);
          document.getElementById("dash-modul-electro").style.color = modulColor(modulElectro);

          try {
            var modulLeds = this.responseXML.getElementsByTagName('modulLeds')[0].childNodes[0].nodeValue;
          } catch (err) {
              modulLeds = "-1";
            }
          document.getElementById("modul-leds").innerHTML = "LED";
          document.getElementById("modul-leds").style.background = modulBackground(modulLeds);
          document.getElementById("modul-leds").style.color = modulColor(modulLeds);

          try {
            var modulKeys = this.responseXML.getElementsByTagName('modulKeys')[0].childNodes[0].nodeValue;
          } catch (err) {
              modulKeys = "-1";
            }
          document.getElementById("modul-keys").innerHTML = "KEY";
          document.getElementById("modul-keys").style.background = modulBackground(modulKeys);
          document.getElementById("modul-keys").style.color = modulColor(modulKeys);

          try {
            var modulPing = this.responseXML.getElementsByTagName('modulPing')[0].childNodes[0].nodeValue;
          } catch (err) {
              modulPing = "-1";
            }
          document.getElementById("modul-ping").innerHTML = "PNG";
          document.getElementById("modul-ping").style.background = modulBackground(modulKeys);
          document.getElementById("modul-ping").style.color = modulColor(modulKeys);          
          
          // Contacts
          try {
            var dcont1 = this.responseXML.getElementsByTagName('cont1')[0].childNodes[0].nodeValue;
          } catch (err) {
              dcont1 = "-1";
            }
          document.getElementById("dash-cont1").innerHTML = "HOM";
          document.getElementById("dash-cont1").style.background = contactBackground(dcont1);
          document.getElementById("dash-cont1").style.color = contactColor(dcont1);

          try {
            var dcont2 = this.responseXML.getElementsByTagName('cont2')[0].childNodes[0].nodeValue;
          } catch (err) {
              dcont2 = "-1";
            }
          document.getElementById("dash-cont2").innerHTML = "CLO";
          document.getElementById("dash-cont2").style.background = contactBackground(dcont2);
          document.getElementById("dash-cont2").style.color = contactColor(dcont2);

          // PIR's
          try {
            var dpir1 = this.responseXML.getElementsByTagName('pir1')[0].childNodes[0].nodeValue;
          } catch (err) {
              dpir1 = "-1";
              //alert('Error' + err.name + ":" + err.message + "\n" + err.stack);
            }
          document.getElementById("dash-pir1").innerHTML = "STD";
          document.getElementById("dash-pir1").style.background = pirBackground(dpir1);
          document.getElementById("dash-pir1").style.color = pirColor(dpir1);

          try {
            var dpir2 = this.responseXML.getElementsByTagName('pir2')[0].childNodes[0].nodeValue;
          } catch (err) {
              dpir2 = "-1";
            }
          document.getElementById("dash-pir2").innerHTML = "HAL";
          document.getElementById("dash-pir2").style.background = pirBackground(dpir2);
          document.getElementById("dash-pir2").style.color = pirColor(dpir2);

          try {
            var dpir3 = this.responseXML.getElementsByTagName('pir3')[0].childNodes[0].nodeValue;
          } catch (err) {
              dpir3 = "-1";
            }
          dpir3 = "-1"; // block
          document.getElementById("dash-pir3").innerHTML = "KID";
          document.getElementById("dash-pir3").style.background = pirBackground(dpir3);
          document.getElementById("dash-pir3").style.color = pirColor(dpir3);

          try {
            var dpir4 = this.responseXML.getElementsByTagName('pir4')[0].childNodes[0].nodeValue;
          } catch (err) {
              dpir4 = "-1";
            }
          document.getElementById("dash-pir4").innerHTML = "KUH";
          document.getElementById("dash-pir4").style.background = pirBackground(dpir4);
          document.getElementById("dash-pir4").style.color = pirColor(dpir4);

          try {
            var dpir5 = this.responseXML.getElementsByTagName('pir5')[0].childNodes[0].nodeValue;
          } catch (err) {
              dpir5 = "-1";
            }
          document.getElementById("dash-pir5").innerHTML = "PRH";
          document.getElementById("dash-pir5").style.background = pirBackground(dpir5);
          document.getElementById("dash-pir5").style.color = pirColor(dpir5);

          try {
            var dpir6 = this.responseXML.getElementsByTagName('pir6')[0].childNodes[0].nodeValue;
          } catch (err) {
              dpir6 = "-1";
            }
          document.getElementById("dash-pir6").innerHTML = "CLO";
          document.getElementById("dash-pir6").style.background = pirBackground(dpir6);
          document.getElementById("dash-pir6").style.color = pirColor(dpir6);

          // Lifer
          var MAX_LIFER = 7;
          var liferStr = '';
          var lifer = this.responseXML.getElementsByTagName('lifer')[0].childNodes[0].nodeValue;
          var liferFloat = parseInt(lifer);
          
          for (var i = 0; i < MAX_LIFER; i++) {
            var ch = '·';
            if (i == liferFloat) {ch = '•';}
            liferStr += ch;
          }
          document.getElementById("lifer").innerHTML = liferStr;          
          
          // Time & date
          var time = this.responseXML.getElementsByTagName('time')[0].childNodes[0].nodeValue;
          document.getElementById("time").innerHTML = time;
          document.getElementById("time-hide").innerHTML = time;
          
          var day = this.responseXML.getElementsByTagName('day')[0].childNodes[0].nodeValue;
          document.getElementById("day").innerHTML = day;
          document.getElementById("day-hide").innerHTML = day;

          var mon = this.responseXML.getElementsByTagName('month')[0].childNodes[0].nodeValue;
          monthStr = month(mon);
          document.getElementById("month").innerHTML = monthStr;
          document.getElementById("month-hide").innerHTML = monthStr;

          var wday = this.responseXML.getElementsByTagName('weekday')[0].childNodes[0].nodeValue;
          weekdayStr = weekday(wday);
          document.getElementById("week-day").innerHTML = weekdayStr;
          document.getElementById("week-day-hide").innerHTML = weekdayStr;

          // Voltage & power
          try {
            var dvolt = this.responseXML.getElementsByTagName('voltage')[0].childNodes[0].nodeValue;
          } catch (err) {
              dvolt = "0";
            }
          var dvoltage = Math.round(parseInt(dvolt), 0);
          document.getElementById("dash-voltage").innerHTML = dvoltage;
          document.getElementById("dash-voltage-hide").innerHTML = dvoltage;

          try {
            var pwr = this.responseXML.getElementsByTagName('power')[0].childNodes[0].nodeValue;
          } catch (err) {
              pwr = "0";
            }
          var power = Math.round(parseInt(pwr), 0);
          document.getElementById("dash-power").innerHTML = power;
          document.getElementById("dash-power-hide").innerHTML = power;

          // Uptime
          document.getElementById("dash-uptime").innerHTML = this.responseXML.getElementsByTagName('uptime')[0].childNodes[0].nodeValue;

          // free RAM
          document.getElementById("dash-free-ram").innerHTML = this.responseXML.getElementsByTagName('freeRAM')[0].childNodes[0].nodeValue;
          
          // Cyclos / CPU load
          var cyclosDelay = this.responseXML.getElementsByTagName('cycDelay')[0].childNodes[0].nodeValue;
          var cyclosInSec = this.responseXML.getElementsByTagName('cycInSec')[0].childNodes[0].nodeValue;
          load('cpu-load',  1, cyclosDelay, '', bufferCpuLoad1, '', 'cpu', 'rgba(100, 160, 230, 1)', 'yellow', 'cyan');
          load('cpu-load2', 2, cyclosDelay, cyclosInSec, bufferCpuLoad2, bufferCpuLoad3, 'cpu', 'rgba(100, 160, 230, 1)', 'yellow', 'cyan');
          load('cpu-load3', 3, cyclosDelay, '', bufferCpuLoad4, '', 'cpu', 'rgba(100, 160, 230, 1)', 'cyan', 'lightblue');
          load('cpu-load4', 4, cyclosDelay, cyclosInSec, bufferCpuLoad5, bufferCpuLoad6, 'cpu', 'rgba(100, 160, 230, 1)', 'yellow', 'cyan');

          // Online net devices
          
          for (var i = 0; i < TOTAL_NET_DEVICES; i++) {
            var j = i + 1;
            var tagOnline = "dash-online" + j;
            if (modulPing == 0 || modulPing == 1) {
              try {
                var dOnline = this.responseXML.getElementsByTagName(netDevicesNames[i])[0].childNodes[0].nodeValue;
              } catch (err) {
                  dOnline = "-1";
                }
              document.getElementById(tagOnline).innerHTML = netDevicesNames[i];
              document.getElementById(tagOnline).style.background = onlineBackground(dOnline);
              document.getElementById(tagOnline).style.color = onlineColor(dOnline); 
            } else {
                document.getElementById(tagOnline).style.display = "none";
              }
          } // for (var i = 0; i < TOTAL_NET_DEVICES; i++)
          
          

        } //if (this.responseXML != null)
      } // if (this.status == 200)
    } // if (this.readyState == 4)
  } // request.onreadystatechange = function()

  dash_marker1 = parseFloat("0.0");

  // send HTTP GET request with LEDs to switch on/off if any
  request.open("GET", "request_dash" + randomNoCache(), true);
  request.send(null);
  setTimeout('getDashData()', 1000);
  dash_marker3 = parseFloat("0.0");
  
} // getDashData
