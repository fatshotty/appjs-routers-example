var AppJS = require("./appjs");

// we should disable log in order to avoid error (see below)
var Router = require('node-simple-router')({logging: false});


Router.get("/", function(req, res){
  res.end('Hello world<br/><a href="/test">Another link</a>');
});

Router.get("/test", function(req, res){
  res.end('Somenthing else');
});


AppJS.router.handle = function(req){
  // Router tries to log the remote address of the machine.
  // In this way it will log always 'undefined'
  // However, we can disable log in order to avoid errors
  //
  // req.client = {};  # Uncomment this line if log is enabled

  Router.apply(Router, arguments);
};