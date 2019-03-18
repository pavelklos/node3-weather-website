const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/156ca666fcabd614ccf775e892b98bef/' + latitude + ',' + longitude + '?units=si'
 
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            var date = new Date(body.currently.time * 1000);
            var localDate = date.toLocaleString('cs-CZ', { timeZone: body.timezone })
            // console.log('timezone:', body.timezone)
            // console.log('offset:', body.offset)
            // console.log('time:', body.currently.time)
            // console.log(localDate);

            callback(undefined, 'Local time: ' +  localDate + '. ' + body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast