// projectData = {};
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


app.listen(PORT,()=>{
    console.log(`server is running on port: ${PORT}`)
})