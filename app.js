const express = require("express");
const https = require("https"); //api calls
const bodyParser = require("body-parser"); //parse
const app = express();



app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static("public"));
app.get("/", function(req,res){ //get request (browser gets the file)

  res.sendFile(__dirname+"/index.html");

});
app.post("/",function(req,res){

  const query = req.body.cityName;
  const apiKey = "08eb3af6dc2f5688d0ea9ae1ad7ce1fd";
  const units ="metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+apiKey+ "&units="+units;
  https.get(url,function(response){ //api call
    // console.log(response);
    response.on("data", function(data){ //JSON received
      const WeatherData = JSON.parse(data);
      const temp = WeatherData.main.temp;
      const weatherDescription = WeatherData.weather[0].description;
      const icon = WeatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<p class='description'>Weather description: "+weatherDescription+"<p>");
      res.write("<p class='Temperature'>Temperature in "+ query + " is "+ temp +"<p>");
      res.write("<img class = 'imageTemp' src=" + imageURL+">");
      res.send();
    });
  });
})


app.listen(3000,function(){
  console.log("server running on port 3000");
});
