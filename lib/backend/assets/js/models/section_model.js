"use strict";

var Backbone = require('backbone'),
           _ = require('underscore'),
           $ = require('jquery');

Backbone.$ = $;
Backbone.SuperModel = require('backbone.supermodel');

var Lessons = require('../collections/lesson_collection');

module.exports = Backbone.SuperModel.extend({
  idAttribute: 'ID',
  name: 'section',
  relations: {
    "lessons": Lessons
  },
  url: WP_Coach.ajax_url,
  initialize: function() {
    _.bindAll(this, 'addLesson', 'startEditingTitle', 'stopEditingTitle', 'destroy');

    this.on('add', function(model, options) {
      this.action = 'wp_coach_api_sections_create'
    });

  },

  action: '',

  save: function () {
    var $params = {
      emulateJSON: true,
      data: {
        action  : this.action,
        payload : this.toJSON()
      },
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      wait: false
    };
    return Backbone.sync( 'create', this, $params );
  },

  addLesson: function() {
    return false;
  },

  destroy: function(e, model) {
    Backbone.SuperModel.prototype.destroy.call(this, {
      data: {
        action: 'wp_coach_api_sections_destroy',
        course_id: model.course.get('ID'),
        section_id: this.id
      }
    });
  },

  isEditingTitle: false,
  startEditingTitle: function (e, model) {
    this.isEditingTitle = true;
  },
  stopEditingTitle: function (e, model) {
    if (this.isEditingTitle == false) {
      return;
    }
    this.action = 'wp_coach_api_sections_update';
    this.save();
    this.isEditingTitle = false;
  }
});