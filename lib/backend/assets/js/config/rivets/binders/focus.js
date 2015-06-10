"use strict";

var rivets = require('rivets'),
         $ = require('jquery');

rivets.binders['focus'] = function(el, value) {
  if (value && $(el).is(":visible")) {
    $(el).focus();
  }
};