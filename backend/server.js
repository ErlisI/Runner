const express = require("express");
const app = express();
const port = 5661;
const{Restaurant}=require("./models")
// const session = require("express-session");
// require("dotenv").config();
// const cors = require("cors");
// app.use((req, res, next)=> {
//     console.log(`Request: ${req.method} / ${req.originalURL}`);
//     res.on("finish",()=>{
//         console.log(`Response Status: ${res.statusCode}`);
//     })
// })
app.get("/", async(req,res)=>{
    res.send("hii");
});
app.get("/g",async (req,res)=>{
    try { 
    const ress=await Restaurant.findAll();
    res.status(201).json(ress);
    }
catch (error){
    console.error(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });