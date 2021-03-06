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
    //const token = await req.headers['authorization'].split(" ")[1];
    const singleRecipe = await recipe.findById(req.params.id)
    let comment_length = singleRecipe.comments.length
    //console.log(comment_length)
    //let comment = await singleRecipe.comments[0].text
    res.json({
        recipe:singleRecipe,
        comment:comment_length
    })
    
}
//update recipes
exports.updateRecipe = async (req, res) => {
    const update = await recipe.findOne({_id:req.params.id})
    if(!update){
        res.status(404).json({message:'no recipe found'})
    }
    update.name = req.body.name || update.name
    update.ingredients = req.body.ingredients || update.ingredients
    update.procedure = req.body.procedure || update.procedure
    update.description = req.body.description || update.description
    await update.save()
    res.json({message:'updated'})
}
//delete recipes
exports.deleteRecipe = async (req, res) => {
    const removeRecipe = await recipe.findByIdAndRemove(req.params.id)
    res.json(removeRecipe)
}
//fuzzy search
function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\$]/g, "\\$&")
}
exports.fuzzySearch = async (req, res) => {
    const text = req.body.text
    const search = await new RegExp(text, 'i')
    if(!text){
        res.status(400).json({message:`You have search for an empty field`})
    }
    else{
        const result = await recipe.find( {name:search} )
        if(result == ''){
            res.json({message:`No record found, ${result.length} matches `})
        }
        else{
            res.json({info:result,
                match:`${result.length} matches`
            })
        }
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
//add comment
exports.addNewComment = async (req, res) => {
    if(!req.body.text){
        res.status(403).json({
            message:'No empty field allowed'
        })
    }
    else{
        const token = await req.headers['authorization'].split(" ")[1];
        const decode = await jwt.verify(token, process.env.secret || config.secret)
        var name = decode.name

        let article = new recipe()
        let query = {_id:req.params.id}
        let comment = {
            text:req.body.text,
            created_by:name
        }
        recipe.addComment(query, comment, (err, article) => {
            res.json({message:'successfully added comment'})
        })
    }
}

//search for recipes 
exports.searchRecipe = async (req, res) => {
    const name = req.body.name
    const search = await new RegExp(name, 'i')
    if(!name){
        res.status(403).json({
            message:'I cant search for an empty field',
            success: false
        })
    }
    else{
        const result = await recipe.find({name: search})
        if(result == ''){
            res.status(403).json({
                message:`No record found, ${result.length} matches `,
                success: false
            })
        }
        else{
            res.status(200).json({info:result,
                match:`${result.length} matches`,
                success: true
            })
        }
    }
}