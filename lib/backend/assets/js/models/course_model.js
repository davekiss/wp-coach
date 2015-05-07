"use strict";
 
var Backbone = require('backbone'),
           $ = require('jquery');
           
Backbone.$ = $;
 
var Sections = require('../collections/section_collection');

module.exports = Backbone.Model.extend({
  url: WP_Coach.ajax_url,
  initialize: function() {
    this.set({
      sections: new Sections(this.attributes.sections)
    });
  }
});