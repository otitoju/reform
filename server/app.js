const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes/routes')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use('/', routes)


// app.get('*', (req, res) => {
//     res.send('<h1>404 ERROR, PAGE NOT FOUND') 
// })
//SERVER PORT
const port = 2000
app.listen(port, (req,res)=>{
    //DATABASE CONNECTION
    mongoose.connect('mongodb://otitoju:sci15csc067@ds247830.mlab.com:47830/recipereformdb')
    console.log(`app is working on port ${port} and database is connected`)
})