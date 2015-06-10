"use strict";

var Backbone      = require('backbone'),
    rivets        = require('rivets'),
    $             = require('jquery'),
    magnificPopup = require('magnific-popup'),
    Tether        = require('tether'),
    Drop          = require('tether-drop'),
    Tooltip       = require('tether-tooltip');

require('../config/index');

$('#wp-coach-event-capture').on('bind:beginning bind:complete unbind:beginning unbind:complete routine:beginning routine:complete update:beginning update:complete', function(event) {
  Tooltip.init();

  $('.wp-coach-add-lesson').each(function(i, el){
    $(el).magnificPopup({
      type:'iframe',
      items: {
        src: $(el).data('edit-lesson-url')
      },
      midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });
  });
});

var Course = require('../models/course_model');
var course = new Course( WP_Coach.courses[0] );

var sections = course.get('sections');

rivets.bind($('#wp-coach-sections .inside'), {
  'course': course,
  'sections': sections
});