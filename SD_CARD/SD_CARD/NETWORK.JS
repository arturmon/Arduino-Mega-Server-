/* ----------------------------------------901234567890123412345678901234567890123456789012345678901234567890123456789012345678901234567890
12345678901234567890123456789012345678901234567890123456789012345678901234567890
12345678901234567890123456789012345678901234567890123456789012345678901234567890
12345678901234567890123456789012345678901234567890123456789012345678901234567890
12345678901234567890123456789012345678901234567890123456789012345678901234567890
12345678901234567890123456789012345678901234567890123456789012345678901234567890
12345678901234567890123456789012345678901234567890123456789012345678901234567890
   

  network.js v.0.12
  part of Arduino Mega Server project
  Networks functions
-------------------------------------------- */

function getNetSettings() {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        if (this.responseXML != null) {
          // IP
          document.form2.ip1.value = this.responseXML.getElementsByTagName('ip1')[0].childNodes[0].nodeValue;
          document.form2.ip2.value = this.responseXML.getElementsByTagName('ip2')[0].childNodes[0].nodeValue;
          document.form2.ip3.value = this.responseXML.getElementsByTagName('ip3')[0].childNodes[0].nodeValue;
          document.form2.ip4.value = this.responseXML.getElementsByTagName('ip4')[0].childNodes[0].nodeValue;
          // MAC
          document.form2.mac1.value = this.responseXML.getElementsByTagName('mac1')[0].childNodes[0].nodeValue;
          document.form2.mac2.value = this.responseXML.getElementsByTagName('mac2')[0].childNodes[0].nodeValue;
          document.form2.mac3.value = this.responseXML.getElementsByTagName('mac3')[0].childNodes[0].nodeValue;
          document.form2.mac4.value = this.responseXML.getElementsByTagName('mac4')[0].childNodes[0].nodeValue;
          document.form2.mac5.value = this.responseXML.getElementsByTagName('mac5')[0].childNodes[0].nodeValue;
          document.form2.mac6.value = this.responseXML.getElementsByTagName('mac6')[0].childNodes[0].nodeValue;

          // Online net devices
          for (var i = 0; i < TOTAL_NET_DEVICES; i++) {
            try {
              var online = this.responseXML.getElementsByTagName(netDevicesNames[i])[0].childNodes[0].nodeValue;
            } catch (err) {
                online = "-1";
              }
            var j = i + 1;
            var tOnline = "online" + j;
            if (online == "1") {
              document.getElementById(tOnline).innerHTML = '<img src="//192.168.2.8/lan/mega/img/ok.png" alt="">';
            } else {
                document.getElementById(tOnline).innerHTML = '-';
              }
          } // for (var i = 0; i < TOTAL_NET_DEVICES; i++)

        } // if (this.responseXML != null)
      } // if (this.status == 200)
    } // if (this.readyState == 4)
  } // request.onreadystatechange

  // send HTTP GET request
  request.open("GET", "request_network" + randomNoCache(), true);
  request.send(null);
  setTimeout('getNetSettings()', 10000);
} // getNetSettings()

function GetMyCheck() {
  alert("Это только альфа...");
  //alert(form2.ip1.value);
}

/* end */