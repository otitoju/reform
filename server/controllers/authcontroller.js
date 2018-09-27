const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const user = require('../models/user')
const config = require('../config/config')
const async = require('async')
const passportLocalMongoose = require('passport-local-mongoose');



exports.register = (req, res, next) => {
    const hashpassword = bcrypt.hashSync(req.body.password,10)
    user.find({email:req.body.email})
    .then(User =>{
        if(User.length >= 1){
            res.json('mail exist')
        }
        else{
            const User = new user({
                name:req.body.name,
                email:req.body.email,
                password:hashpassword,
                date:req.body.date
            })
            User.save()
            .then(newUser =>{
                res.json({
                    message:'Registration successful',
                    user:User
                })
            })
        }
    })
    }
    


//get user data from token
exports.getToken = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token){
      res.json({
        message:`No token provided`,
        token:null
      })
    }
    else { //VERIFY TOKEN AND RETURN USER WITH THE TOKEN
            await jwt.verify(token, config.secret, (err, decoded) => {
              if (err) {
                res.json({
                  message:`Authenication failed`,
                  token:null
                })
              }
              else {
                  user.findById(decoded.id, {password:0}, (err, user) => {
                      if (err) {
                        res.json({
                          message:`Error decoding token`,
                          auth:false,
                          token:null
                        })
                      }
                      else if (!user) {
                        res.json({
                          message:`No user found`
                        })
                      }
                      else {
                        res.json({
                          message:`Decoding successful`,
                          auth:true,
                          user:user
                        })
                      }
                })
              }
            })
          }
      
  }
//login
exports.loginUser = (req, res) => {
    user.findOne({email:req.body.email}, (err, user) => {
        if(!user) {
            res.json(`no user`)
        }
        else{
            const passwordIsValid = bcrypt.compareSync(req.body.password,user.password)
            if (!passwordIsValid){
                res.json(`incorrect password`)
            }
            else{
               const token = jwt.sign({id:user.id,email:user.email,password:user.password}, process.env.secret || confiq.secret, {expiresIn:'1h'}
            )
            res.json({
                message:`login`,
                token:token
            })
            }
        }
    })
}
//REPORT ISSUES
exports.reportIssues = (req, res) => {
    const transport = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:'otitojuoluwapelumi@gmail.com',
            pass:''
        }
    })
    const mailOptions = {
        from:req.body.email,
        to:'otitojuoluwapelumi@gmail.com',
        subject:'Food recipe report team',
        html:'<p>You have recieved a submission from: <ul><li>'+req.body.name+'</li><li>'+req.body.email+'</li><li>'+req.body.message+'</li></ul>'
    }
    transport.sendMail(mailOptions, (err) =>{
        if(err){
            console.log('mail not sent')
            res.status(403).json({
                message:`Mail sending failed, please try again later`
            })
        }
        else{
            console.log("Mail sent")
            res.status(200).json({
                message:`Mail sent successfully`
            })
        }
    })
}

//FORGOT PASSWORD link
exports.forgotPassword = (req, res) => {
    if(!req.body.email || !req.body.secret){
        res.status(401).json({
            message:'Please fill in all fields'
        })
    }
    else{
        user.findOne({email:req.body.email}, (err, user) => {
            if (!user) {
                res.status(401).json({
                    message:'No user with such email'
                })
            }
            else {
                if (req.body.secret === user.secret) {
                    user.resetexpires = Date.now() + 3600000 //1h 
                    user.save()
                    var transport = nodemailer.createTransport({
                        service:'Gmail',
                        auth:{
                            user:'otitojuoluwapelumi@gmail.com',
                            pass:'sci15csc067@'
                        }
                    })
                    var mailOptions = {
                        from:'otitojuoluwapelumi@gmail.com',
                        to:req.body.email,
                        subject:'Password Recovery',
                        html:'<p>You requested for reset password and it will expire in 1hour time, please follow this link to reset your password https://nice-recipe.herokuapp.com'+'/reset/'+req.body.email+'</p>'
                    }
                    transport.sendMail(mailOptions, (err) => {
                        if (err) {
                            res.status(403).json({
                                message:'Request failed, please check your network settings and try again'
                            })
                        }
                        else{
                            res.status(200).json({
                                message:'A message has been sent to your email '
                            })
                        }
                        
                    })
                }
                else {
                    res.status(401).json({
                        message:'Incorrect information'
                    })
                }
            }
        })
    }
    
}

//RESET PASSWORD
exports.resetPassword = (req, res) => {
    const hashpassword = bcrypt.hashSync(req.body.password,10)
    if(!req.body.password || !req.body.confirm || !req.body.secret){
        res.status(403).json({message:`Error: Empty field`})
    }
    else{
        user.findOne({email:req.params.email, resetexpires:{$gt:Date.now()}}, req.body, {new: true}, (err, user) => {
            if (!user){
                res.status(401).json({
                    message:'Invalid email address or email session has expired, please check and try again'
                })
            }
            else {
                if(req.body.password === req.body.confirm && user.secret === req.body.secret){
                    user.password = hashpassword;
                    user.save()
                var transport = nodemailer.createTransport({
                    service:'Gmail',
                    auth:{
                        user:'otitojuoluwapelumi@gmail.com',
                        pass:'sci15csc067@'
                    }
                })
                var mailOptions = {
                    from:'otitojuoluwapelumi@gmail.com',
                    to:user.email,
                    subject:'Password reset',
                    html:'<p>Your password has been change to '+req.body.password
                }
                
                }
                else{
                    res.json({
                        message:'passwords do not match'
                    })
                }
                
            }
        } )
    }
}
exports.pagenotfound = (req, res)=>{
    res.json({message:`page not found`})
}