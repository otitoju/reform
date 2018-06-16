const bodyParser = require('body-parser')
const recipe = require('../models/recipe')

exports.create = (req, res) => {
    res.render('../../views/pages/createrecipe')
}
exports.createRecipe = async (req, res) => {
    if (req.body === ''){
        res.json(`Please create recipes`)
    }
    else{
        const Recipe = await recipe.create(req.body)
        res.status(200).json(Recipe)
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