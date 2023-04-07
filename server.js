const express = require("express");
const bodyParser=require("body-parser");
const { Console } = require("console");
/*import('node-fetch')
  .then((fetch) => {
    // use fetch here
  })
  .catch((err) => {
    // handle error here
  });
  */

//const fs=require('fs')
const app =express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set("view engine","ejs");
require('dotenv').config();

app.get("/",(req,res)=>{
    //res.sendFile(__dirname + '/index.html')
    const sendData={location:"Location",temp:"Temp",disc:"Description",feel:"Fell-like",humidity:"Humidity",speed:"Speed"};
    console.log(sendData)
    //Bachir added this: it wasnt sending a file
    res.render('index',{sendData});
    //res.render("index",);
});
app.post('/',async(req,res)=>{ 
     //send data to the HTML:
     
    let location =await req.body.city;
    //Store the data to variables 
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.APIKEY}&units=metric`;
    const response =await fetch(url);
    const weatherData =await response.json();
    const temp=Math.floor(weatherData.main.temp);
    const desc=weatherData.weather[0].description;
   // const icon =weatherData.weather[0].icon;
   // const imageUrl=`https:openweathermap.org/img/wn/${icon}@2x.png`
    /*send the data to the browser
    res.write(`<h1>The current weather in ${location} is ${disc}</h1>`)
    res.write(`<h1>The current temperature is ${temp} degree cilcius.</h1>`);
    res.write(`<img src='${imageUrl}'>`);
    */
   const sendData={};
   sendData.temp=temp;
   sendData.desc=desc;
   sendData.location=location;
   sendData.feel=weatherData.main.feels_like;
   sendData.humidity=weatherData.humidity;
   sendData.speed=weatherData.wind.speed;
   //Bachir added this
   res.render('index',{sendData});

});

app.listen(3000,()=>{
  console.log("server listening on port 3000")
});
