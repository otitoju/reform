const bodyParser = require('body-parser')
const recipe = require('../models/recipe')
const user = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const adminConfig = require('../config/adminconfig')
const comments = require('../models/comment')

exports.createRecipe = async (req, res) => {
    if (req.body.name == '' || req.body.ingredients =='' || req.body.procedure ==''){
        res.json({
            message:`Please create recipes`
        })
    }
    else{
        const admintoken = await req.headers['authorization'].split(" ")[1];
        const decode = await jwt.verify(admintoken, process.env.adminsecret || adminConfig.adminsecret)
        let author = decode.username
        const Recipe = await recipe.create({
            name:req.body.name,
            ingredients:req.body.ingredients,
            procedure:req.body.procedure,
            author:author,
            description:req.body.description
        })
        res.status(200).json({
            message:'Recipe created',
            id:Recipe.id,
            recipe:Recipe
        })
    }

}
// get all recipe
exports.getAllRecipe = async (req, res, next) => {
    const allRecipe = await recipe.find().sort({'_id':-1})
    const total_recipe = await allRecipe.length
    let food_id = allRecipe.id
    const token = await req.headers['authorization'].split(" ")[1];
    const decode = await jwt.verify(token, process.env.secret || config.secret)
    let name = await decode.name
    let id = await decode.id
    let email = await decode.email
    

    res.json({recipe:allRecipe,
         name:name,
         id:id,
         email:email,
         food_id:food_id,
         total:total_recipe,
        })
}
//get single recipe
exports.getSingleRecipe = async (req, res) => {
    const singleRecipe = await recipe.findById(req.params.id)
    //let comment = await singleRecipe.comments[0].text
    res.json({
        recipe:singleRecipe,
        //text:comment
    })
    
}
//update recipes
exports.updateRecipe = async (req, res) => {
    const update = await recipe.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.json(update)
}
//delete recipe
exports.deleteRecipe = async (req, res) => {
    const removeRecipe = await recipe.findByIdAndRemove(req.params.id)
    res.json(removeRecipe)
}
//fuzzy search
function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\$]/g, "\\$&")
}
exports.fuzzySearch =  (req, res) => {
    if(req.query.search){
        var regex = new RegExp(escapeRegex(req.query.search, 'gi'))
        recipe.find({name: regex}, (err, result) => {
            if(err){
                res.json({message:'Unable to complete seach'})
            }
            else{
                res.json(result)
            }
        })
    }
    
}
//Add comments
exports.createNewComment = (req, res) => {
    const recipeId = recipe.findById(req.params.id)
    const Comment = comments.create({
        name:req.body.name,
        comment:req.body.comment
    })
    if(recipeId){
        Comment === recipe.comment
        console.log(Comment)
    }
}