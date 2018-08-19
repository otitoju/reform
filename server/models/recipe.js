const mongoose = require('mongoose')
const mongoDbErrorHandler = require('mongoose-mongodb-errors');

const recipeSchema = new mongoose.Schema({
    //id:mongoose.Schema.Types.ObjectId,
    name:String,
    ingredients:[{type:String}],
    procedure:String,
    photo:String,
    author:{type:String, ref:'admin'},
    time:{type:Date, default:Date.now()},
    comment:[{type:mongoose.Schema.Types.ObjectId, ref:'comment'}]
})
recipeSchema.plugin(mongoDbErrorHandler)
module.exports = mongoose.model('recipe', recipeSchema)