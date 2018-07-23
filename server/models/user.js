const mongoose = require('mongoose');
//const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    //id:mongoose.Schema.Types.ObjectId,
    name:{type:String, required:true, unique:true},
    email:{type:String, required:true, unique:true},
    password:String,
    date:Date,
    resettoken: String,
    resetexpires:Date,
    secret: String,
    pic:String,
    test:String
})
//userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('user', userSchema);