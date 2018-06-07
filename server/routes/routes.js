const express = require('express')
const router = express.Router()
const usercontroller = require('../controllers/usercontroller')
const authcontroller = require('../controllers/authcontroller')
const verifyToken = require('../controllers/verifyToken')
const admin = require('../controllers/admincontroller')
const adminVerify = require('../controllers/adminverify')
const recipecontroller = require('../controllers/recipecontroller')

//USER ROUTES
router.post('/user', usercontroller.admincreateUser)
router.get('/user/get/:id', usercontroller.getSingleUser)
router.put('/user/update/:id', usercontroller.updateUserProfile)
router.get('/user', usercontroller.getAllUser)
router.delete('/user/:id', verifyToken, usercontroller.deleteUser)
router.post('/login', usercontroller.userLogin)

//Admin routes
router.post('/createsuperuser',  admin.createSuperUser)
router.post('/admin', admin.loginSuperUser)

//Recipe routes
router.post('/recipe', recipecontroller.createRecipe)
router.get('/recipe/get',adminVerify, recipecontroller.getAllRecipe)
router.get('/recipe/get/:id', adminVerify, recipecontroller.getSingleRecipe)
router.put('/recipe/update/:id', recipecontroller.updateRecipe)
router.delete('/recipe/delete/:id', recipecontroller.deleteRecipe)

module.exports = router