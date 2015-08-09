"use strict";

var rivets = require('rivets'),
         $ = require('jquery');

rivets.binders['add-class'] = function(el, value) {

  if (el.addedClass) {
    var added = slugify(el.addedClass);

    $(el).removeClass(added);
    delete el.addedClass;
  }

  if (value) {
    var value = slugify(value);
    
    $(el).addClass(value);
    el.addedClass = value;
  }
}

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}