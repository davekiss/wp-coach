"use strict";

var Backbone = require('backbone'),
           _ = require('underscore'),
           $ = require('jquery');

Backbone.$ = $;
Backbone.SuperModel = require('backbone.supermodel');

var Sections = require('../collections/section_collection');

module.exports = Backbone.SuperModel.extend({
  idAttribute: 'ID',
  name: 'course',
  relations: {
    'sections': Sections
  },
  url: WP_Coach.ajax_url,
  initialize: function () {
    _.bindAll(this, 'addSection');
  },
  addSection: function (e, model) {
    e.preventDefault();
    var sections = this.get('sections');
    var section = sections.create({
      "course_id"  : this.id,
      "post_status": "draft",
      "post_title" : "New Section Title"
    });
    section.startEditingTitle();
  }
});