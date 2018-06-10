const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const user = require('../models/user')
const config = require('../config/config')
const async = require('async')


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
exports.getToken = (req, res) => {
    //const token = req.headers.authorization
    const token = req.headers['x-access-token']
    if (!token) {
        res.json(`No user with such token`)
    }
    else{
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.json(`Verification failed`)
            }
            else{
                user.findById(decoded.id, {password:0}, (err, user) => {
                    if (!user){
                        res.json(`No user found`)
                    }
                    else{
                        res.json({
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
               const token = jwt.sign({id:user.id,email:user.email,password:user.password},  confiq.secret, {expiresIn:'1h'}
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
            pass:process.env.GMAILPASS
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
            res.json(`Mail not sent`)
        }
        else{
            console.log("Mail sent")
            res.json('Mail sent')
        }
    })
}
//FORGOT PASSWORD
exports.forgotPassword = (req, res, next) => {
    user.findOne({email:req.body.email}, (err, user) => {
        if (err) {
            res.json('Error finding user email')
        }
        else if (!user) {
            res.json('No user with such email')
        }
        else {
            crypto.randomBytes(20, (err, buffer) => {
                const token = buffer.toString('hex')
                user.resettoken = token
                user.save()
                
            })
            const token = user.resettoken
            var transport = nodemailer.createTransport({
                service:'Gmail',
                auth:{
                    user:'otitojuoluwapelumi@gmail.com',
                    pass:process.env.GMAILPASS
                }
            })
            var mailOptions = {
                from:'otitojuoluwapelumi@gmail.com',
                to:req.body.email,
                subject:'Password recovery team',
                html:'<p>You have requested for password reset, please follow this link '+'http://'+req.headers.host+'/reset/'+token +'</p>'
            }
            transport.sendMail(mailOptions, (err) =>{
                if (err){
                    console.log('mail not sent')
                    res.json('mail not sent')
                }
                else{
                    console.log('mail sent')
                    res.json('mail sent successfully')
                }
            })
        }
    })
}

exports.resetPassword = (req, res, next) =>{
    //const hashpassword = bcrypt.hashSync(req.body.password,10)
    user.findOne({resettoken:req.params.token}, (err, user) =>{
        if (err) {
            res.json('no user with such token')
        }
        else{
            if (req.body.password) {
                user.setPassword(req.body.password)
                
                user.save()
                user.resettoken = undefined
                res.json('changed')
            }
        }
    })
    
}