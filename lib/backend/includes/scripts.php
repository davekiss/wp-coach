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
    wp_register_style( 'wp-coach-backend',     WP_COACH_URL.'lib/backend/assets/css/screen.css');
    wp_register_script( 'wp-coach-backend', WP_COACH_URL.'lib/backend/assets/js/wp-coach-backend.js', 'jquery');

    wp_enqueue_style( 'wp-coach-backend');
    wp_enqueue_script( 'wp-coach-backend');
  }


}
