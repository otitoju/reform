const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:String,
    date:Date
})
module.exports = mongoose.model('user', userSchema);