// projectData = {};
const path = require('path')
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
// const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config({path:path.join(__dirname,'../.env')});

app.use(express.static("dist"))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000;

app.get('/test', (req, res)=>{
    res.send('dist/index.html')
})


app.listen(PORT,()=>{
    console.log(`server is running on port: ${PORT}`)
})