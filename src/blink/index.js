'use strict'

var Gpio = require('onoff').Gpio;
var sleep = require('sleep');

module.exports = function blink(gpio_number, times, delay) {

  // default
  if (typeof delay === 'undefined') {
    delay = 200000;
  }
  if (typeof times === 'undefined') {
    times = 1;
  }

  // check times parameter
  if (delay <= 0) {
    console.error('err: gpio-misc-node: @blink: [delay] > 0');
    return -1;
  }

  // check gpio_number
  if (typeof gpio_number === 'undefined') {
    console.error('err: gpio-misc-node: @blink: specify a gpio number');
    return -1;
  }

  // open gpio connection
  var gpio = new Gpio(gpio_number, 'low');

  // blink
  for (var i = 0; i < times; i++) {
    gpio.writeSync(1);
    sleep.usleep(delay / 2);
    gpio.writeSync(0);
    sleep.usleep(delay / 2);
  }

  // close
  gpio.unexport();

  return 0;
}
