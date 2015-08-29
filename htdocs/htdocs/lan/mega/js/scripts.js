/* -----------------------------------------
  scripts.js v.0.1
  part of Arduino Mega Server project
  JavaScript functions
-------------------------------------------- */

// Date & time

function month(mon) {
  switch (mon) {
    case "1": return "января"; break;
    case "2": return "февраля"; break;
    case "3": return "марта"; break;
    case "4": return "апреля"; break;
    case "5": return "мая"; break;
    case "6": return "июня"; break;
    case "7": return "июля"; break;
    case "8": return "августа"; break;
    case "9": return "сентября"; break;
    case "10": return "октября"; break;
    case "11": return "ноября"; break;
    case "12": return "декабря"; break;
    default: return ""; break;
  }
}

function weekday(day) {
  switch (day) {
    case "1": return "Воскресенье"; break;
    case "2": return "Понедельник"; break;
    case "3": return "Вторник"; break;
    case "4": return "Среда"; break;
    case "5": return "Четверг"; break;
    case "6": return "Пятница"; break;
    case "7": return "Суббота"; break;
     default: return ""; break;
  }
}

// Network

function randomNoCache() {
  var random = Math.round(Math.random() * 10000);
  if (random < 10) {random *= 1000;}
  if (random < 100) {random *= 100;}
  if (random < 1000) {random *= 10;}
  return "&nocache=" + random;
}

// Data colors

var modulDisable = "#555555";
var modulPassive = "#887711";
var modulActive = "#1188dd";

function modulBackground(state) {
  switch (state) {
    case "0": return modulPassive; break;
    case "1": return modulActive; break;
     default: return modulDisable; break;
  }
}

function modulColor(state) {
  switch (state) {
    case "0": return "#eeeeee"; break;
    case "1": return "#ffffff"; break;
     default: return "#aaaaaa"; break;
  }
}

function contactBackground(state) {
  switch (state) {
    case "0": return "#09A95E"; break;
    case "1": return "red"; break;
     default: return "#555555"; break;
  }
}

function contactColor(state) {
  switch (state) {
    case "0": return "#eeeeee"; break;
    case "1": return "#ffffff"; break;
     default: return "#aaaaaa"; break;
  }
}

function modeBackground(state) {
  switch (state) {
    case "1": return "#91A46B"; break;
    case "2": return "#AB5DB1"; break;
     default: return "#555555"; break;
  }
}

function modeColor(state) {
  switch (state) {
    case "1": return "#ffffff"; break;
    case "2": return "#ffffff"; break;
     default: return "#aaaaaa"; break;
  }
}

function pirBackground(state) {
  switch (state) {
    case "0": return "#09999E"; break;
    case "1": return "#eedd22"; break;
     default: return "#555555"; break;
  }
}

function pirColor(state) {
  switch (state) {
    case "0": return "#ffffff"; break;
    case "1": return "#555555"; break;
     default: return "#aaaaaa"; break;
  }
}

function stateOnOff(state) {
  switch (state) {
    case "0": return "OFF"; break;
    case "1": return "ON"; break;
     default: return "-"; break;
  }
}

function stateOnOffBackground(state) {
  switch (state) {
    case "0": return "#555555"; break;
    case "1": return "#FAF39B"; break;
     default: return "#555555"; break;
  }
}

function stateOnOffColor(state) {
  switch (state) {
    case "0": return "#ffffff"; break;
    case "1": return "#000000"; break;
     default: return "#aaaaaa"; break;
  }
}

function onlineBackground(state) {
  switch (state) {
    case "0": return "#555555"; break;
    case "1": return "#3EAF3B"; break;
     default: return "#555555"; break;
  }
}

function onlineColor(state) {
  switch (state) {
    case "0": return "#aaaaaa"; break;
    case "1": return "#ffffff"; break;
     default: return "#aaaaaa"; break;
  }
}

/* -----------------------------------------
  Canvas graphics
-------------------------------------------- */

function maxInArray(buffer, maxBuff) {
  max = 0;
  for (var i = 0; i < maxBuff; i++) {
    if (buffer[i] > max) {
      max = buffer[i];
    }
  }
  return max;
}

function minInArray(buffer, maxBuff) {
  min = 1000000;
  for (var i = 0; i < maxBuff; i++) {
    if (buffer[i] < min) {
      min = buffer[i];
    }
  }
  return min;
}

function drawLine(x1, y1, x2, y2, width, color) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.moveTo(x2, y2);
  context.closePath();
  context.lineWidth = width;
  context.strokeStyle = color;
  context.stroke();
}

function drawXline(x1, x2, y, width, color) {
  context.beginPath();
  context.moveTo(x1, y);
  context.lineTo(x2, y);
  context.moveTo(x2, y);
  context.closePath();
  context.lineWidth = width;
  context.strokeStyle = color;
  context.stroke();
}

function drawYline(x, y1, y2, width, color) {
  context.beginPath();
  context.moveTo(x, y1);
  context.lineTo(x, y2);
  context.moveTo(x, y2);
  context.closePath();
  context.lineWidth = width;
  context.strokeStyle = color;
  context.stroke();
}

function drawXmarker(x, y1, y2, width, lineColor, marker, markerColor) {
  context.beginPath();
  context.moveTo(x, y1);
  context.lineTo(x, y2);
  context.moveTo(x, y2);
  context.closePath();
  context.lineWidth = width;
  context.strokeStyle = lineColor;
  context.stroke();
  context.fillStyle = markerColor;
  context.fillText(marker, x, y2 + 11, 50);
}

/* ------------------------------
  Function label()
    Draw label
--------------------------------- */

function label(value, place, measure, title, background) {
  title_font = '11px Tahoma';
  value_font = '18px Tahoma';
  color = 'white';

  elem = document.getElementById(place);
  context = elem.getContext('2d');

  context.fillStyle = background;
  context.fillRect(0, 0, elem.width, elem.height);

  context.fillStyle = color;
  context.fillRect(6, 33, 47, 1);

  context.textAlign = "center";

  context.font = value_font;
  context.fillText(value + measure, 30, 24, 55);

  context.font = title_font;
  context.fillText(title, 30, 49, 55);
} // label

