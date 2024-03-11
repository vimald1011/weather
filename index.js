const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
var path = require('path');

const port = 3000;
const app = express();
const token = process.env.API;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})



app.get("/getData", (req, res) => {
    const city = req.query.citty;
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${token}`;
    weather();
    async function weather() {
        const response = await fetch(url);
        const data = await response.json();
        res.sendFile(__dirname + "/views/index.ejs", {
            tempt: Math.round(data.main.temp),
            location: data.name,
            windSpeed: Math.round(data.wind.speed),
            humidity: Math.round(data.main.humidity)

        }); // Render the index with krishna value
    }
});

app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});
