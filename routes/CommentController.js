var post = require('../models/Post.js');
var db = require('../db.js');
var user = require('../models/User');
var comment = require('../models/Comment')
var bodyParser = require('body-parser');
var CommentRouter = require('express').Router();

CommentRouter.use(bodyParser.urlencoded({ extended: true }));


CommentRouter.get('/', function (req, res) {
    post.find( {},function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
})
CommentRouter.post('/', function (req, res) {
    user.find({email : req.body.email}, '_id', function (err, user) {
        console.log(user)
        if (err) return res.status(500).send("There was a problem");
        post.create({
            title: req.body.title,
            body: req.body.body,
            owner: user[0]._id
        }, function (err, post) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(post);
        })
    })
})
module.exports = CommentRouter
