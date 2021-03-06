<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_API_Lessons extends WP_Coach_API {

  public function __construct() {
    add_action( 'wp_ajax_wp_coach_api_lessons_index',   array( $this, 'index' ) );
    add_action( 'wp_ajax_wp_coach_api_lessons_create',  array( $this, 'create' ) );
    add_action( 'wp_ajax_wp_coach_api_lessons_show',    array( $this, 'show' ) );
    add_action( 'wp_ajax_wp_coach_api_lessons_update',  array( $this, 'update' ) );
    add_action( 'wp_ajax_wp_coach_api_lessons_destroy', array( $this, 'destroy' ) );
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

    if ( ! current_user_can('edit_wp_coach_course', $this->course_id ) ) {
      status_header( 401 );
      die('Not allowed');
    }

    $course = WP_Coach_Course::find( $this->course_id );
    $section_id = intval( $_REQUEST['payload']['section_id'] );

    $lesson = $course->sections->find( $section_id )->lessons->create( array(
      'post_title' => wp_strip_all_tags( $_REQUEST['payload']['post_title'] )
    ) );

    status_header( 201 );
    return $this->output( $lesson );

  }


  public function show() {
    // Not Implemented
    status_header( 501 ); exit;
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