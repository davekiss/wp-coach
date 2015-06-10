var rivets = require('rivets');

rivets.formatters['='] = function (value, arg) {
  return value == arg;
}

rivets.formatters['>'] = function (value, arg) {
  return value > arg;
}

rivets.formatters['>='] = function (value, arg) {
  return value >= arg;
}

rivets.formatters['<'] = function (value, arg) {
  return value < arg;
}

rivets.formatters['<='] = function (value, arg) {
  return value <= arg;
}