const mongoose = require('mongoose')
const mongoDbErrorHandler = require('mongoose-mongodb-errors');

const adminSchema = new mongoose.Schema({
    //Id:mongoose.Schema.Types.ObjectId,
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    firstname: String,
    lastname:String,
    gender:String,
    phone:String
})
adminSchema.plugin(mongoDbErrorHandler)
module.exports = mongoose.model('admin', adminSchema);