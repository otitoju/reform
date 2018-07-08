const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/adminconfig')
const admin = require('../models/admin')


//CREATE ADMIN SUPERUSER
exports.createSuperUser =async (req, res) => {
    const hashpassword = bcrypt.hashSync(req.body.password,10)
    const Admin = await admin.create({
        username:req.body.username,
        password:hashpassword,
        email:req.body.email
    })
    res.status(200).json({
        message:`${req.body.username} is now an admin`,
        Admin:Admin
    })
    
}
//LOGIN SUPERUSER
exports.loginSuperUser = (req, res) => {
    admin.findOne({username:req.body.username}, (err, admin) => {
        if (err) {
            res.status(403).json(`Problem creating superuser`)
        }
        else {
            const adminpassword = bcrypt.compareSync(req.body.password, admin.password)
            if (!adminpassword) {
                res.json(`You are not an admin`)
            }
            else {
                const token = jwt.sign({id:admin.id,username:admin.username, password:admin.password}, config.adminsecret, {expiresIn:86400})
                res.json({
                    message:`Welcome admin ${req.body.username}`,
                    token:token
                })
                //req.redirect('/')

            }
        }
    })
}

exports.getAllAdmin = (req, res) => {
    admin.find({},{password:0}, (err,admin) =>{
        res.json(admin)
    });
    
}

