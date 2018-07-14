const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    //id:mongoose.Schema.Types.ObjectId,
    name:String,
    ingredients:String,
    procedure:String
})
module.exports = mongoose.model('recipe', recipeSchema)