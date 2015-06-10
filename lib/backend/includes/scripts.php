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
    wp_register_style('tether-tooltip', WP_COACH_URL . 'lib/backend/assets/bower_components/tether-tooltip/dist/css/tooltip-theme-twipsy.css');

    wp_enqueue_script('magnific-popup');
    wp_enqueue_style('magnific-popup');
    wp_enqueue_style('fontawesome');
    wp_enqueue_style('tether-tooltip');

    wp_register_script('sightglass', WP_COACH_URL . 'lib/backend/assets/bower_components/sightglass/index.js');
    wp_register_script('rivets', WP_COACH_URL . 'lib/backend/assets/bower_components/rivets/dist/rivets.js', array('sightglass') );
    wp_register_script('rivets-backbone', WP_COACH_URL . 'lib/backend/assets/bower_components/rivets-backbone-adapter/rivets-backbone.js');
    //wp_register_script('backbone-relational', WP_COACH_URL . 'lib/backend/assets/bower_components/backbone-relational/backbone-relational.js', array('backbone', 'rivets', 'rivets-backbone'));

    wp_register_style( 'wp-coach-backend', WP_COACH_URL . 'lib/backend/assets/css/screen.css');
    wp_enqueue_style( 'wp-coach-backend');
  }


}
