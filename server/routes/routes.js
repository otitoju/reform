const express = require('express')
const router = express.Router()
const usercontroller = require('../controllers/usercontroller')
const authcontroller = require('../controllers/authcontroller')
const verifyToken = require('../controllers/verifyToken')
const admin = require('../controllers/admincontroller')
const adminVerify = require('../controllers/adminverify')
const recipecontroller = require('../controllers/recipecontroller')
const { catchErrors } = require('../handlers/errorhandler')

const user = require('../models/user')
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
const multer = require('multer')
const path = require('path')
const pic = require('../models/pics')

router.get('/log', usercontroller.Login)
//router.get('/reg/:token',verifyToken, usercontroller.registerUser)
//router.get('/postrecipe', recipecontroller.create)

//USER ROUTES
router.post('/reg', usercontroller.admincreateUser)
router.get('/user/get/:id', usercontroller.getSingleUser)
router.put('/update/:id', usercontroller.updateUserProfile)
router.get('/user', usercontroller.getAllUser)
router.delete('/user/:id', usercontroller.deleteUser)
router.post('/login', usercontroller.userLogin)
router.put('/change', usercontroller.changePassword)
router.get('/userprofile', usercontroller.userProfile)
//Admin routes
router.post('/createsuperuser',  admin.createSuperUser)
router.post('/admin', admin.loginSuperUser)
router.get('/admin', admin.getAllAdmin)
router.get('/adminusername', admin.getAdminUsername)
router.get('/ctrlrecipe', admin.ctrlRecipe)

//Recipe routes
router.post('/recipe', adminVerify, recipecontroller.createRecipe)
router.get('/recipe/get', recipecontroller.getAllRecipe)
router.get('/recipe/get/:id', recipecontroller.getSingleRecipe)
router.put('/recipe/update/:id', recipecontroller.updateRecipe)
router.delete('/recipe/delete/:id', recipecontroller.deleteRecipe)
router.get('/search', recipecontroller.fuzzySearch )
router.post('/comment', recipecontroller.createNewComment)

//Auth routes
router.put('/reset/:email', authcontroller.resetPassword)
router.post('/forgot', authcontroller.forgotPassword)
router.post('/report', authcontroller.reportIssues)
router.post('/register', authcontroller.register)
router.get('/decode', authcontroller.getToken)





//Using cloudinary
const storage = multer.diskStorage({
    filename:function(req, file, cb){
        cb(null, Date.now()+file.originalname)
    }
})
const imageFilter = function(req, file, cb){
    if(!file.originalname.match(/\.(jpeg|jpg|png)$/i)){
        return cb(new Error('Only image files are allowed'), false)
    }
    else{
        cb(null,true)
    }
}
var upload = multer({
    storage:storage,
    fileFilter:imageFilter
})
var config = require('./config')
var cloudinary = require('cloudinary')
// cloudinary.config({
//     cloud_name: config.cloud_name,
//     api_key : config.api_key,
//     api_secret : config.api_secret
// })
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key : process.env.api_key,
    api_secret : process.env.api_secret
})
router.put('/img/:id', upload.single('pic'), async(req, res) => {
    var image = req.file.path
    const result = await cloudinary.uploader.upload(image)
    const img =  result.original_filename
    let imgUrl = result.secure_url
    let publicId = result.public_id
    const User = await user.findByIdAndUpdate(req.params.id,{
        //test:req.body.test,
        pic:imgUrl
    }, {new:true})
    //console.log(img)
    res.json({
        user:User,
        //imgUrl:imgUrl
    })
})
const env = require('dotenv').config()
//get all pic
router.get('/imga', async(req, res)=> {
    const result = await pic.find()
    res.json({
        image:result
    })

})
// Recipe image
const recipee = require('../models/recipe')
router.put('/recipeimage/:id', upload.single('photo'), async(req, res) => {
    var image = req.file.path
    if(!image){
        res.json({message:`Error: No file selected`})
    }
    else{
        const result = await cloudinary.uploader.upload(image)
        const img =  result.original_filename
        let imgUrl = result.secure_url
        let publicId = result.public_id
        const Recipe = await recipee.findByIdAndUpdate(req.params.id,{
            photo:imgUrl
        }, {new:true})
        res.json({
            recipe:Recipe,
            message:'Message: Picture uploaded successfully'
        })
    }
    
})

module.exports = router