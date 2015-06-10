<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_API_Courses extends WP_Coach_API {

  public function __construct() {
    add_action( 'wp_ajax_wp_coach_api_courses_index',   array( $this, 'index' ) );
    add_action( 'wp_ajax_wp_coach_api_courses_create',  array( $this, 'create' ) );
    add_action( 'wp_ajax_wp_coach_api_courses_show',    array( $this, 'show' ) );
    add_action( 'wp_ajax_wp_coach_api_courses_update',  array( $this, 'update' ) );
    add_action( 'wp_ajax_wp_coach_api_courses_destroy', array( $this, 'destroy' ) );
  }


  protected function _before() {
    // Not Implemented
    status_header( 501 ); exit;
  }


  public function index() {
    // Not Implemented
    status_header( 501 ); exit;
  }


  public function create() {
    // Not Implemented
    status_header( 501 ); exit;
  }


  public function show() {
    $id = intval( $_GET['id'] );

    if ( ! current_user_can('read_wp_coach_course', $id ) ) {
      die('Not allowed');
    }

    return $this->output( WP_Coach_Course::find( $id ) );
  }


  public function update() {
    // Not Implemented
    status_header( 501 ); exit;
  }


  public function destroy() {
    // Not Implemented
    status_header( 501 ); exit;
  }


  protected function _after() {
    // Not Implemented
    status_header( 501 ); exit;
  }
}