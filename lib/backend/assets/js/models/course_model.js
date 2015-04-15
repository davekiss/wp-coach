"use strict";
 
var Backbone = require('backbone'),
           $ = require('jquery');
           
Backbone.$ = $;
 
// var Section = require('./section_model');
var Sections = require('../collections/section_collection');

module.exports = Backbone.Model.extend({
  urlRoot: '/wp-json/wp-coach/courses',
  initialize: function() {
    this.sections = new Sections;
    this.sections.url = '/wp-json/wp-coach/courses/' + this.id + '/sections';
  },
});