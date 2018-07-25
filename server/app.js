const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes/routes')
const path = require('path')
const db = require('./config/dbconfig')
const env = require('dotenv').config()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname,'../views')))

// app.set('view engine', 'ejs');
app.use('/', routes)


    //SERVER PORT
const port = process.env.PORT || 2000
    //DATABASE CONNECTION
    mongoose.connect(db.mongoURI)
    .then(() => {
        app.listen(port, (req,res)=>{
            console.log(`app is working on port ${port} and database is connected`)
        })
    })
    .catch(err => console.log(err))