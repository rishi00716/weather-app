const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/01b6fb03b9d64fcc9a52f4f6c669dd8c/' + latitude + ',' + longitude //units in si after the url with ?units=si
    //destructured - url and response to body
    request({url, json:true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }else if(body.error){
            callback('Unable to find location!',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out.There is a '+body.currently.precipProbability+'% chance of rain')
        }
    })
}

module.exports = forecast