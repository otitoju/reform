const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes/routes')
const path = require('path')
//const flash = require('req-flash');


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname,'../views')))
//app.use(flash());

// app.set('view engine', 'ejs');
app.use('/', routes)

// app.get('/', (req,res)=>{
//     res.render('../../views/pages/login')
// })
// app.get('*', (req, res) => {
//     console.log('404 error')
//     res.send('<h1>404 ERROR, PAGE NOT FOUND') 
// })
//SERVER PORT
const port = 2000
app.listen(port, (req,res)=>{
    //DATABASE CONNECTION
    mongoose.connect('mongodb://localhost:27017/recipereformdb')
    // mongoose.connect('mongodb://otitoju:sci15csc067@ds247830.mlab.com:47830/recipereformdb')
    console.log(`app is working on port ${port} and database is connected`)
})