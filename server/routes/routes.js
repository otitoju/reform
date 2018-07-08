const express = require('express')
const router = express.Router()
const usercontroller = require('../controllers/usercontroller')
const authcontroller = require('../controllers/authcontroller')
const verifyToken = require('../controllers/verifyToken')
const admin = require('../controllers/admincontroller')
const adminVerify = require('../controllers/adminverify')
const recipecontroller = require('../controllers/recipecontroller')

router.get('/log', usercontroller.Login)
router.get('/reg/:token',verifyToken, usercontroller.registerUser)
router.get('/postrecipe', recipecontroller.create)

//USER ROUTES
router.post('/reg', usercontroller.admincreateUser)
router.get('/user/get/:id', usercontroller.getSingleUser)
router.put('/update/:id', usercontroller.updateUserProfile)
router.get('/user', usercontroller.getAllUser)
router.delete('/user/:id', usercontroller.deleteUser)
router.post('/login', usercontroller.userLogin)
router.put('/change', usercontroller.changePassword)
//Admin routes
router.post('/createsuperuser',  admin.createSuperUser)
router.post('/admin', admin.loginSuperUser)
router.get('/admin', admin.getAllAdmin)

//Recipe routes
router.post('/recipe', recipecontroller.createRecipe)
router.get('/recipe/get',adminVerify, recipecontroller.getAllRecipe)
router.get('/recipe/get/:id', adminVerify, recipecontroller.getSingleRecipe)
router.put('/recipe/update/:id', recipecontroller.updateRecipe)
router.delete('/recipe/delete/:id', recipecontroller.deleteRecipe)

//Auth routes
router.put('/reset/:email', authcontroller.resetPassword)
router.post('/forgot', authcontroller.forgotPassword)
router.post('/report', authcontroller.reportIssues)
router.post('/register', authcontroller.register)

module.exports = router