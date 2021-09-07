const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=07535db2d2ee3e87646ba7808bd07b9e&query=' + longitude + ',' + latitude + '&unit=f';
    // const url = 'http://api.weatherstack.com/current?access_key=07535db2d2ee3e87646ba7808bd07b9e&query=44.1545,-75.7088&unit=f';
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("error occur in connection to weather api");
        } else if (response.body.error) {
            callback("Unable to find location", undefined);
        } else {

            // console.log(response.body.current.weather_descriptions[0]);
            // console.log(response.body.current.temperature);
            // console.log(response.body.current.feelslike);
            callback(undefined, {
                weather_descriptions: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike
            });
        }
    });
};

module.exports = forecast;