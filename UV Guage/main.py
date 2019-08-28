import bottle


@bottle.route('/uv.js')
def uv_func():
    return bottle.static_file('uv.js', root='')


@bottle.route('/')
def gauge_func():
    return bottle.static_file('gauge.html', root='')


@bottle.route('/forecast')
def forecast_func():
    return bottle.static_file('forecast.html', root='')


@bottle.route('/weather.js')
def weather_func():
    return bottle.static_file('weather.js', root='')


bottle.run(host='0.0.0.0', port=8080, debug=True)
