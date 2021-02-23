const express = require("express");

const app = express();

app.get('',(req, res) => {
  res.send("Hello Express !");
});

app.get('/help',(req,res)=>{
    res.send("Help Section!");
})

app.get('/about',(req,res)=>{
    res.send("About Section!");
})

app.get('/weather',(req,res)=>{
    res.send("Weather Section!");
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
