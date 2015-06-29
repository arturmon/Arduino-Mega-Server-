/* -----------------------------------------
  agraph.js v.0.1
  part of Arduino Mega Server project
  Canvas graphics functions
-------------------------------------------- */

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
}


function labelAnalog(value, place, measure, title, background) {
  title_font = '11px Tahoma';
  value_font = '18px Tahoma';
  color = 'white';

  elem = document.getElementById(place);
  context = elem.getContext('2d');

  va = parseInt(value);
  bg = 'rgba(220, 100, 100, 1)';

  if (va >= 0   && va < 100) {bg = 'rgba(120, 110, 0, 1)';}
  if (va >= 100 && va < 200) {bg = 'rgba(130, 100, 0, 1)';}
  if (va >= 200 && va < 300) {bg = 'rgba(140, 90, 0, 1)';}
  if (va >= 300 && va < 400) {bg = 'rgba(150, 80, 0, 1)';}
  if (va >= 400 && va < 500) {bg = 'rgba(160, 70, 0, 1)';}
  if (va >= 500 && va < 600) {bg = 'rgba(170, 60, 0, 1)';}
  if (va >= 600 && va < 700) {bg = 'rgba(180, 50, 0, 1)';}
  if (va >= 700 && va < 800) {bg = 'rgba(190, 40, 0, 1)';}
  if (va >= 800 && va < 900) {bg = 'rgba(200, 30, 0, 1)';}
  if (va >= 900 && va < 1000) {bg = 'rgba(210, 20, 0, 1)';}
  if (va >= 1000 && va < 1024) {bg = 'rgba(220, 10, 0, 1)';}

  context.fillStyle = bg;
  context.fillRect(0, 0, elem.width, elem.height);

  context.fillStyle = color;
  context.fillRect(6, 33, 47, 1);

  context.textAlign = "center";

  context.font = value_font;
  context.fillText(value + measure, 30, 24, 55);

  context.font = title_font;
  context.fillText(title, 30, 49, 55);
}

function addTick(value, buffer, min) {
  for (var i = MAX_CPU_LOAD_BUFFER - 1 ; i > 0; i--) {
    buffer[i] = buffer[i - 1];
  }
  buffer[0] = value;
  if (buffer[0] < min) {buffer[0] = min;}
}

function load(place, type, value1, value2, buffer1, buffer2, title, color, color1, color2) {
  var background = 'rgba(0, 0, 0, 1)';  
  var title_font = '11px Tahoma';
  var value_font = '18px Tahoma'; 

  var step = 5;
  var shiftX = 33;
  var shiftY = 29;
  var kY = 5;

  // buffers works
  addTick(value1, buffer1, kY);
  if (type == 2 || type == 4) {
    addTick(value2, buffer2, kY);
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
}
