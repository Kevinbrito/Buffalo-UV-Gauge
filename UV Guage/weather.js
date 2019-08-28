var http = new XMLHttpRequest();
var forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?id=5188847&APPID=1ca577717ed50c37277fb3e0239ed098';
http.onreadystatechange = function() {
if (this.readyState === 4 && this.status === 200){
  var forecastData = JSON.parse(http.responseText);
  var dateTimeArray = [];
  var humidityArray = [];
  var temperatureArray = [];
  var dataObject = {};
  for (var object of forecastData['list'] ) {
    dateTimeArray.push(object['dt_txt']);
    humidityArray.push(object['main']['humidity']);
    temperatureArray.push((object['main']['temp'] - 273.15) * (9/5) + 32 );
  dataObject['date&time'] = dateTimeArray;
  dataObject['humidity'] = humidityArray;
  dataObject['temperature'] = temperatureArray;
  }
  
  var trace1 = {
  x: dataObject['date&time'], 
  y: dataObject['humidity'],
  type: 'bar',
  name: 'Humidity (%)',
  marker: {
    color: 'rgb(92, 151, 191)',
    opacity: 0.7
    }
  };
  var trace2 = {
  x: dataObject['date&time'],
  y: dataObject['temperature'],
  type: 'bar',
  name: 'Temperature (°F)',
  marker: {
    color: 'rgb(255, 148, 120)',
    opacity: 0.5
    }
  };
  var data = [trace1, trace2];

  var layout = {
  title: 'Five Day Forecast',
  xaxis: {
    tickangle: -45
    },
  barmode: 'group'
  };

  Plotly.newPlot('forecast', data, layout, {showSendToCloud:true});
} else if (this.readyState === http.DONE && this.status !== 200) {
  console.log('Error! ' +this.status);
  }
};
http.open('GET', forecastURL);
http.send();