const mongoose = require('mongoose')
const mongoDbErrorHandler = require('mongoose-mongodb-errors');

const adminSchema = new mongoose.Schema({
    //Id:mongoose.Schema.Types.ObjectId,
    username:{type:String, trim: true},
    password:{type:String, trim:true},
    email:{type:String, trim:true},
    firstname: String,
    lastname:String,
    gender:String,
    phone:String
})
adminSchema.plugin(mongoDbErrorHandler)
module.exports = mongoose.model('admin', adminSchema);