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
var course = new Course( WP_Coach.courses[0] );

// course.fetch({
//   data: { action: 'wp_coach_api_courses_show', id: course.id }
// }).done(function(){
//   course.sections.fetch({
//     data: { action: 'wp_coach_api_sections_index', course_id: course.id }
//   });
// });

// var Sections = require('../collections/section_collection');
// Sections.fetch(); 


var LessonViewModel = function(model) {
  console.log('lesson model::!:', model);
  this.post_title = kb.observable(model, 'post_title');
  this.type = ko.observable('lesson');
};
 
var SectionViewModel = kb.ViewModel.extend({
  constructor: function(model, options) {
    kb.ViewModel.prototype.constructor.apply(this, arguments);
    this.type = ko.observable('section');
  }
});

var view_model = {
  sections: kb.collectionObservable( course.get('sections'), {
    factories: {
      'models': SectionViewModel,
      'models.lessons.models': LessonViewModel
    }    
  }),
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