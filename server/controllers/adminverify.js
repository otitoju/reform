const jwt = require('jsonwebtoken')
const config = require('../config/adminconfig')
const admin = require('../models/admin')

//ADMIN AUTHENICATION
const adminVerify = (req, res, next) => {
    const token = req.headers['x-access-token']
    if (!token){
        res.json(`No token provided`)
    }
    else{
        jwt.verify(token, config.adminsecret, (err, isAdminToken) =>{
            if (err) {
                res.status(403).json(`Authentication Error`)
            }
            else {
                req.admin = isAdminToken
                next()
            
            }
        })
    }
}
module.exports = adminVerify;