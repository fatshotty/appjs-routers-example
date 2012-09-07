module.exports = AppJS = require("appjs");

/**
 * Setup AppJS
 */
var window = AppJS.createWindow({
  width : 640,
  height: 460
});

window.on('create', function(){
  window.frame.show();
  window.frame.center();
});

window.on('ready', function(){
  window.require = require;
  window.process = process;
  window.module = module;
  window.addEventListener('keydown', function(e){
    if (e.keyIdentifier === 'F5') {
      window.frame.openDevTools();
    }
  });
});