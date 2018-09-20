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
            text:{type:String},
            date:{type:Date, default:Date.now()},
            created_by:{type:String}
            // type: mongoose.Schema.Types.ObjectId,
            // ref: "comment"
        }
    ]
})
recipeSchema.plugin(mongoDbErrorHandler)
module.exports = mongoose.model('recipe', recipeSchema)
const recipe = module.exports = mongoose.model('recipe', recipeSchema)

module.exports.addComment = function(query, comment, callback){
    recipe.update(query, {
        $push:{
            comments: comment
        }
    }, callback)

}