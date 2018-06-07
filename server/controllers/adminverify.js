const jwt = require('jsonwebtoken')
const config = require('../config/config')
const admin = require('../models/admin')

//ADMIN AUTHENICATION
const adminVerify = (req, res, next) => {
    const token = req.headers['x-access-token']
    if (!token){
        res.json(`No token provided`)
    }
    else{
        jwt.verify(token, config.secret, (err, isAdminToken) =>{
            if (err) {
                res.json(`Unable to verify token`)
            }
            else {
                if (req.admin = isAdminToken){
                    next()
                }
                else {
                    req.admin = !isAdminToken
                    res.json(`Not an admin`)
                     
                }
            
            }
        })
    }
}
module.exports = adminVerify;