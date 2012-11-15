var AppJS = require("./appjs");

var flatiron = require('flatiron');
var app = flatiron.app;

app.use(flatiron.plugins.http);

app.router.get('/', function () {
  this.res.writeHead(200, { 'Content-Type': 'text/plain' });
  this.res.end('Hello world!\n');
});



AppJS.router.handle = function(req){
  req.originalUrl = req.url;
  req.url = req.pathname;

  console.info("Router with flatiron for: " + req.url);
  app.router.dispatch.apply(app.router, arguments);
};
