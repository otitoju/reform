const Comment = require('../models/comment')
const recipe = require('../models/recipe')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

//create new comment
exports.createNewComment = async(req, res) => {
    const token = await req.headers['authorization'].split(" ")[1];
    const decode = await jwt.verify(token, process.env.secret || config.secret)
    let username = await decode.name
    let userId = await decode.id
    
    recipe.findById(req.params.id, (err, recipe)=> {
        if(err){
            console.log(err)
        }
        else{
            Comment.create({text:req.body.text}, (err, comment)=>{
                if(err){
                    console.log(err)
                }
                else{
                    const comments = recipe.comments
                    comment.author.id = userId
                    comment.author.username = username
                    comment.save()

                    //push comment to recipe model
                    comments.push(comment)
                    recipe.save()

                    res.json({message:`Successfully added comment!`,info:comment})
                }
            })
        }
    })
}
//get new comment