/* ------------------------------
  Function labelAnalog()
    Draw label Analog
--------------------------------- */

function labelAnalog(value, place, measure, title, background) {
  title_font = '11px Tahoma';
  value_font = '18px Tahoma';
  color = 'white';

  elem = document.getElementById(place);
  context = elem.getContext('2d');

  va = parseInt(value);
  bg = 'rgba(220, 100, 100, 1)';

  if (va >=   0 && va < 100) {bg = 'rgba(120, 110, 0, 1)';}
  if (va >= 100 && va < 200) {bg = 'rgba(130, 100, 0, 1)';}
  if (va >= 200 && va < 300) {bg = 'rgba(140,  90, 0, 1)';}
  if (va >= 300 && va < 400) {bg = 'rgba(150,  80, 0, 1)';}
  if (va >= 400 && va < 500) {bg = 'rgba(160,  70, 0, 1)';}
  if (va >= 500 && va < 600) {bg = 'rgba(170,  60, 0, 1)';}
  if (va >= 600 && va < 700) {bg = 'rgba(180,  50, 0, 1)';}
  if (va >= 700 && va < 800) {bg = 'rgba(190,  40, 0, 1)';}
  if (va >= 800 && va < 900) {bg = 'rgba(200,  30, 0, 1)';}
  if (va >= 900 && va <1000) {bg = 'rgba(210,  20, 0, 1)';}
  if (va >=1000 && va <1024) {bg = 'rgba(220,  10, 0, 1)';}

  context.fillStyle = bg;
  context.fillRect(0, 0, elem.width, elem.height);

  context.fillStyle = color;
  context.fillRect(6, 33, 47, 1);

  context.textAlign = "center";

  context.font = value_font;
  context.fillText(value + measure, 30, 24, 55);

  context.font = title_font;
  context.fillText(title, 30, 49, 55);
} // labelAnalog

function addTick(value, buffer, maxBuff, min) {
  for (var i = maxBuff - 1; i > 0; i--) {
    buffer[i] = buffer[i - 1];
  }
  buffer[0] = value;
  if (buffer[0] < min) {buffer[0] = min;}
}

/* ------------------------------
  Function load()
    Draw load CPU graph
--------------------------------- */

function load(place, type, value1, value2, buffer1, buffer2, title, color, color1, color2) {
  var background = 'rgba(0, 0, 0, 1)';
  var title_font = '11px Tahoma';
  var value_font = '18px Tahoma';

  var step = 5;
  var shiftX = 33;
  var shiftY = 29;
  var kY = 5;

  // buffers works
  addTick(value1, buffer1, MAX_CPU_LOAD_BUFFER, kY);
  if (type == 2 || type == 4) {
    addTick(value2, buffer2, MAX_CPU_LOAD_BUFFER, kY);
  }

  // Context works
  element = document.getElementById(place);
  context = element.getContext('2d');

  context.fillStyle = background;
  context.fillRect(0, 0, element.width, element.height);

  // Graphics works
  for (var i = 0 ; i < MAX_CPU_LOAD_BUFFER; i++) {

    var i_protect = i;
    if (i >= MAX_CPU_LOAD_BUFFER - 1) {
      i_protect = i - 1;
    }

    switch (type) {
      case 2: // two bar graphics
        context.fillStyle = color1;
        context.fillRect(MAX_CPU_LOAD_BUFFER*step - i*step + shiftX,     shiftY, 2, -buffer1[i]/kY);
        context.fillStyle = color2;
        context.fillRect(MAX_CPU_LOAD_BUFFER*step - i*step + shiftX + 2, shiftY, 2, -buffer2[i]/kY);
        break;
      case 3: // one line graphics (two level graphics)
        /*
        context.fillStyle = color1;
        context.fillRect(MAX_CPU_LOAD_BUFFER*step - i*step + shiftX, shiftY - buffer1[i]/kY, 4, 2);
        context.fillStyle = color2;
        context.fillRect(MAX_CPU_LOAD_BUFFER*step - i*step + shiftX, shiftY - buffer2[i]/kY, 4, 2);
        */
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(MAX_CPU_LOAD_BUFFER*step -             i*step + shiftX, shiftY - buffer1[i]/kY);
        context.lineTo(MAX_CPU_LOAD_BUFFER*step - (i_protect+1)*step + shiftX, shiftY - buffer1[i_protect+1]/kY);
        context.closePath();
        context.strokeStyle = color1;
        context.stroke();
        break;
      case 4: // two line graphics
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(MAX_CPU_LOAD_BUFFER*step -             i*step + shiftX, shiftY - buffer1[i]/kY);
        context.lineTo(MAX_CPU_LOAD_BUFFER*step - (i_protect+1)*step + shiftX, shiftY - buffer1[i_protect+1]/kY);
        context.closePath();
        context.strokeStyle = color1;
        context.stroke();

        context.beginPath();
        context.moveTo(MAX_CPU_LOAD_BUFFER*step -             i*step + shiftX, shiftY - buffer2[i]/kY);
        context.lineTo(MAX_CPU_LOAD_BUFFER*step - (i_protect+1)*step + shiftX, shiftY - buffer2[i_protect+1]/kY);
        context.closePath();
        context.strokeStyle = color2;
        context.stroke();
        break;
      default: // one (value1) bar graphics
        context.fillStyle = color;
        context.fillRect(MAX_CPU_LOAD_BUFFER*step - i*step + shiftX, shiftY, 4, -buffer1[i]/kY);
        break;
    } // switch (type)
  } // for (var i = 0 ; i < MAX_CPU_LOAD_BUFFER; i++)

  // Text works
  context.fillStyle = color;
  context.textAlign = "right";

  context.font = value_font;
  context.fillText(value1, 32, 17, 55);

  context.font = title_font;
  context.fillText(title, 32, 29, 55);
} // load

