<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_API_Sections extends WP_Coach_API  {

  public function __construct() {
    parent::__construct();

    add_action( 'wp_ajax_wp_coach_api_sections_index',   array( $this, 'index' ) );
    add_action( 'wp_ajax_wp_coach_api_sections_create',  array( $this, 'create' ) );
    add_action( 'wp_ajax_wp_coach_api_sections_show',    array( $this, 'show' ) );
    add_action( 'wp_ajax_wp_coach_api_sections_update',  array( $this, 'update' ) );
    add_action( 'wp_ajax_wp_coach_api_sections_destroy', array( $this, 'destroy' ) );
  }


  protected function _before() {
    parent::_verify_nonce();
  }


  public function index() {

    if ( ! current_user_can('read_wp_coach_course', $this->course_id ) ) {
      die('Not allowed');
    }

    $query = array(
      'posts_per_page' => -1,
      'post_type'  => 'wp_coach_section',
      'perm'       => 'readable',
      'meta_query' => array(
        array(
          'key'     => '_wp_coach_course_id',
          'value'   => $this->course_id,
          'compare' => '=',
        ),
      ),
    );

    if ( current_user_can('edit_wp_coach_course', $this->course_id) ) {
      $query['post_status'] = 'any';
    }

    $sections = get_posts( $query );
    return $this->output( $sections );
  }


  /**
   * Create a new section for a given course.
   *
   * @return mixed
   */
  public function create() {

    if ( ! current_user_can('edit_wp_coach_course', $this->course_id ) ) {
      status_header( 401 );
      die('Not allowed');
    }

    $course = WP_Coach_Course::find( $this->course_id );
    $section = $course->sections->create( array(
      'post_title' => wp_strip_all_tags( $_REQUEST['payload']['post_title'] )
    ) );
    status_header( 201 );
    return $this->output( $section );
  }


  public function show() {
    // Not Implemented
    status_header( 501 ); exit;
  }


  /**
   * Update a section
   *
   * @return [type] [description]
   */
  public function update() {

    if ( ! current_user_can('edit_wp_coach_course', $this->course_id ) ) {
      die('Not allowed');
    }

    $params = array_map( 'sanitize_text_field', $_REQUEST['payload'] );

    $result = wp_update_post( array(
      'ID'          => $params['ID'],
      'post_title'  => $params['post_title'],
      'post_status' => $params['post_status']
    ) );

    $status = $result == 0 ? 500 : 204;
    die( status_header( $status ) );
  }


  public function destroy() {
    return;
  }


  protected function _after() {
    return;
  }
}