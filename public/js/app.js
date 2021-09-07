console.log("client side js file is loaded");

function getWeather(url, callback) {
    fetch(url)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    // console.log(data.error);
                    callback(data);
                } else {

                    // console.log(data.place);
                    // console.log(data.feelslike);
                    // console.log(data.temperature);
                    callback(data);
                }
            })
        });
}

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const result = document.getElementById('result');
const error = document.getElementById('error');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    result.textContent = "";
    error.textContent = "";
    const location = search.value;
    const url = "/weather?address=" + location;
    getWeather(url, (data) => {
        if (data.error) {
            error.textContent = data.error;
        } else {
            result.textContent = "Weather of " + data.place + " is " + data.weather_descriptions +
                "Temperature is " + data.temperature + " degree celcius , but feelslike " + data.feelslike + " degree celcius";
            search.value = "";
        }
    });


});