"use strict";
var $ = require('jquery');

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