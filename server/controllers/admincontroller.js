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
    if(!req.body.username || !req.body.password){
        res.json({message:'fill all inputs and login'})
    }
    else{
        admin.findOne({username:req.body.username}, (err, admin) => {
            if (err) {
                res.status(403).json({
                    message:`Problem loging in superuser`
                })
            }
            else if(!admin){
                res.json({message:'Invalid username'})
            }
            else {
                const adminpassword = bcrypt.compareSync(req.body.password, admin.password)
                if (!adminpassword) {
                    res.json({
                        message:`Wrong password`
                    })
                }
                else {
                    const adminToken = jwt.sign({id:admin.id,username:admin.username}, config.adminsecret, {expiresIn:'5h'})
                    res.json({
                        message:`welcome`,
                        admintoken:adminToken
                    })
    
                }
            }
        })
    }
    
}

exports.getAllAdmin = (req, res) => {
    admin.find({},{password:0}, (err,admin) =>{
        res.json(admin)
    });
    
}
// admin dashboard
exports.getAdminUsername = async (req, res) => {
    
    const token = await req.headers['authorization'].split(" ")[1]
    const decoded = await jwt.verify(token, config.adminsecret)
    let username = decoded.username
    res.status(200).json({
        username:username
    })
}
//upload image
// const storage = multer.diskStorage({
//     destination:'../images/',
//     filename:(req, file, cb)=>{
//         cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
//     }
// })
// const upload = multer({
//     storage:storage,
//     limits:{fileSize:250000},
//     fileFilter:(req, file, cb) => {
//         checkFileType(file, cb)
//     }
// }).single('photo')
// const checkFileType = (file, cb)=>{
//     //file type
//     const fileType = /jpeg|jpg|png/
//     //file extension
//     const extname = fileType.test(path.extname(file.originalname).toLowerCase)
//     //mimetype
//     const mime = fileType.test(file.mimetype)
//     if (mime && extname){
//         return cb(null, true)
//     }
//     else{
//         cb('Error: Images only')
//     }
// }
// exports.uploadImages = (req, res) => {
//     upload(req, res, (err) => {
//         if(err){
//             res.json({
//                 message:err
//             })
//         }
//         else{
//             if(req.file == undefined){
//                 res,json({
//                     message:'Error: No file selected'
//                 })
//             }
//             else{
//                 res.json({
//                     message:'File uploaded',
//                     file:`images/${req.file.filename}`
//                 })
//             }
//         }
//     })
// }