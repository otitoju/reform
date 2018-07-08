const bodyParser = require('body-parser')
const recipe = require('../models/recipe')

exports.create = (req, res) => {
    res.render('../../views/pages/createrecipe')
}
exports.createRecipe = async (req, res) => {
    if (req.body.name == '' || req.body.ingredients =='' || req.body.procedure ==''){
        res.json({
            message:`Please create recipes`
        })
    }
    else{
        const Recipe = await recipe.create({
            name:req.body.name,
            ingredients:req.body.ingredients,
            procedure:req.body.procedure
        })
        res.status(200).json({
            message:'Recipe created'
        })
    }

}
// get all recipe
exports.getAllRecipe = async (req, res, next) => {
    const allRecipe = await recipe.find()
    res.json(allRecipe)
}
//get single recipe
exports.getSingleRecipe = async (req, res) => {
    const singleRecipe = await recipe.findById(req.params.id)
    res.json(singleRecipe)
}
//update recipe
exports.updateRecipe = async (req, res) => {
    const update = await recipe.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.json(update)
}
//delete recipe
exports.deleteRecipe = async (req, res) => {
    const removeRecipe = await recipe.findByIdAndRemove(req.params.id)
    res.json(removeRecipe)
}