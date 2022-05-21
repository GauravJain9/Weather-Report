const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  var cityName = req.body.cityName;
  const apiKey = "142bb169d71c4ccff3d23e2ff22c4f43";
  const units = req.body.inlineRadioOptions;
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid=" + apiKey + "&units=" + units;
  https.get(apiUrl, function (response) {
    response.on("data", function(data) {
    const weatherData = JSON.parse(data);
    const temp = weatherData.main.temp;
    const weatherDesc = weatherData.weather[0].description;
    const img = weatherData.weather[0].icon;
    // https.get("https://openweathermap.org/img/wn/10n@2x.png", function (img) {
    //   res.write("img");
    // });
    var measure = "Celsius";
    if(units === "imperial")
    measure = "Farenheit";
    if(units === "standard")
    measure = "Kelvin";
    const imgUrl = "https://openweathermap.org/img/wn/"+img+"@2x.png";
    res.write("<p><h1>The weather description currently : " + weatherDesc + " </h1></p>");
    res.write("<h1>The temperature at " + cityName + " is " + temp + " degree " + measure + "</h1>");
    res.write("<img src =" + imgUrl + ">");
    res.send();
  });
});
});

app.listen(3000, function() {
  console.log("Server listening on port:3000");
})
