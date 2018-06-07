const jwt = require('jsonwebtoken')
const config = require('../config/config')
const user = require('../models/user')
//const admin = require('../models/admin')

const verifyToken = async (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token) {
        res.json({
            message:`No token provided`,
            auth:false,
            token:null
        })
    }
    else {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                res.json({
                    message:`Error authenticating token`,
                    auth:false,
                    token:false
                })
            }
            else {
                if (req.user = decoded ){
                    next();
                }
                
                else{
                    res.json(`you are not a user`)
                } 
            }
        })
    }
}
module.exports = verifyToken;
