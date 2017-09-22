var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostSchema = new mongoose.Schema({
    id : String,
    title: String,
    body : String,
    owner : {
        type : Schema.ObjectId,
        ref : "User"
    },
    comment : {
        type : [Schema.ObjectId],
        ref : "Comment"
    }
})
mongoose.model('Post',PostSchema);
module.exports = mongoose.model('Post');