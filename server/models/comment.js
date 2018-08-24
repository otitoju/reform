const mongoose = require('mongoose')
const commentTable = new mongoose.Schema({
    //_id:mongoose.Schema.Types.ObjectId,
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    }
})
module.exports = mongoose.model('comment', commentTable)