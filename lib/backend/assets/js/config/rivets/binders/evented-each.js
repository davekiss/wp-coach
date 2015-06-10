"use strict";

var rivets = require('rivets'),
         $ = require('jquery');

rivets.binders['evented-each-*'] = {
    block : true,
    priority : 4000,
    bind : function() {
        $('#wp-coach-event-capture').trigger('bind:beginning');
        rivets.binders['each-*'].bind.apply(this, arguments);
        $('#wp-coach-event-capture').trigger('bind:complete');
    },
    unbind : function() {
        $('#wp-coach-event-capture').trigger('unbind:beginning');
        rivets.binders['each-*'].unbind.apply(this, arguments);
        $('#wp-coach-event-capture').trigger('unbind:complete');
    },
    routine : function() {
        $('#wp-coach-event-capture').trigger('routine:beginning');
        rivets.binders['each-*'].routine.apply(this, arguments);
        $('#wp-coach-event-capture').trigger('routine:complete');
    },
    update : function() {
        $('#wp-coach-event-capture').trigger('update:beginning');
        rivets.binders['each-*'].update.apply(this, arguments);
        $('#wp-coach-event-capture').trigger('update:complete');
    }
};