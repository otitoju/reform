const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/adminconfig')
const admin = require('../models/admin')
const recipe = require('../models/recipe')
const user = require('../models/user')


//CREATE ADMIN SUPERUSER
exports.createSuperUser =async (req, res) => {
    const hashpassword = bcrypt.hashSync(req.body.password,10)
    if(req.body.username == '' || req.body.email == '' || req.body.password == ''){
        res.status(403).json({
            message:'Please fill in all inputs'
        })
    }
    else{
        const Admin = await admin.create({
            username:req.body.username,
            password:hashpassword,
            email:req.body.email
        })
        res.status(200).json({
            message:`registered`,
            Admin:Admin
        })
    }
    
}
//LOGIN SUPERUSER
exports.loginSuperUser = (req, res) => {
    if(!req.body.username || !req.body.password){
        res.json({message:'fill all inputs and login'})
    }
    else{
        admin.findOne({username:req.body.username}, (err, admin) => {
            if (err) {
                res.status(500).json({
                    message:`Problem logging in superuser`
                })
            }
            else if(!admin){
                res.json({message:'Invalid username'})
            }
            else {
                const adminpassword = bcrypt.compareSync(req.body.password, admin.password)
                if (!adminpassword) {
                    res.json({
                        message:`Wrong password`
                    })
                }
                else {
                    const adminToken = jwt.sign({id:admin.id,username:admin.username}, process.env.adminsecret || config.adminsecret, {expiresIn:'5h'})
                    res.json({
                        message:`welcome`,
                        admintoken:adminToken
                    })
    
                }
            }
        })
    }
    
}

exports.getAllAdmin = (req, res) => {
    admin.find({},{password:0}, (err,admin) =>{
        res.json(admin)
    });
    
}
// admin dashboard
exports.getAdminUsername = async (req, res) => {
    
    const token = await req.headers['authorization'].split(" ")[1]
    const decoded = await jwt.verify(token, process.env.adminsecret || config.adminsecret)
    let username = decoded.username
    res.status(200).json({
        username:username
    })
}

//admin control recipe
exports.ctrlRecipe = async(req, res) => {
    const Recipe = await recipe.find().sort({'_id':-1})
    const totalRecipe = await Recipe.length
    const Limit = await user.find().sort({'_id':-1}).limit(4)
    const Users = await user.find().sort({'_id':-1})
    const totalUser = await Users.length
    res.json({message:Recipe,
            total:totalRecipe,
            users:totalUser,
            info:Users,
            limit:Limit
        })
}