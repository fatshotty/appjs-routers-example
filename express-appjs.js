var AppJS = require("./appjs");

var Express = require("express");

var App = Express.createServer();

App.get("/", function(req, res, next){
  res.send(200, "Hello world");
});


AppJS.router.handle = App.handle.bind(App);