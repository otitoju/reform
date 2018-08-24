const Comment = require('../models/comment')
const recipe = require('../models/recipe')

//create new comment
exports.createNewComment = (req, res) => {
    
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
                    comment.author.id = req.user._id
                    comment.author.username = req.user.name
                    comment.save()

                    //push comment to recipe model
                    recipe.comments.push(comment)
                    recipe.save()

                    res.json({message:`Successfully added comment!`})
                }
            })
        }
    })
}
