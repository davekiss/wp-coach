"use strict";
 
var Backbone = require('backbone'),
    React    = require('react'),
           $ = require('jquery');
           
Backbone.$ = $;

var Module = require('../models/module_model');

var ModuleForm = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  submitForm: function() {
    var title = this.refs.postTitle.getDOMNode().value
    var excerpt = this.refs.postExcerpt.getDOMNode().value

    if (title.trim().length == 0 || excerpt.trim().length == 0) {
      alert('No blanks');
    } else {
      this.refs.postTitle.getDOMNode().value = '';
      this.refs.postExcerpt.getDOMNode().value = '';
      /* Backbone magic */
      var module = Module({title: title, excerpt: excerpt});
      this.getCollection().create(module, {
        wait: true,
        at: 0,
        success: function(model, response){
          console.log('Success');
        },
        error: function(model, response){
          console.log('Error');
        }
      });
    }
  },
  render: function() {
    return(
      <div className="form">
        <label>Title</label>
        <input ref="postTitle" type="text" placeholder="Enter title.." />
        <label>Body</label>
        <input ref="postExcerpt" type="text" placeholder="Enter excerpt.." />
        <a className="button" onClick={this.submitForm}>Create Module</a>
      </div>
    );
  }
});

module.exports = React.createFactory(ModuleForm);