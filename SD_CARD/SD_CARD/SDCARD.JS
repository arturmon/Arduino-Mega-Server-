/* -----------------------------------------   

  sdcard.js v.0.12
  part of Arduino Mega Server project
  SD card functions
-------------------------------------------- */

/* -----------------------------------------
  Function getSdSettings()
    get SD card settings
-------------------------------------------- */

function getSdSettings() {
  var request = new XMLHttpRequest();

 request.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        if (this.responseXML != null) {

          // type SD
          try {
            var SDcardTypeCode = this.responseXML.getElementsByTagName('SDcardType')[0].childNodes[0].nodeValue;
          } catch (err) {
              SDcardTypeCode = "-1";
            }
          var SDcardType = "Unknown";
          switch (SDcardTypeCode) {
            case "1": SDcardType = "SD1"; break;
            case "2": SDcardType = "SD2"; break;
            case "3": SDcardType = "SDHC";break;
          }
          document.getElementById("sd-card-type").innerHTML = SDcardType;

          // file system
         try {
            var SDcardFileSystemCode = this.responseXML.getElementsByTagName('SDcardFileSystem')[0].childNodes[0].nodeValue;
          } catch (err) {
              SDcardFileSystemCode = "-1";
            }

          var SDcardFileSystem = "Unknown";
          switch (SDcardFileSystemCode) {
            case "16": SDcardFileSystem = "FAT16"; break;
            case "32": SDcardFileSystem = "FAT32"; break;
          }
          document.getElementById("sd-card-file-system").innerHTML = SDcardFileSystem;

          // size
          try {
            var SDcardsdVolumeSize = this.responseXML.getElementsByTagName('SDvolumeSize')[0].childNodes[0].nodeValue;
          } catch (err) {
              SDcardsdVolumeSize = "0";
            }
          document.getElementById("sd-volume-size").innerHTML = SDcardsdVolumeSize;

          // files
          try {
            var SDcardsdRootDir = this.responseXML.getElementsByTagName('SDrootDir')[0].childNodes[0].nodeValue;
          } catch (err) {
              SDcardsdRootDir = ".../...";
            }
          var templ = / /g;
          var resStr = SDcardsdRootDir.replace(templ, '<br>');
          document.getElementById("sd-root-dir").innerHTML = resStr;
          document.getElementById("cont2").innerHTML = cont2status;

        } //if (this.responseXML != null)
      } // if (this.status == 200)
    } // if (this.readyState == 4)
  } // request.onreadystatechange

  // send HTTP GET request with LEDs to switch on/off if any
  request.open("GET", "request_sdcard" + randomNoCache(), true);
  request.send(null);

  setTimeout('getSdSettings()', 10000);
} // getSdSettings()

/* end */