<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_API {
  public function __construct() {
    add_action('init', array($this, 'add_endpoints') );
  }

  /**
   * [add_endpoints description]
   */
  public function add_endpoints() {
    require_once WP_COACH_PATH . 'lib/api/endpoints/courses.php';
    require_once WP_COACH_PATH . 'lib/api/endpoints/sections.php';
    require_once WP_COACH_PATH . 'lib/api/endpoints/lessons.php';
    new WP_Coach_API_Courses;
    new WP_Coach_API_Sections;
    new WP_Coach_API_Lessons;
  }
}