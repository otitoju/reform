const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    Id:mongoose.Schema.Types.ObjectId,
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    firstname: String,
    lastname:String
})
module.exports = mongoose.model('admin', adminSchema);