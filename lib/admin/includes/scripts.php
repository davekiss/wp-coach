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
    wp_register_style( 'wp-coach-admin',     WP_COACH_URL.'lib/admin/assets/css/screen.css');
    wp_register_script( 'wp-coach-admin', WP_COACH_URL.'lib/admin/assets/js/wp-coach-admin.js', 'jquery');

    wp_enqueue_style( 'wp-coach-admin');
    wp_enqueue_script( 'wp-coach-admin');
  }


}
