const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    name:String,
    ingredients:String,
    procedure:String
})
module.exports = mongoose.model('recipe', recipeSchema)