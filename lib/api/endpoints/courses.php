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
    return;
  }


  public function index() {
    return;
  }


  public function create() {
    return;
  }


  public function show() {
    $id = intval( $_GET['id'] );
    
    if ( ! current_user_can('read_wp_coach_course', $id ) ) {
      die('Not allowed');
    }

    return $this->output( WP_Coach_Course::find( $id ) );
  }


  public function update() {
    return;
  }


  public function destroy() {
    return;
  }


  protected function _after() {
    return;
  }
}