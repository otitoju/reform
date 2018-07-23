const mongoose = require('mongoose')
const admin = require('./admin')

const recipeSchema = new mongoose.Schema({
    //id:mongoose.Schema.Types.ObjectId,
    name:String,
    ingredients:String,
    procedure:String,
    photo:String,
    author:{type:String, ref:admin},
    time:Date
})
module.exports = mongoose.model('recipe', recipeSchema)