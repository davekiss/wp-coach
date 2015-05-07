"use strict";
 
var Backbone = require('backbone'),
           $ = require('jquery');
           
Backbone.$ = $;

var Lessons = require('../collections/lesson_collection');
 
module.exports = Backbone.Model.extend({
  url: WP_Coach.ajax_url,
  initialize: function() {
    this.set({
      lessons: new Lessons([{post_title: 'Lesson A'}])
    });
  }
});