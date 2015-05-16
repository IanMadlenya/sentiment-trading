var vertx = require('vertx');
var console = require('vertx/console');
var container = require('vertx/container');
var moment = require('./lib/moment.js');

var eb = vertx.eventBus;
var config = container.config;

console.log('starting time server...');

var period = config.period;

var currentTime = moment();

if (config.mode === 'historic') {
  currentTime = moment(config.startTime);
}

console.log('starting from: '+currentTime+' with period '+period + 'seconds');

var streamTimer = vertx.setPeriodic(period * 1000, function(timerId) {
  currentTime = currentTime.add(period, 's');
  console.log('tick: '+currentTime.toString());
  eb.publish('timer.tick',currentTime.toString());
});
