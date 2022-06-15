const express = require("express");
const app = express();
const https = require('https');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    
    const query = req.body.cityName;
    const apiKey = config.API_TOKEN;
    const unit = "imperial"
    const    url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey +"&units="+ unit;
    
    https.get(url, function(response){
        response.on("data", function(data){
            
            
            const weatherData = JSON.parse(data);
            const tempFeel = weatherData.main.feels_like;
            const temp = weatherData.main.temp;
            const cityName = weatherData.name;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            res.write("<h1>The temperature in " + cityName + " is " + temp + " degrees Farenheight</h1>");
            res.write("The temperature <em>real feel</em> is " + tempFeel + " degrees. Expect a " + weatherDescription + ".");
            res.write("<br><img src=" + imageURL + ">");
            res.send();
        });
    });    
   
})




app.listen(3000, function(){
    console.log("Server running on port 3000: ");
})