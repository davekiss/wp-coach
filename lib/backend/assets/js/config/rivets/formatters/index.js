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

rivets.formatters['fa_post_status'] = function (value, arg) {
  var font_awesome = {
    "draft"    : "fa-circle-o",
    "protected": "fa-dot-circle-o",
    "published": "fa-check-circle-o"
  }

  return font_awesome[value];
}