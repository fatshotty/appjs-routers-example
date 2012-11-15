var AppJS = require("./appjs");

var Express = require("express");

var App = Express.createServer();


App.get("/", function(req, res, next){
  res.render( __dirname + '/content/index.html' );
});


App.get("/test", function(req, res, next){
  res.send(200, "Something else");
});


AppJS.router.handle = function(req){
  // Express needs req.url for handling the route
  req.originalUrl = req.url;
  req.url = req.pathname;

  App.handle.apply(App, arguments);
};