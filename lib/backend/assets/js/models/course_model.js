"use strict";
 
var Backbone = require('backbone'),
           $ = require('jquery');
           
Backbone.$ = $;
 
var Sections = require('../collections/section_collection');

module.exports = Backbone.RelationalModel.extend({
  idAttribute: 'ID',
  relations: [
    {
      type: 'HasMany',
      key: 'sections',
      relatedModel: Sections.model,
      reverseRelation: {
        key: 'course',
        includeInJSON: 'ID',
      }
    }
  ],  
  url: WP_Coach.ajax_url,
  initialize: function() {
    console.log('course model', this.attributes);
    this.set({
      sections: new Sections(this.attributes.sections)
    });
  }
});



// Course = Backbone.RelationalModel.extend({
//     relations: [
//         {
//             type: 'HasMany',
//             key: 'sections',
//             relatedModel: 'Section',
//             reverseRelation: {
//                 key: 'course'
//             }
//         }
//     ]
// });

// Section = Backbone.RelationalModel.extend();

// math_course = new Course({id:1});

// console.log(math_course.get('sections').length);  // ==> 0

// living_room = new Section({course:1,name:"Living Section"});

// console.log(math_course.get('sections').length); // ==> 1
// console.log(math_course.get('sections').first().get('name')); // ==> "Living Section"