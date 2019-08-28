var http = new XMLHttpRequest();
var uvURL='https://api.openweathermap.org/data/2.5/uvi?lat=42.125332&lon=-79.875053&APPID=1ca577717ed50c37277fb3e0239ed098';
http.onreadystatechange = function() {
if (this.readyState === 4 && this.status === 200){
  var uvIndex = JSON.parse(http.responseText);

  // Index is the UVIndex obtained from API
  var index = uvIndex['value'];

  // Mathematics used to ensure meter is pointing at appropriate location
  var degrees = 15 - index,
    radius = .5;
  var radians = degrees * Math.PI / 15;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);


  var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
    pathX = String(x),
    space = ' ',
    pathY = String(y),
    pathEnd = ' Z';
  var path = mainPath.concat(pathX, space, pathY, pathEnd);

  var data = [{
    type: 'scatter',
    x: [0], y: [0],
    marker: { size: 28, color: '850000' },
    showlegend: false,
    name: 'index',
    text: index,
    hoverinfo: 'text+name'
  },
  {
    values: [50 / 6, 50 / 6, 50 / 6, 50 / 6, 50 / 6, 50 / 6, 50],
    rotation: 90,
    text: ['DANGEROUS!', 'Extreme', 'Very High', 'High',
      'Moderate', 'Low', ''],
    textinfo: 'text',
    textposition: 'inside',
    marker: {
      colors: ['rgba(46, 49, 49, 1)', 'rgba(150, 54, 148,1)',
        'rgba(207, 0, 15, 1)', 'rgba(211, 84, 0, 1)',
        'rgba(255, 255, 126, 1)', 'rgba(30, 130, 76, 1)',
        'rgba(255, 255, 255, 0)']
    },

    // values required for each individual section
    labels: ['13+', '11+', '8-10', '6-7', '3-5', '1-2', ''],
    hoverinfo: 'label',
    hole: .5,
    type: 'pie',
    showlegend: false
  }];

  var layout = {
    shapes: [{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
    title: '<b>UV Index</b> <br> Protect Yourself From Harmful Rays!',
    height: 1000,
    width: 1000,
    xaxis: {
      zeroline: false, showticklabels: false,
      showgrid: false, range: [-1, 1]
    },
    yaxis: {
      zeroline: false, showticklabels: false,
      showgrid: false, range: [-1, 1]
    }
  };


  Plotly.newPlot('gauge', data, layout, { showSendToCloud: true });
} else if (this.readyState === http.DONE && this.status !== 200) {
  console.log('Error! ' +this.status);
  }
};
http.open('GET', uvURL);
http.send();