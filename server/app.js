const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes/routes')
const errorHandler = require('./handlers/errorhandler');
const path = require('path')
const db = require('./config/dbconfig')
const env = require('dotenv').config()
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/', routes)
//app.use(errorHandler.notFound);

if (app.get('env') === 'development') {
    /* Development Error Handler - Prints stack trace */
    app.use(errorHandler.developmentErrors);
}

// production error handler
app.use(errorHandler.productionErrors);
//server view
app.get('/', (req, res) => {
    res.send(`<h1>This is where the best food recipe is running</h1>`)
})


    //SERVER PORT
const port = process.env.PORT || 2000
    //DATABASE CONNECTION
    mongoose.Promise = global.Promise
    mongoose.connect(db.mongoURI)
    .then(() => {
        app.listen(port, (req,res)=>{
            console.log(`app is working on port ${port} and database is connected`)
        })
    })
    .catch(err => console.log(err))