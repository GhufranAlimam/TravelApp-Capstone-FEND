projectData = {};
const path = require('path')
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
// const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config({path:path.join(__dirname,'../.env')});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static("dist"))
const PORT = process.env.PORT || 8081;

app.get('/', (req, res)=>{
    res.status(200).send('./dist/index.html')
})

app.get('/trip', (req, res) =>{
    res.send(projectData)
})

app.post('/trip', (req,res) =>{
    console.log(projectData)
    projectData = {
        city: req.body.city,
        temp: req.body.temp,
        description: req.body.description,
        travelDate: req.body.travelDate,
        endDate: req.body.endDate,
        country: req.body.country,
        futureTemp: req.body.futureTemp,
        diffDays: req.body.diffDays
    }
    res.send({
        success: true,
        message: "data is saved",
        data: projectData
    })
})
app.listen(PORT,()=>{
    console.log(`server is running on port: ${PORT}`)
})