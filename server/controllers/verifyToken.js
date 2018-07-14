const jwt = require('jsonwebtoken')
const config = require('../config/config')
const user = require('../models/user')
//const admin = require('../models/admin')

const verifyToken =  (req, res, next) => {
    //const token = req.headers['x-access-token']
    let token = req.headers['authorization'].split(" ")[1];
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
                    message:`Authentication Error or token expired, please try again`,
                    auth:false,
                    token:false
                })
            }
            else {
                req.user = decoded
                    next();
                
            }
        })
    }
}
module.exports = verifyToken;
