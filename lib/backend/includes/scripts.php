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

    wp_enqueue_script('magnific-popup');
    wp_enqueue_style('magnific-popup');

    wp_register_script('knockout', '//cdnjs.cloudflare.com/ajax/libs/knockout/3.1.0/knockout-min.js');
    wp_register_script('knockback', '//cdnjs.cloudflare.com/ajax/libs/knockback/0.20.5/knockback.min.js', array('backbone', 'knockout'));

    wp_register_style( 'wp-coach-backend', WP_COACH_URL . 'lib/backend/assets/css/screen.css');
    wp_register_script( 'wp-coach-backend', WP_COACH_URL . 'lib/backend/assets/js/bundle.js', array('jquery', 'backbone', 'knockout', 'knockback') );

    wp_enqueue_style( 'wp-coach-backend');

    wp_localize_script( 'wp-coach-backend', 'WP_Coach', array( 'nonce' => wp_create_nonce( 'wp_json' ) ) );
    wp_enqueue_script( 'wp-coach-backend');
  }


}
