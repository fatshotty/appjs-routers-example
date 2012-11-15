// include Appjs
var AppJS = require('appjs');

// include express 3.0
var Express = require("express");

// get Appjs Request/Response class (we should overwrite their methods)
var AppJSRequest = require('appjs/lib/router/Request');
var AppJSResponse = require('appjs/lib/router/Response');


// create express application
var App = Express();

// set the html render engine (used for rendering html file)
App.engine('html', require('ejs').renderFile);


// Here we are creating a CustomRequest/CustonResponse class
// having Appjs Request/Response methods and Express Request/Response methods
var CustomRequest = {}, CustomResponse = {};

// Note: follow this step in this order
CustomRequest.prototype = AppJSRequest.prototype;
CustomRequest.prototype.__proto__ = App.request.__proto__;
CustomResponse.prototype = AppJSResponse.prototype;
CustomResponse.prototype.__proto__ = App.response.__proto__;


// Overwrite Express Request/Response classes
App.request = CustomRequest.prototype;
App.response = CustomResponse.prototype;

// Force Appjs to use new classes
AppJSRequest.prototype = CustomRequest.prototype;
AppJSResponse.prototype = CustomResponse.prototype;


// Set the router for Appjs. It should use the Express router
AppJS.router.handle = function(req, res, next){
  // In case of error, Express tries to close the socket.
  // So this is a workaround for avoiding errors
  req.socket = {destroy: function(){}};

  // Invoke Express router
  App.handle.apply(App, arguments);
};


// Declaire Express endpoint.
// Note: '/' endpoint should be always declaired
App.get("/", function(req, res, next){
  res.render( __dirname + '/content/index.html' );
});


App.get("/test", function(req, res, next){
  res.send(200, "Something else");
});


// Create Appjs application windows

var Window = AppJS.createWindow({
  width  : 640,
  height : 460,
  icons  : __dirname + '/content/icons'
});

Window.on('create', function(){
  console.log("Window Created");
  Window.frame.show();
  Window.frame.center();
});