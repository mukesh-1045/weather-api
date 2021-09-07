const path = require('path');

const express = require('express');
const app = express();
const hbs = require('hbs');
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const port = process.env.PORT || 8080;
// paths for express config

const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");


//setup handlebars engine and view locations 
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//setup for static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Mukesh Buldak"
    });
});



app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Mukesh Buldak",
        msg: "Will get you what u want"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Mukesh Buldak"
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "you Must Provide a Address term"
        });
    }

    geoCode(req.query.address, (error, { latitude, longitude, place } = {}) => {    // default paramaneter for object destructuring
        if (error) {
            return res.send(error);
        } else {
            // res.write("Weather of ", place);
            forecast(longitude, latitude, (error, forecastData) => {
                if (error) {
                    return res.send(error);
                } else {
                    res.send({
                        place,
                        weather_descriptions: forecastData.weather_descriptions,
                        temperature: forecastData.temperature,
                        feelslike: forecastData.feelslike
                    });
                }
            });
        }
    });



    // res.send({
    //     forecast: "it is raining",
    //     location: req.query.address
    // });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "you Must Provide a Search term"
        });
    }
    console.log(req.query.search);
    res.send({
        product: []
    });

});

app.get('help/*', (req, res) => {    // help specfic
    res.render('404', {
        title: "404",
        error: "Help Artical not found",
        name: "Mukesh Buldak"
    });
});

app.get("*", (req, res) => {
    res.render('404', {
        title: "404",
        error: "Page not found",
        name: "Mukesh Buldak"
    });
});

app.listen(port, () => {
    console.log("listening to port ............", port);
});