/* -----------------------------------------
  electro2.js v.0.1
  part of Arduino Mega Server project
  Electro graphics and Flotr2 functions
-------------------------------------------- */

function drawBar(a, b, c, d, e, f, g, h, i, j, k) {
  var container = document.getElementById('containerBar'),
    data = [],
    graph, i;

    //Sample the sine function
    /*
    for (i = 0; i < 4 * Math.PI; i += 0.2) {
      data.push([i, i/2]);
    }
    */
    data.push([0, a]);
    data.push([1, b]);
    data.push([2, c]);
    data.push([3, d]);
    data.push([4, e]);
    data.push([5, f]);
    data.push([6, g]);
    data.push([7, h]);
    data.push([8, i]);
    data.push([9, j]);
    data.push([10, k]);

    // Draw Graph
    graph = Flotr.draw(container, [ data
      ], {bars: {
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
        }
    );
} // drawBar
