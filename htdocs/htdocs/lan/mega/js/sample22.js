/* -----------------------------------------
  system-flotr2.js
  part of Arduino Mega Server project
  Sample2 graphics and Flotr2 functions
-------------------------------------------- */

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
} // drawBar

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
}  // drawPie
