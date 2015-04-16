"use strict";
 
var Backbone = require('backbone'),
           $ = require('jquery');
           
Backbone.$ = $;
 
// var Section = require('./section_model');
var Sections = require('../collections/section_collection');

module.exports = Backbone.Model.extend({
  url: WP_Coach.ajax_url,
  initialize: function() {
    this.sections = new Sections;
    this.sections.url = WP_Coach.ajax_url;
    this.sections.data = {course_id: this.id}
  },
});