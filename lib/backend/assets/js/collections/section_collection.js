"use strict";
 
var Backbone = require('backbone'),
           $ = require('jquery');
           
Backbone.$ = $;

var Section = require('../models/section_model');

module.exports = Backbone.Collection.extend({
  model: Section
});