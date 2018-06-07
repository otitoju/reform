const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const user = require('../models/user')
const config = require('../config/config')


exports.register = async (req, res) => {
const hashpassword = bcrypt.hashSync(req.body.password,10);
const body = req.body;
const User = await user.create({
    name:body.name, 
    email:body.email,
    password:hashpassword,
    date:body.date
})
if (!body.name && !body.email && !body.password && !body.date){
    res.json(`fill all fields`)
}
else{
    res.json({
        message:`registered`,
        user:User
    })
}
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