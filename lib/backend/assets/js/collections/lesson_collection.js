"use strict";
 
var Backbone = require('backbone'),
           $ = require('jquery');
           
Backbone.$ = $;

var Lesson = require('../models/lesson_model');

module.exports = Backbone.Collection.extend({
  model: Lesson
});