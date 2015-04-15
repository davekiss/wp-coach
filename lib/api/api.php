<?php

class WP_Coach_API {
  public function __construct() {
    add_action('wp_json_server_before_serve', array($this, 'add_endpoints') );
  }

  /**
   * [add_endpoints description]
   */
  public function add_endpoints() {
    require_once WP_COACH_PATH . 'lib/api/routes/courses.php';
    require_once WP_COACH_PATH . 'lib/api/routes/modules.php';
    new WP_Coach_API_Courses;
    new WP_Coach_API_Modules;
  }
}