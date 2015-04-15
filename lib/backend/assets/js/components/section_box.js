"use strict";
 
var Backbone = require('backbone'),
    ko       = require('ko'),
    kb       = require('kb'),
           $ = require('jquery');
           
Backbone.$ = $;

$.ajaxSetup({
  headers: { 'X-WP-Nonce' : WP_Coach.nonce }
});

var Course = require('../models/course_model');
var course = new Course({id: 19418});

course.fetch().done(function(){
  course.sections.fetch();
});

var Section = require('../models/section_model');

//var sections = 

// var Sections = require('../collections/section_collection');
// Sections.fetch();
 
var view_model = {
  sections: kb.collectionObservable(course.sections, { view_model: kb.ViewModel }),
  addSection: function() {

    // var section = new Section(data);
    // section.save();
    // course.sections.add(section);

    console.log(course);
    console.log(this.sections);
  }
};
 
ko.applyBindings(view_model, $('#wp-coach-sections .inside')[0]);