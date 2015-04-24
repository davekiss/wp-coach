"use strict";

var Backbone = require('backbone'),
    ko       = require('ko'),
    kb       = require('kb'),
           $ = require('jquery');

Backbone.$ = $;

Backbone.emulateJSON = true;

$.ajaxSetup({
  headers: { 'X-WP-Nonce' : WP_Coach.nonce }
});

var Course = require('../models/course_model');
var course = new Course({id: 19418});

course.fetch({
  data: { action: 'wp_coach_api_courses_show', id: course.id }
}).done(function(){
  course.sections.fetch({
    data: { action: 'wp_coach_api_sections_index', course_id: course.id }
  });
});

var Section = require('../models/section_model');

//var sections =

// var Sections = require('../collections/section_collection');
// Sections.fetch();

var view_model = {
  sections: kb.collectionObservable(course.sections, { view_model: kb.ViewModel }),
  addSection: function() {

    // var section = new Section({title: 'Butt'});
    // section.save();
    // course.sections.add(section);
    // or
    return course.sections.create({}, {
      data: {
        action: 'wp_coach_api_sections_create',
        course_id: course.id
      },
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      wait: true
    });
  },
  updateSection: function() {
    return;
  }
};

ko.applyBindings(view_model, $('#wp-coach-sections .inside')[0]);