/* ------------------------------
  Function graph()
    Draw standard graph
--------------------------------- */

function graph(place, type, value1, value2, buffer1, buffer2, width, color, color1, color2) {
  var background = 'rgba(255, 255, 255, 1)';
  var colorGrid = 'rgba(170, 170, 170, 1)';
  var colorValue = 'rgba(255, 255, 255, 1)';

  var grid_font = '13px Tahoma';
  var value_font = '15px Tahoma';

  var step = 1;
  var shiftX = 50;
  var shiftY = 165;
  var kY = 0.7;

  // Context works
  element = document.getElementById(place);
  context = element.getContext('2d');

  // k & protect
  var maxBuff = maxInArray(buffer1, MAX_GRAPH_BUFFER);
  var kVal = maxBuff / 100;
  if (maxBuff == 0) {
    kY = 0;
    maxBuff_protect = 1;
  } else {
      maxBuff_protect = maxBuff;
    }

  var kY_protect = kY;
  if (kY == 0) {
    kY_protect = 0.7;
  }

  // buffers works
  addTick(value1, buffer1, MAX_GRAPH_BUFFER, kY);
  if (type == 2 || type == 4) {
    addTick(value2, buffer2, MAX_GRAPH_BUFFER, kY);
  }

  // Clear background
  context.fillStyle = background;
  context.fillRect(0, 0, element.width, element.height);

  // Draw axis
  drawXline(shiftX, shiftX + MAX_GRAPH_BUFFER * step, shiftY, 1, colorGrid); // x axis
  drawYline(shiftX, shiftY, shiftY - 100 / kY_protect, 1, colorGrid); // y axis

  // X axis pins
  drawLine(shiftX, shiftY, shiftX, shiftY + 5, 1, colorGrid); // zero
  var x = MAX_GRAPH_BUFFER * step + shiftX;
  drawLine(x, shiftY, x, shiftY + 5, 1, colorGrid); // right

  // Y axis pins
  drawLine(shiftX, shiftY, shiftX - 5, shiftY, 1, colorGrid); // zero
  var y = shiftY - 100 / kY_protect;
  drawLine(shiftX, y, shiftX - 5, y, 1, colorGrid); // top

  // Y axis markers
  context.font = grid_font;
  context.fillStyle = color;
  context.textAlign = "right";
  context.fillText(maxBuff_protect, 44, 30, 55);
  context.fillText("0", 44, shiftY, 55);

  // Graphics works
  for (var i = 0 ; i < MAX_GRAPH_BUFFER; i++) {

    var i_protect = i;
    if (i >= MAX_GRAPH_BUFFER - 1) {
      i_protect = i - 1;
    }

    // x axis markers
    if (i == 60) {
      var x = MAX_GRAPH_BUFFER*step - i * step + shiftX;
      drawXmarker(x, shiftY, shiftY + 5, 1, colorGrid, "1м", color);
    }
    if (i == 120) {
      var x = MAX_GRAPH_BUFFER*step - i * step + shiftX;
      drawXmarker(x, shiftY, shiftY + 5, 1, colorGrid, "2м", color);
    }

    switch (type) {
      case 2:

        break;
      case 3:
        // graph
        context.lineWidth = width;
        context.beginPath();
        context.moveTo(MAX_GRAPH_BUFFER*step -             i*step + shiftX, shiftY - (buffer1[i]/kVal)/kY);
        context.lineTo(MAX_GRAPH_BUFFER*step - (i_protect+1)*step + shiftX, shiftY - (buffer1[i_protect+1]/kVal)/kY);
        context.closePath();
        context.strokeStyle = color1;
        context.stroke();
        break;
      case 4:

        break;
      default:

        break;
    } // switch (type)
  } // i < MAX_GRAPH_BUFFER

  // Value
  context.arc(127, shiftY / 2 + 5, 21, 0, Math.PI * 2);
  context.fill();
  context.font = value_font;
  context.textAlign = "center";
  context.fillStyle = colorValue;
  context.fillText(value1, 127, shiftY / 2 + 10, 55);
} // graph

/* -----------------------
  Function line()
    Draw simple line graph
-------------------------- */

function line(place, value, buffer, color) {
  var step = 1;
  var shiftX = 20;
  var shiftY = 165;
  var kY = 1;

  // Y limit
  var maxBuff = maxInArray(buffer, MAX_GRAPH_BUFFER);
  var kVal = maxBuff / 100;
  if (maxBuff == 0) {
    kY = 0;
  }

  // Buffer works
  addTick(value, buffer, MAX_GRAPH_BUFFER, kY);

  // Context works
  element = document.getElementById(place);
  context = element.getContext('2d');
  context.clearRect(0, 0, element.width, element.height);

  // Graphics works
  for (var i = 0 ; i < MAX_GRAPH_BUFFER; i++) {
    var i_protect = i;
    if (i >= MAX_GRAPH_BUFFER - 1) {
      i_protect = i - 1;
    }
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(MAX_GRAPH_BUFFER*step -             i*step + shiftX, shiftY - (buffer[i]/kVal)/kY);
    context.lineTo(MAX_GRAPH_BUFFER*step - (i_protect+1)*step + shiftX, shiftY - (buffer[i_protect+1]/kVal)/kY);
    context.closePath();
    context.strokeStyle = color;
    context.stroke();
  } // i < MAX_GRAPH_BUFFER
} // line

/* ------------------------------
  Function form()
    Draw form of signal
--------------------------------- */

