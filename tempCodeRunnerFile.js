const express = require("express");
const bodyParser=require("body-parser")

// rest of your code

const fetch = require('node-fetch');
//const fs=require('fs')
const app =express();
app.use(bodyParser.urlencoded({extended:true}));
require('dotenv').config();
app.get("/",(req,res)=>{
    res.sendFile(__dirname + '/index.html')
});
app.post('/',async(req,res)=>{
    let location =await req.body.city;
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${location}&appid=${process.env}`;
    const response =await fetch(url);
    const weatherData =response.json();
    console.log(weatherData);
});
app.listen(3000,()=>{
   console.log("server listening on port 3000")
});