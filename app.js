var express = require('express');
var http = require('http');
var UserRouter = require('./routes/UserController')
var PostRouter = require('./routes/PostController');
var app = express();
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
app.use('/user', UserRouter);
app.use('/post',PostRouter);
app.get('/', function (req, res) {
    res.send('Hello World!')
})