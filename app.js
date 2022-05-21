const express = require("express")
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "bb4564ab92896d8747c1e7963b1212a0";
    const unit = "metric";
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units=" + unit;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<h1>Weather in "+ query +"</h1>")
            res.write("<p>The temperature is " + temp + " degrees Celcius.</p>");
            res.write("<p>The weather is " + weatherDesc + ".</p>");
            res.write("<img src=" + imgURL + ">");
            res.send();
        })
    })
})


app.listen(3000, function(){
    console.log("Server is running on port 3000");
})