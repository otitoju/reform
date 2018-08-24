const mongoose = require('mongoose')
const mongoDbErrorHandler = require('mongoose-mongodb-errors');

const recipeSchema = new mongoose.Schema({
    name:String,
    ingredients:[{type:String}],
    procedure:String,
    description:String,
    photo:String,
    author:{type:String, ref:'admin'},
    time:{type:Date, default:Date.now()},
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ]
})
recipeSchema.plugin(mongoDbErrorHandler)
module.exports = mongoose.model('recipe', recipeSchema)