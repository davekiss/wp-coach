var rivets = require('rivets'),
         $ = require('jquery');

rivets.binders['on-enter-key-press'] = {
    bind : bindKeypress,
    unbind : unbindKeypress,
    function: true
};

function bindKeypress(el) {
    var rivetsView = this, $el = $(el);

    $el.on('keypress', function(event) {
        if(event.keyCode === 13) {
            $el.blur();
            rivetsView.observer.value()(event);
            event.preventDefault();
        }
    });
};

function unbindKeypress(el) {
    $(el).off('keypress');
};