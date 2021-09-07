const request = require('request');


const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibXVrZXNoYnVsZGFrIiwiYSI6ImNrdDh4dWwwejE2d3cyb3BlZHZjc2V3bXIifQ.e4s7RhUOlS5I1acByyQpig&limit=1'

    request({ url, json: true }, (error, response) => {
        if (error) {
            // console.log("Unable to connect to geocoding");
            callback("Unable to connect to geocoding", undefined);
        } else if (response.body.features.length === 0) {
            // console.log("unable to find longitude for given place");
            callback("unable to find longitude for given place"); // seconf argumaent automatic undefined
        } else {

            const latitude = response.body.features[0].center[1];
            const longitude = response.body.features[0].center[0];
            const place = response.body.features[0].place_name;

            // console.log(latitude);
            // console.log(longitude);
            // console.log(place);
            const data = {
                latitude,
                longitude,
                place
            }

            callback(undefined, data);
        }

    });
};


module.exports = geoCode;