var http = require('http');
var express = require('express')
var fs = require('fs')
var path = require('path')

//local variable to store the initialization of the server
var server = null;

//express to serve path
var app = express();

//port where the server is supposed to listen
var PORT = process.env.PORT || 8080;

exports.create = function () {
    server = app.listen(PORT, function () {
        console.log("Listening on " + PORT);
    });
}

exports.launch = function () {
    app.use(express.static(__dirname + '/public'));
    app.use(express.static(__dirname + '/spark/spark_src'));

    app.get("/", function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });

    app.get("/apply", function (req, res) {
        res.sendFile(__dirname + '/public/apply.html');
    });


    app.get(/^(.+)$/, function (req, res) {
        if (req['path'].split('/').length >= 2)
            res.sendFile(__dirname + req.params[0]);
    });
}


exports.getServer = function () {
    return (server);
}
