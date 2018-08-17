const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const user = require('../models/user');
const config = require('../config/config')
const admin = require('../models/admin')
const adminConfig = require('../config/adminconfig')
//const gib = require('../gib')

//const userExist = user.email



exports.admincreateUser = async (req, res) => {
    const body = req.body;
    const hashpassword = bcrypt.hashSync(req.body.password,10);

    if (!body.name || !body.email || !body.password) {
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
            secret:body.secret,
            //pic:imgUrl
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
        message:`All users are: `,
        user:singleUser
    })
}
//update user profile
exports.updateUserProfile = async (req, res) => {
    //const token = await req.headers['authorization'].split(" ")[1]
    //const decode = await jwt.verify(token, config.secret)
    //const update = await user.findByIdAndUpdate(req.params.id, req.body, {new:true})
    // let id = decode.id
    // let name = decode.name
    // let email = decode.email
    // res.status(200).json({
    //     message:'updated',
    //     id:id
    // })
    //console.log('hello')

    user.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        if (err) {
            res.status(500).send("There was a problem updating the user.");
        }
        else {
            res.status(200).send({
                message:'Updated',
               // user:user
            });
        }
        
    })  
}
//get all users
exports.getAllUser =  async (req, res) => {
    const allUser = await user.find()
    const token = await req.headers['authorization'].split(" ")[1]
    const decode = await jwt.verify(token, adminConfig.adminsecret)
    let name = decode.name
    let id = decode.id
    let email = decode.email
    res.json({
        allUser:allUser,
        id:id,
        name:name,
        email:email
    })
}

// user profile
exports.userProfile =  async (req, res) => {
    const User = await user.find()
    const token = await req.headers['authorization'].split(" ")[1]
    //const decode = await jwt.verify(token, config.secret)
    const decode = await jwt.verify(token, process.env.secret || config.secret)
    let name = decode.name
    let id = decode.id
    let email = decode.email
    let pic = decode.pic
    res.json({
        User:User,
        id:id,
        name:name,
        email:email,
        pic:pic
    })
}
//delete users
exports.deleteUser = async (req, res) => {
    const removeUser = await user.findByIdAndRemove(req.params.id)
    res.json({
        message:`you successfully deleted ${removeUser}`
    })
}
exports.Login = (req, res) =>{
    res.render('../../views/pages/login')
}
//user login
exports.userLogin = (req, res) => {
    if(!req.body.email || !req.body.password){
        res.status(403).json({
            message:'please fill all required fields'
        })
    }
    else{
        user.findOne({email:req.body.email}, (err, user) => {
            if (err){
                res.status(500).json({
                    message:'Unable to login'
                })
            }
            else if(!user){
                res.status(401).json({
                    message:`No user with such email`
                })
            }
            else{
                isUserPassword = bcrypt.compareSync(req.body.password, user.password)
                if(!isUserPassword) {
                    res.status(401).json({
                        message:'Invalid or wrong password'
                    })
                }
                else{
                    var token = jwt.sign({id:user.id,email:user.email,name:user.name,pic:user.pic}, config.secret, {expiresIn:'2h'})
                    var id = user.id
                     
                    res.status(200).json({
                        message:'Login successful',
                        token:token,
                        id:id
                    })
                }
            }
        })
    }
   
}
exports.changePassword = (req, res) => {
    const hashpassword = bcrypt.hashSync(req.body.newpassword,10)
    user.findByIdAndUpdate(req.params.id, req.body.newpassword, {new:true}, (err, user) =>{
        if(!user){
            res.status(403).json('Invalid user')
        }
        else{
            if(req.body.oldpassword === user.password && req.body.newpassword === req.body.confirm){
                user.password = hashpassword
                user.save()
                res.status(200).json({
                    message:'Password changed',
                    user:user
                })
            }
            else{
                res.status(401).json('Please make sure that old password is correct and new password correspond with confirm password')
            }

        }
    })
}