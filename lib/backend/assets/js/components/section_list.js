"use strict";
 
var Backbone = require('backbone'),
    React    = require('react'),
           $ = require('jquery');
           
Backbone.$ = $;

var ModuleList = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  createModule: function(model) {
    return(
      <div className="module">
        <h1>{model.get('title')}</h1>
        <p>{model.get('excerpt')}</p>
      </div>
    );
  },
  render: function() {
    //
    return(
      <div>
        {this.getCollection().map(this.createModule)}
      </div>
    );
  }
});

module.exports = React.createFactory(ModuleList);