"use strict";

var Backbone = require('backbone'),
           $ = require('jquery');

Backbone.$ = $;
Backbone.SuperModel = require('backbone.supermodel');


module.exports = Backbone.SuperModel.extend({
  idAttribute: 'ID',
  url: WP_Coach.ajax_url
});