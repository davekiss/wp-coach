<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_API_Sections extends WP_JSON_CustomPostType {

  protected $base = '/wp-coach/courses/(?P<id>\d+)/sections';
  protected $type = 'wp_coach_section';

  public function __construct() {
    add_filter( 'json_endpoints', array( $this, 'register_routes' ) );
  }

  /**
   * [register_routes description]
   * @param  {[type]} $routes [description]
   * @return {[type]}         [description]
   */
  public function register_routes($routes) {

    $routes = parent::register_routes( $routes );

    // Add more custom routes here

    return $routes;
  }

}