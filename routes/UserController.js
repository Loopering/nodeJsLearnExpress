var user = require('../models/User');
var db = require('../db');
var bodyParser = require('body-parser');
var UserRouter = require('express').Router();
UserRouter.use(bodyParser.urlencoded({ extended: true }));
UserRouter.get('/', function (req, res) {
    user.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
})
//SignUp
UserRouter.post('/', function (req, res) {
    console.log(req.body)
    user.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
})

//Login

UserRouter.post('/login', function (req, res) {
    console.log(req.body);
    user.find({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send("There was a problem adding the information to the database.");
        var element = user;

        console.log(element);
        if (element) {
            if (element.password == req.password) {
                console.log("User : ", JSON.stringify(element))
                res.status(200).send(JSON.stringify(element));

            }
            else {
                res.status(403).send("Username Or Password Is Invalid !");

            }
        }
        else {
            res.status(404).send("Username Or Password Is Invalid !");

        }
    })
})

//Delete
UserRouter.delete('/', function (req, res) {
    user.remove({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: " + user + " was deleted.");
    });
})
module.exports = UserRouter