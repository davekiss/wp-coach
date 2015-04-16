(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";
var $ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);

$(function() {
    var SectionBox = require('./components/section_box');
});

  
    // slider = new PageSlider($('body')),
    // homeView = new HomeView();

// module.exports = Backbone.Router.extend({

//     routes: {
//         "": "home",
//         "employees/:id": "employeeDetails",
//         "employees/:id/reports": "reports"
//     },

//     home: function () {
//         console.log("home");
// //        homeView.delegateEvents();
//         slider.slidePage(homeView.$el);
//     },

//     employeeDetails: function (id) {
//         console.log("employeeDetails");
//         var employee = new models.Employee({id: id});
//         employee.fetch({
//             success: function (data) {
//                 slider.slidePage(new EmployeeView({model: data}).$el);
//             }
//         });
//     },

//     reports: function (id) {
//         console.log("reports");
//         var employee = new models.Employee({id: id});
//         employee.fetch({
//             success: function (data) {
//                 slider.slidePage(new ReportsView({model: data}).$el);
//             }
//         });
//     }

// });
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./components/section_box":3}],2:[function(require,module,exports){
(function (global){
"use strict";
 
var Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null),
           $ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);
           
Backbone.$ = $;

var Section = require('../models/section_model');

module.exports = Backbone.Collection.extend({
  model: Section
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../models/section_model":5}],3:[function(require,module,exports){
(function (global){
"use strict";
 
var Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null),
    ko       = (typeof window !== "undefined" ? window.ko : typeof global !== "undefined" ? global.ko : null),
    kb       = (typeof window !== "undefined" ? window.kb : typeof global !== "undefined" ? global.kb : null),
           $ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);
           
Backbone.$ = $;

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

    // var section = new Section(data);
    // section.save();
    // course.sections.add(section);

    console.log(course);
    console.log(this.sections);
  }
};
 
ko.applyBindings(view_model, $('#wp-coach-sections .inside')[0]);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../models/course_model":4,"../models/section_model":5}],4:[function(require,module,exports){
(function (global){
"use strict";
 
var Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null),
           $ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);
           
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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../collections/section_collection":2}],5:[function(require,module,exports){
(function (global){
"use strict";
 
var Backbone = (typeof window !== "undefined" ? window.Backbone : typeof global !== "undefined" ? global.Backbone : null),
           $ = (typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null);
           
Backbone.$ = $;
 
module.exports = Backbone.Model.extend({
  url: WP_Coach.ajax_url
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
