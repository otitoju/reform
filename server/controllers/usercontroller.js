const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const user = require('../models/user');
const config = require('../config/config')


exports.admincreateUser = async (req, res) => {
    const body = req.body;
    const hashpassword = bcrypt.hashSync(req.body.password,10);
    if (!body.name && !body.email && !body.password) {
        res.status(403).json({
            message:`Please fill all required input fields`
        })
    }
    else if (body.name.length > 15) {
        res.status(403).json({
            message:`name must not be more than 15 characters`
        })
    }
    else if (body.password.length < 8) {
        res.status(403).json({
            message:`Password must be more than 7`
        })
    }
    else {
        const User = await user.create({
            name:body.name,
            email:body.email,
            password:hashpassword,
            date:body.date
        })
        res.json({
            message:`Registration successful`,
            user:User
        })
    }
}
//get single user from the database
exports.getSingleUser = async (req, res) => {
    const singleUser = await user.findById(req.params.id)
    res.json({
        message:`All userrs are: `,
        user:singleUser
    })
}
//update user profile
exports.updateUserProfile = async (req, res) => {
    const updateUser = await user.findByIdAndUpdate(req.params.id, (user) => {
        if(!user){
            res.json(`No user provided`)
        }
        else{
            res.json(updateUser)
        }
    })
}
//get all users
exports.getAllUser =  async (req, res) => {
    const allUser = await user.find()
    res.json(allUser)
}
//delete users
exports.deleteUser = async (req, res) => {
    const removeUser = await user.findByIdAndRemove(req.params.id)
    res.json({
        message:`you successfully deleted ${removeUser}`
    })
}
//user login
exports.userLogin = (req, res) => {
    user.findOne({email:req.body.email}, (err, user) => {
        if (err){
            res.json('Unable to login')
        }
        else if(!user.email){
            res.json(`No user with such email`)
        }
        else{
            isUserPassword = bcrypt.compareSync(req.body.password, user.password)
            if(!isUserPassword) {
                res.json('Invalid or wrong password')
            }
            else{
                const token = jwt.sign({id:user.id,email:user.email,password:user.password}, config.secret, {expiresIn:'2h'})
                res.json({
                    message:`Login successful`,
                    token:token
                })
            }
        }
    })
}