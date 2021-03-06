var AppJS = require("./appjs");

var Router = require("browserver-router");

var router = Router({
  "/action/:name": {
    GET: function(req, res) {
      res.writeHead(200)
      res.end("Hello, " + req.params[0] + ".")
    },

    DELETE: function(req, res) {
      res.writeHead(200)
      res.end("Goodbye, " + req.params[0] + ".")
    },

    "*": function(req) {
      throw new Error("No such salutation")
    }
  },

  "/": function(req, res) {
    res.writeHead(200)
    res.end("Hello world");
  }
});

AppJS.router.handle = function(req){
  req.originalUrl = req.url;
  req.url = req.pathname;

  console.info("Router with flatiron for: " + req.url);
  router.apply(router, arguments);
};