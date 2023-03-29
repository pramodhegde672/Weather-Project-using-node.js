const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "1df7e7cc19a70d93dee1738ea8383bb4";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apiKey +
    "&units=" +
    unit;

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The Weather is Currently " + weatherDescription + "</p>");
      res.write(
        "<h1>The Temperature in " +
          query +
          " is " +
          temp +
          " degree celcius.</h1>"
      );
      res.write("<img src=" + imageUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
