const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmlzaGkwMDcxNiIsImEiOiJjazV3Mzg2ZHQwN3QzM21wMWd0MXc1cmZzIn0.xFocgpWRMfWjkjsJnCQebQ&limit=1'
    //destructured - response to body
    request({url, json:true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to location services!',undefined)
        }else if(body.features.length === 0)
        {
            callback('unable to find location! Try another',undefined)
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports = geocode