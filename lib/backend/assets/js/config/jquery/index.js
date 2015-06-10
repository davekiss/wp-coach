var $ = require('jquery');

$.ajaxSetup({
  headers: { 'X-WP-Nonce' : WP_Coach.nonce }
});