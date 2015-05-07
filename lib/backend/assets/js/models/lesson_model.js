"use strict";
 
var Backbone = require('backbone'),
           $ = require('jquery');
           
Backbone.$ = $;
 
module.exports = Backbone.Model.extend({
  url: WP_Coach.ajax_url
});