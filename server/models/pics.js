const mongoose = require('mongoose')
const picSchema = new mongoose.Schema({
    name:String,
    pic:String,
})
module.exports = mongoose.model('pics', picSchema)