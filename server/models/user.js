const mongoose = require('mongoose');
const mongoDbErrorHandler = require('mongoose-mongodb-errors');

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
    gender:String,
    phone:Number

})
userSchema.plugin(mongoDbErrorHandler);
module.exports = mongoose.model('user', userSchema);