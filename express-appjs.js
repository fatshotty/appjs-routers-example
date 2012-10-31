var AppJS = require("./appjs");

var Express = require("express");

var App = Express.createServer();


App.get("/", function(req, res, next){
  res.send(200, '<a href="/test">Hello World</a>');
});


App.get("/test", function(req, res, next){
  res.send(200, "Something else");
});


AppJS.router.handle = App.handle.bind(App);