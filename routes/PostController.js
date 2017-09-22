var post = require('../models/Post.js');
var db = require('../db.js');
var user = require('../models/User');

var bodyParser = require('body-parser');
var PostRouter = require('express').Router();

PostRouter.use(bodyParser.urlencoded({ extended: true }));


PostRouter.get('/', function (req, res) {
    post.find( {},function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
})
PostRouter.get('/:email', function (req, res) {
    console.log("Email : ",req.params.email);
    user.find({email : req.params.email},function(err,user){
        if (err) return res.status(500).send("There was a problem");
        res.status(200).send(user);
        post.find({owner : user[0]._id},function(err,posts){
            if (err) return res.status(500).send("There was a problem finding the users.");
            res.status(200).send(posts);
        }) 
    })
    post.find( {},function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
})

PostRouter.post('/', function (req, res) {
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
module.exports = PostRouter
