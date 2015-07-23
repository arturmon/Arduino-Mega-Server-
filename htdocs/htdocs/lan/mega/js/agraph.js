/* -----------------------------------------
  agraph.js v.0.11
  part of Arduino Mega Server project
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
} // device
