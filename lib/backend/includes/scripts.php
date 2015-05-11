<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_Admin_Scripts {

  public function __construct() {
    add_action( 'admin_enqueue_scripts', array($this, 'scripts') );
  }

  /**
   * [scripts description]
   * @return [type] [description]
   */
  public function scripts() {

    wp_register_script('magnific-popup', WP_COACH_URL . 'lib/backend/assets/bower_components/magnific-popup/dist/jquery.magnific-popup.min.js', array('jquery') );
    wp_register_style('magnific-popup', WP_COACH_URL . 'lib/backend/assets/bower_components/magnific-popup/dist/magnific-popup.css');
    wp_register_style('fontawesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css');

    wp_enqueue_script('magnific-popup');
    wp_enqueue_style('magnific-popup');
    wp_enqueue_style('fontawesome');

    wp_register_script('knockout', '//cdnjs.cloudflare.com/ajax/libs/knockout/3.1.0/knockout-min.js');
    wp_register_script('knockback', '//cdnjs.cloudflare.com/ajax/libs/knockback/0.20.5/knockback.min.js', array('backbone', 'knockout'));
    wp_register_script('backbone-relational', 'https://cdnjs.cloudflare.com/ajax/libs/backbone-relational/0.9.0/backbone-relational.min.js', array('backbone', 'knockout', 'knockback'));

    wp_register_style( 'wp-coach-backend', WP_COACH_URL . 'lib/backend/assets/css/screen.css');
    wp_enqueue_style( 'wp-coach-backend');
  }


}