function form(place, type, value1, value2, buffer1, buffer2, width, color, color1, color2, background) {
  var colorGrid = 'rgba(170, 170, 170, 1)';
  var colorValue = 'rgba(255, 255, 255, 1)';

  var title_font = '14px Tahoma';
  var grid_font = '13px Tahoma';
  var value_font = '15px Tahoma';

  var step = 3;
  var shiftX = 50;
  var shiftY = 165;
  var kY = 0.7;
  var kY2 = 0.7;

  // Context works
  element = document.getElementById(place);
  context = element.getContext('2d');

  // Array 1 works
  var minBuff1 = minInArray(buffer1, MAX_FORM_BUFFER);
  for (var i = 0; i < MAX_FORM_BUFFER; i++) {
    buffer1[i] -= minBuff1 - 1;
  }

  var maxBuff = maxInArray(buffer1, MAX_FORM_BUFFER);
  var kVal = maxBuff / 100;
  if (maxBuff == 0) {
    kY = 0;
    maxBuff_protect = 1;
  } else {
      maxBuff_protect = maxBuff;
    }

  var kY_protect = kY;
  if (kY == 0) {
    kY_protect = 0.7;
  }

  // Array 2 works
  var minBuff2 = minInArray(buffer2, MAX_FORM_BUFFER);
  for (var i = 0; i < MAX_FORM_BUFFER; i++) {
    buffer2[i] -= minBuff2 - 1;
  }

  var maxBuff2 = maxInArray(buffer2, MAX_FORM_BUFFER);
  var kVal2 = maxBuff2 / 100;
  if (maxBuff2 == 0) {
    kY2 = 0;
    maxBuff_protect2 = 1;
  } else {
      maxBuff_protect2 = maxBuff2;
    }

  var kY_protect2 = kY2;
  if (kY2 == 0) {
    kY_protect2 = 0.7;
  }

  // Clear background
  context.fillStyle = background;
  context.fillRect(0, 0, element.width, element.height);

  // Draw axis
  drawXline(shiftX, shiftX + MAX_FORM_BUFFER * step, shiftY - 50/kY_protect, 1, colorGrid); // x axis
  drawYline(shiftX, shiftY, shiftY - 100 / kY_protect, 1, colorGrid); // y axis

  // Y axis pins
  drawLine(shiftX, shiftY, shiftX - 5, shiftY, 1, colorGrid); // zero
  var y = shiftY - 100 / kY_protect;
  drawLine(shiftX, y, shiftX - 5, y, 1, colorGrid); // top

  // Graphics works
  for (var i = 0 ; i < MAX_FORM_BUFFER; i++) {

    var i_protect = i;
    if (i >= MAX_FORM_BUFFER - 1) {
      i_protect = i - 1;
    }

    context.lineWidth = width;
    context.beginPath();
    context.moveTo(MAX_FORM_BUFFER*step -             i*step + shiftX, shiftY - (buffer1[i]/kVal)/kY);
    context.lineTo(MAX_FORM_BUFFER*step - (i_protect+1)*step + shiftX, shiftY - (buffer1[i_protect+1]/kVal)/kY);
    context.closePath();
    context.strokeStyle = color1;
    context.stroke();

    context.beginPath();
    context.moveTo(MAX_FORM_BUFFER*step -             i*step + shiftX, shiftY - (buffer2[i]/kVal2)/kY2);
    context.lineTo(MAX_FORM_BUFFER*step - (i_protect+1)*step + shiftX, shiftY - (buffer2[i_protect+1]/kVal2)/kY2);
    context.closePath();
    context.strokeStyle = color2;
    context.stroke();

  } // i < MAX_FORM_BUFFER

  // Text works
  context.fillStyle = color;
  context.textAlign = "right";

  // Arcs
  context.arc(30, 30, 8, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.arc(30, shiftY - 4, 8, 0, Math.PI * 2);
  context.fill();

  // Markers
  context.font = grid_font;
  context.textAlign = "center";
  context.fillStyle = colorValue;
  context.fillText("+", 30, 34, 55);
  context.fillText("-", 30, shiftY, 55);
} // form

/* ------------------------------
  Function device()
    Show status of electro device
--------------------------------- */

function device(place, type, value, title, level1, level2, level3, level4) {
  var background = 'rgba(44, 44, 44, 1)';
  var colorState = 'rgba(255, 255, 255, 1)';
  var colorLabel = 'rgba(244, 44, 44, 1)';
  var colorLabelOff = 'rgba(44, 200, 44, 1)';
  var colorValue = 'rgba(255, 255, 255, 1)';
  var colorLevel = 'rgba(255, 255, 255, 1)';
  var colorTitle = 'rgba(255, 255, 255, 1)';

  var color1 = 'rgba(125, 125, 32, 1)';
  var color2 = 'rgba(145, 125, 32, 1)';
  var color3 = 'rgba(165, 125, 32, 1)';
  var color4 = 'rgba(185, 125, 32, 1)';
  var color5 = 'rgba(205, 125, 32, 1)';

  var state_font = '22px Tahoma';
  var value_font = '15px Tahoma';
  var title_font = '18px Tahoma';

  var state = "-";
  var level = -1;

  // Context works
  element = document.getElementById(place);
  context = element.getContext('2d');

  // Draw background
  if (value > 0 && value < 60) {
    background = 'rgba(143, 19, 0, 1)';
    state = "STANDBY";
  }
  else if (value >= 60) {
    background = 'rgba(255, 125, 32, 1)';
    state = "ON";
  } else {
      state = "OFF";
    }
  context.fillStyle = background;
  context.fillRect(0, 0, element.width, element.height);

  // Text works
  context.textAlign = "center";

  // Draw state
  context.font = state_font;
  context.fillStyle = colorState;
  context.fillText(state, 105, 55, 100);

  // Draw label
  if (value != 0) {
    context.fillStyle = colorLabel;
  } else {
      context.fillStyle = colorLabelOff;
    }
  context.arc(105, 95, 21, 0, Math.PI * 2);
  context.fill();

  // Draw value
  context.font = value_font;
  context.fillStyle = colorValue;
  context.fillText(value, 105, 100, 55);

  // Draw level
  if (value >      0) {level = 0;}
  if (value > level1) {level = 1;}
  if (value > level2) {level = 2;}
  if (value > level3) {level = 3;}
  if (value > level4) {level = 4;}

  var shiftBar = 55;
  for (var i = 0; i < 5; i++) {
    context.fillStyle = colorLevel;
    if (i == 0 && level > 0){context.fillStyle = color1;}
    if (i == 1 && level > 1) {context.fillStyle = color2;}
    if (i == 2 && level > 2) {context.fillStyle = color3;}
    if (i == 3 && level > 3) {context.fillStyle = color4;}
    if (i == 4 && level > 4) {context.fillStyle = color5;}
    context.fillRect(i * 20 + shiftBar, 135, 15, 10);
  }

  // Draw title
  context.font = title_font;
  context.fillStyle = colorTitle;
  context.fillText(title, 105, 170, 140);
} // device( )

/* ------------------------------
  Graphics Logo Works

--------------------------------- */

var shiftX = 20;
var shiftY = 10;
var lenX = 136;
var lenY = 136;
var logoColor = 'rgba(120, 170, 220, 1)';
var logoColorLight = 'rgba(50, 110, 150, 1)';
var width = 1;

function drawBorder(x, y, lenX, lenY, color) {
  var cor = 2;
  drawXline(x - cor, x + lenX + cor, y - 1,        1, color);
  drawXline(x - cor, x + lenX + cor, y + lenY + 1, 1, color);
  drawYline(x - 1,        y - cor, y + lenY + cor, 1, color);
  drawYline(x + lenX + 1, y - cor, y + lenY + cor, 1, color);
}

function clearLogo(place) {
  // context works
  try {
    element = document.getElementById(place);
    context = element.getContext('2d');
  } catch (err) {
      return;
    }

  // clear background
  context.fillStyle = 'black';
  context.fillRect(0, 0, element.width, element.height);

  // draw border
  drawBorder(shiftX, shiftY, lenX, lenY, logoColor);
}

/* ------------------------------
  Ping-Pong logo [1]

--------------------------------- */

function drawPong(place, x, y, color) {
  // context works
  try {
    element = document.getElementById(place);
    context = element.getContext('2d');
  } catch (err) {
      return;
    }
  
  // clear background
  context.fillStyle = 'black';
  context.fillRect(0, 0, element.width, element.height);

  // draw Pong
  context.fillStyle = color;
  context.arc(shiftX + x, shiftY + y, 6, 0, Math.PI * 2);
  context.fill();
  context.beginPath();
  context.fill();

  // draw border
  drawBorder(shiftX, shiftY, lenX, lenY, logoColor);
} // drawPong( )

var pongDim = 6;
var pongMinX = 0 + pongDim;
var pongMinY = 0 + pongDim;
var pongMaxX = 136 - pongDim;
var pongMaxY = 136 - pongDim;
var dX = 1;
var dY = 1;
var pongX = 7;
var pongY = 25;

function logoPong() {
  var pongColor = logoColor;

  if (pongX < pongMinX || pongX > pongMaxX) {dX = -dX;}
  if (pongY < pongMinY || pongY > pongMaxY) {dY = -dY;}
  if (pongY == 100) {pongY += dY * 2;}

  pongX += dX;
  pongY += dY;

  drawPong('logo', pongX, pongY, pongColor);
}

/* ------------------------------
  Radar logo [2]

--------------------------------- */

function drawRadar(place, liferPos, width, color) {
  var halfX = lenX / 2;
  var halfY = lenY / 2;
  liferPos = 34 - liferPos;

  // context works
  try {
    element = document.getElementById(place);
    context = element.getContext('2d');
  } catch (err) {
      return;
    }
  
  // draw radar
  context.lineWidth = width;
  context.beginPath();
  context.moveTo(shiftX, shiftY + (lenY - liferPos * 4));
  context.lineTo(shiftX + halfX, shiftY + halfX);
  context.lineTo(shiftX + (lenX - liferPos * 4), shiftY + lenY);
  context.moveTo(shiftX + (lenX - liferPos * 4), shiftY + lenY);
  context.moveTo(shiftX + (lenX - liferPos * 4), shiftY);
  context.lineTo(shiftX + halfX, shiftY + halfX);
  context.lineTo(shiftX + lenX, shiftY + (lenY - liferPos * 4));
  context.moveTo(shiftX + lenX, shiftY + (lenY - liferPos * 4));
  context.closePath();
  context.strokeStyle = color;
  context.stroke();

  // draw border
  drawBorder(shiftX, shiftY, lenX, lenY, logoColorLight);
} // drawRadar( )

var liferLogo = 0;
var phase = 1;
var radarColor = logoColor;

function logoRadar() {
  liferLogo++;
  if (liferLogo > 34) {liferLogo = 0;}

  if (liferLogo == 0) {
    phase = -phase;
    if (phase == 1) {
      radarColor = logoColor;
      width = 1;
    } else {
        radarColor = 'black';
        width = 2;
      }
  }
  // draw
  drawRadar('logo', liferLogo, width, radarColor);
}

/* ------------------------------
  Random Rects logo [3]

--------------------------------- */

function drawRect(place, x, y, color) {
  var step = 12;
  var shift = 3;
  var dim = 10;

  // context works
  try {
    element = document.getElementById(place);
    context = element.getContext('2d');
  } catch (err) {
      return;
    }
  
  // draw rect
  context.fillStyle = color;
  context.fillRect(shiftX + x*step + shift, shiftY + y*step + shift, dim, dim);
  context.fill();
  context.beginPath();
  context.fill();

  // draw border
  drawBorder(shiftX, shiftY, lenX, lenY, logoColorLight);
}

function logoRandomRects() {
  var show = 'rgba(100, 120, 200, 0.7)';
  var hide ='rgba(0, 0, 0, 1)';

  // random position
  var x = Math.round(Math.random() * 10);
  var y = Math.round(Math.random() * 10);

  // random color
  var colorRnd = Math.round(Math.random() * 1000);
  if (colorRnd > 500) {
    var color = show;
  } else {
      var color = hide;
    }

  // anomal colors
  if (colorRnd == 60) {color = 'rgba(40, 218, 34, 1)';} // green
  if (colorRnd == 70) {color = 'rgba(228, 185, 34, 1)';} // yellow
  if (colorRnd == 80) {color = 'rgba(218, 50, 34, 1)';} // red

  // draw
  drawRect('logo', x, y, color);
}

/* ------------------------------
  Function logoRotator()
    Show graphics logo
--------------------------------- */

var curLogo = 0;
var maxLogo = 3;
var logo1timer;
var logo2timer;
var logo3timer;

function logoRotator() {
  // random logo
  if (curLogo == 0) { // start
    var logoRnd = Math.round(Math.random() * 10);
    curLogo = 1;
    if (logoRnd > 0 && logoRnd <= 3) {curLogo = 1;}
    if (logoRnd > 3 && logoRnd <= 6) {curLogo = 2;}
    if (logoRnd > 6 && logoRnd <= 10) {curLogo = 3;}
  } else { // cycle
      curLogo++;
    }

  if (curLogo > maxLogo) {curLogo = 1;}

  // clear timers
  clearInterval(logo1timer);
  clearInterval(logo2timer);
  clearInterval(logo3timer);

  // show current logo
  switch (curLogo) {
    case 1:
      logo1timer = setInterval('logoPong()', 20);
      break;
    case 2:
      clearLogo('logo');
      logo2timer = setInterval('logoRadar()', 80);
      break;
    case 3:
      clearLogo('logo');
      logo3timer = setInterval('logoRandomRects()', 120);
      break;
    default:
      break;
    } // switch (type)

  // change logo (period 1 minute)
  setTimeout('logoRotator()', 60000);
} // logoRotator()


/* -----------------------------------------
  dash.js v.0.11
  part of Arduino Mega Server project
  Dashboard functions
-------------------------------------------- */

var currentPage = '';

// Var's for Processing sketch
var dash_marker1 = 0; // ok XML func
var dash_marker2 = 0; // not ok XML func
var dash_marker3 = 0; // in XML func
var liferFloat = 0.0; // lifer volume
var fig = 2; // type of 3D model

// Device online
var TOTAL_NET_DEVICES = 10;
var netDevicesNames = ["SWH", "HOM", "MED", "CMP", "PRN", "MGA", "UN1", "UN2", "LRN", "APC"];

// Timeline graphics
const MAX_CPU_LOAD_BUFFER = 16;
const MAX_GRAPH_BUFFER = 150;
const MAX_FORM_BUFFER = 90;
var bufferCpuLoad1 = [];
var bufferCpuLoad2 = [];
var bufferCpuLoad3 = [];
var bufferCpuLoad4 = [];
var bufferCpuLoad5 = [];
var bufferCpuLoad6 = [];

var bufferElectro1 = [];
var bufferElectro2 = [];
var bufferElectro3 = [];
var bufferElectro4 = [];
var bufferElectro5 = [];
var bufferElectro6 = [];
var bufferElectro7 = [];
var bufferElectro8 = [];
var bufferElectro9 = [];

var bufferLogo1 = [];

var modulName = ["RTC", "ETR", "SDC", "SRV", "MAJ", "LRT", "UPL", "PIR", "CNT", "TMP", "ELC", "LED", "KEY", "PNG"];
var modulXml = ["modulRtc", "modulEthernet", "modulSdCard", "modulServer", "modulMajor", "modulLaurent", "modulUpload", "modulPirs", "modulContacts", "modulTemp", "dashModulElectro", "modulLeds", "modulKeys", "modulPing"];
var modulId = ["modul-rtc", "modul-ethernet", "modul-sd-card", "modul-server", "modul-major", "modul-laurent", "modul-upload", "modul-pirs", "modul-contacts", "modul-temp", "dash-modul-electro", "modul-leds", "modul-keys", "modul-ping"];

var contName = ["HOM", "CLO"];
var contXml = ["cont1", "cont2"];
var contId = ["dash-cont1", "dash-cont2"];

var pirName = ["STD", "HAL", "KID", "KUH", "PRH", "CLO"];
var pirXml = ["pir1", "pir2", "pir3", "pir4", "pir5", "pir6"];
var pirId = ["dash-pir1", "dash-pir2", "dash-pir3", "dash-pir4", "dash-pir5", "dash-pir6"];

var pinId = ["pin2", "pin3", "pin4", "pin5", "pin6", "pin7", "pin8", "pin9", "pin10", "pin22", "pin23", "pin24", "pin25", "pin26", "pin27", "pin30", "pin31"];

var UiId = ["volt", "p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10", "p11", "p12", "p13"];
var ui = [];

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
          for (var i = 0; i < 14; i++) {
            try {
              var modulRes = this.responseXML.getElementsByTagName(modulXml[i])[0].childNodes[0].nodeValue;
            } catch (err) {
                modulRes = "-1";
              }
            try {
              document.getElementById(modulId[i]).innerHTML = modulName[i];
              document.getElementById(modulId[i]).style.background = modulBackground(modulRes);
              document.getElementById(modulId[i]).style.color = modulColor(modulRes);
            } catch (err) { }

            if (i == 13) {var modulPing = modulRes;}
          }

          // Contacts
          for (var i = 0; i < 2; i++) {
            try {
              var dcont = this.responseXML.getElementsByTagName(contXml[i])[0].childNodes[0].nodeValue;
            } catch (err) {
                dcont = "-1";
              }
            try {
              document.getElementById(contId[i]).innerHTML = contName[i];
              document.getElementById(contId[i]).style.background = contactBackground(dcont);
              document.getElementById(contId[i]).style.color = contactColor(dcont);
            } catch (err) { }
          }

          // PIR's
          for (var i = 0; i < 6; i++) {
            try {
              var dpir = this.responseXML.getElementsByTagName(pirXml[i])[0].childNodes[0].nodeValue;
            } catch (err) {
                dpir = "-1";
                //alert('Error' + err.name + ":" + err.message + "\n" + err.stack);
              }

            if (i == 2) {dpir = "-1";}
            try {
              document.getElementById(pirId[i]).innerHTML = pirName[i];
              document.getElementById(pirId[i]).style.background = pirBackground(dpir);
              document.getElementById(pirId[i]).style.color = pirColor(dpir);
            } catch (err) { }
          }

          // Lifer
          var MAX_LIFER = 7;
          var liferStr = '';
          try {
            var lifer = this.responseXML.getElementsByTagName('lifer')[0].childNodes[0].nodeValue;
          } catch (err) {
              lifer = 1;
            }
          liferFloat = parseFloat(lifer);

          for (var i = 0; i < MAX_LIFER; i++) {
            var ch = '·';
            if (i == liferFloat) {ch = '•';}
            liferStr += ch;
          }
          try {
            document.getElementById("lifer").innerHTML = liferStr;
          } catch (err) { }


          // Time & date
          try {
            var time = this.responseXML.getElementsByTagName('time')[0].childNodes[0].nodeValue;
          } catch (err) {
            time = '-';
            }
          try {
            document.getElementById("time").innerHTML = time;
            document.getElementById("time-hide").innerHTML = time;
          } catch (err) { }

          try {
            var day = this.responseXML.getElementsByTagName('day')[0].childNodes[0].nodeValue;
          } catch (err) {
              day = '-';
            }
          try {
            document.getElementById("day").innerHTML = day;
            document.getElementById("day-hide").innerHTML = day;
          } catch (err) {

            }

          try {
            var mon = this.responseXML.getElementsByTagName('month')[0].childNodes[0].nodeValue;
          } catch (err) {
              mon = '-';
            }
          try {
            monthStr = month(mon);
            document.getElementById("month").innerHTML = monthStr;
            document.getElementById("month-hide").innerHTML = monthStr;
          } catch (err) { }

          try {
            var wday = this.responseXML.getElementsByTagName('weekday')[0].childNodes[0].nodeValue;
          } catch (err) {
              wday = '-';
            }
          try {
            weekdayStr = weekday(wday);
            document.getElementById("week-day").innerHTML = weekdayStr;
            document.getElementById("week-day-hide").innerHTML = weekdayStr;
          } catch (err) { }

          // Voltage & power
          try {
            var dvolt = this.responseXML.getElementsByTagName('voltage')[0].childNodes[0].nodeValue;
          } catch (err) {
              dvolt = "0";
            }
          try {
            var dvoltage = Math.round(parseInt(dvolt), 0);
            document.getElementById("dash-voltage").innerHTML = dvoltage;
            document.getElementById("dash-voltage-hide").innerHTML = dvoltage;
          } catch (err) { }

          try {
            var pwr = this.responseXML.getElementsByTagName('power')[0].childNodes[0].nodeValue;
          } catch (err) {
              pwr = "0";
            }
          try {
            var power = Math.round(parseInt(pwr), 0);
            document.getElementById("dash-power").innerHTML = power;
            document.getElementById("dash-power-hide").innerHTML = power;
          } catch (err) { }

          // Uptime
          try {
            var uptm = this.responseXML.getElementsByTagName('uptime')[0].childNodes[0].nodeValue;
          } catch (err) {
              uptm = '-';
            }
          try {
            document.getElementById("dash-uptime").innerHTML = uptm;
          } catch (err) { }

          // free RAM
          try {
            var freeRam = this.responseXML.getElementsByTagName('freeRAM')[0].childNodes[0].nodeValue;
          } catch (err) {
              freeRam = '-';
            }
          try {
            var freeRamPer = Math.round(freeRam / 80, 0);
            document.getElementById("dash-free-ram").innerHTML = freeRam + ' / ' + freeRamPer + '%';
          } catch (err) { }

          // Cyclos / CPU load
          try {
            var cyclosDelay = this.responseXML.getElementsByTagName('cycDelay')[0].childNodes[0].nodeValue;
          } catch (err) {
              cyclosDelay = '-';
            }
          try {
            var cyclosInSec = this.responseXML.getElementsByTagName('cycInSec')[0].childNodes[0].nodeValue;
          } catch (err) {
              cyclosInSec = '-';
            }

          try {
            load('cpu-load',  1, cyclosDelay, '', bufferCpuLoad1, '', 'cpu', 'rgba(100, 160, 230, 1)', 'yellow', 'cyan');
          } catch (err) { }
          try {
            load('cpu-load2', 2, cyclosDelay, cyclosInSec, bufferCpuLoad2, bufferCpuLoad3, 'cpu', 'rgba(100, 160, 230, 1)', 'yellow', 'cyan');
          } catch (err) { }
          try {
            load('cpu-load3', 3, cyclosDelay, '', bufferCpuLoad4, '', 'cpu', 'rgba(100, 160, 230, 1)', 'cyan', 'lightblue');
          } catch (err) { }
          try {
            load('cpu-load4', 4, cyclosDelay, cyclosInSec, bufferCpuLoad5, bufferCpuLoad6, 'cpu', 'rgba(100, 160, 230, 1)', 'yellow', 'cyan');
          } catch (err) { }

          // Mode
          try {
            var mode = this.responseXML.getElementsByTagName('mode')[0].childNodes[0].nodeValue;
          } catch (err) {
              mode = "-";
            }
          if (mode == 1) {
            modeText = 'ONE';
          } else {
              modeText = 'MDM';
            }
          try {
            document.getElementById('mode').innerHTML = modeText;
            document.getElementById('mode').style.background = modeBackground(mode);
            document.getElementById('mode').style.color = modeColor(mode);
          } catch (err) { }

          // Ports page works
          if (currentPage == 'ports-page') {

            // HTTP request
            try {
              var httpr = this.responseXML.getElementsByTagName('httpReq')[0].childNodes[0].nodeValue;
            } catch (err) {
                httpr = '-'
              }
            try {
              document.getElementById("get-ports-request").innerHTML = httpr;
            } catch (err) { }

            try {
              // XML-req
              document.getElementById("get-ports-response").innerHTML = this.responseText;
            } catch (err) { }

            // Pins status
            for (var i = 0; i < 17; i++) {
              try {
                var pin = this.responseXML.getElementsByTagName(pinId[i])[0].childNodes[0].nodeValue;
              } catch (err) {
                  pin = "-1";
                }
              try {
                document.getElementById(pinId[i]).innerHTML = stateOnOff(pin);
                document.getElementById(pinId[i]).style.background = stateOnOffBackground(pin);
                document.getElementById(pinId[i]).style.color = stateOnOffColor(pin);
              } catch (err) { }
            }
          } // if (currentPage == 'ports-page')

          // Supply page works
          if (currentPage == 'supply-page') {
            // Electro
            try {
              document.getElementById("volt").innerHTML = dvoltage;
            } catch (err) { }
            try {
              document.getElementById("p1").innerHTML = power;
            } catch (err) { }

            try {
              graph('graph-voltage', 3, dvoltage, '', bufferElectro9, '', 'pwr', 'rgba(4, 169, 174, 1)', 'rgba(204,9,51, 1)', 'lightblue');
            } catch (err) { }
            try {
              graph('graph-power', 3, power, '', bufferElectro1, '', 'pwr', 'rgba(4, 169, 174, 1)', 'rgba(213,125,12, 1)', 'lightblue');
            } catch (err) { }

            // Period
            try {
              var period = this.responseXML.getElementsByTagName('period')[0].childNodes[0].nodeValue;
              period -= 100;
            } catch (err) {
                period = "-";
              }
            try {
              var frec = 1 / (period / 1000000);
              document.getElementById("freq").innerHTML = frec.toFixed(2);
            } catch (err) { }

            try {
              graph('graph-freq', 3, frec.toFixed(2), '', bufferElectro7, '', 'pwr', 'rgba(4, 169, 174, 1)', 'rgba(44,77,220, 1)', 'lightblue');
            } catch (err) { }
          } // if (currentPage == 'supply-page')

          // Electro page works
          if (currentPage == 'electro-page') {

            // Electro modul
            try {
              var modulElectro = this.responseXML.getElementsByTagName('modulElectro')[0].childNodes[0].nodeValue;
            } catch (err) {
                modulElectro = '-';
              }

            var modulElectroStatus = "";

            switch (modulElectro) {
              case "0":
                modulElectroStatus = "выключен";
                break;
              case "1":
                modulElectroStatus = "включен";
                break;
              default:
                modulElectroStatus = "отсутствует";
                try {
                  document.getElementById("button-electro").innerHTML = "-";
                  document.getElementById("button-electro").style.background = modulDisable;
                } catch (err) { }
              break;
            }
            try {
              document.getElementById("modul-electro").innerHTML = modulElectroStatus;
            } catch (err) { }

            // Electro
            for (var i = 0; i < 14; i++) {
              try {
                ui[i] = this.responseXML.getElementsByTagName(UiId[i])[0].childNodes[0].nodeValue;
                ui[i] = Math.round(parseInt(ui[i]), 0);
              } catch (err) {
                  ui[i] = "...";
                }
              try {
                document.getElementById(UiId[i]).innerHTML = ui[i];
              } catch (err) { }

            }
            try {
              graph('graph-test', 3, ui[1], '', bufferElectro1, '', 2, 'rgba(4, 169, 174, 1)', 'rgba(204,9,51, 1)', 'lightblue');
            } catch (err) { }
            try {
              graph('graph-cond', 3, ui[4], '', bufferElectro2, '', 2, 'rgba(4, 169, 174, 1)', 'rgba(213,125,12, 1)', 'lightblue');
            } catch (err) { }
            try {
              graph('graph-plita', 3, ui[2], '', bufferElectro3, '', 2, 'rgba(4, 169, 174, 1)', 'rgba(166,0,151, 1)', 'lightblue');
            } catch (err) { }
            try {
              graph('graph-str', 3, ui[3], '', bufferElectro4, '', 2, 'rgba(4, 169, 174, 1)', 'rgba(75,152,190, 1)', 'lightblue');
            } catch (err) { }
            try {
              device('device-plita', 3, ui[2], 'Плита',             200, 500, 900, 1500);
            } catch (err) { }
            try {
              device('device-str',   3, ui[3], 'Стиральная машина', 60, 300, 1500, 2000);
            } catch (err) { }
            try {
              device('device-cond',  3, ui[4], 'Кондиционер',       60, 100, 600, 1500);
            } catch (err) { }

            // draw bar
            //drawBar(p2, p3, p4, p6, p7, p8, p9, p10, p11, p12, p13);
          } // if (currentPage == 'electro-page')


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
              try {
                document.getElementById(tagOnline).innerHTML = netDevicesNames[i];
                document.getElementById(tagOnline).style.background = onlineBackground(dOnline);
                document.getElementById(tagOnline).style.color = onlineColor(dOnline);
              } catch (err) { }
            } else {
                try {
                  document.getElementById(tagOnline).style.display = "none";
                } catch (err) { }
              }
          } // for (var i = 0; i < TOTAL_NET_DEVICES; i++)

        } // if (this.responseXML != null)
      } // if (this.status == 200)
    } // if (this.readyState == 4)
  } // request.onreadystatechange = function()

  dash_marker1 = parseFloat("0.0");

  // send HTTP GET request with LEDs to switch on/off if any
  request.open("GET", "request_dash" + currentPage + randomNoCache(), true);
  request.send(null);
  setTimeout('getDashData()', 2000);
  dash_marker3 = parseFloat("0.0");
} // getDashData()

/* end */