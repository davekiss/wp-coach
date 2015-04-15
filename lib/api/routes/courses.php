<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_API_Courses extends WP_JSON_CustomPostType {

  protected $base = '/wp-coach/courses';
  protected $type = 'wp_coach_course';

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


  /**
   * [register_routes_new description]
   * @return [type] [description]
   */
  public function register_routes_new() {
    register_json_route( 'plugin/wp-coach/v1', '/courses/(?P<id>[\d]+)', array(
      array(
        'methods'  => WP_JSON_Server::READABLE,
        'callback' => array( $controller, 'get_item' ),
        'args'     => array(
          // custom args go here
          'context'  => array(
            'default'  => 'view',
          ),
        ),
      ),
      array(
        'methods'  => WP_JSON_Server::EDITABLE,
        'callback' => array( $controller, 'update_item' ),
        'args'     => array(
          'post_id'      => array(),
          'status'       => array(),
          'content'      => array(),
          'author'       => array(),
          'author_email' => array(),
          'author_url'   => array(),
          'date'         => array(),
        ),
      ),
      array(
        'methods'  => WP_JSON_Server::DELETABLE,
        'callback' => array( $controller, 'delete_item' ),
        'args'     => array(
          'force'    => array(),
        ),
      ),
    ) );    
  }

}