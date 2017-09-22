var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = new mongoose.Schema({
    id : String,
    body : String,
    writer : {
        type : Schema.ObjectId,
        ref : "User"
    }
})
mongoose.model('Comment',PostSchema);
module.exports = mongoose.model('Comment');