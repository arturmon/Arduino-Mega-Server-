/* -----------------------------------------   

  ports.js v.0.12
  part of Arduino Mega Server project
  Ports functions
-------------------------------------------- */

var showAjaxInfo = false;

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

/* end */