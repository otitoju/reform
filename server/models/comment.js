const mongoose = require('mongoose')
const commentTable = new mongoose.Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    name:String,
    comment:String
})
module.exports = mongoose.model('comment', commentTable)