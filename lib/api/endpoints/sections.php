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
    // Check nonce
    return;
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
      die('Not allowed');
    }

    // Validate and create lesson
    $section_id = wp_insert_post( array(
        'post_status'  => 'draft',
        'post_type'    => 'wp_coach_section',
      )
    );

    if ( ! empty($section_id) ) {
      update_post_meta($section_id, '_wp_coach_course_id', $this->course_id );
      $section = get_post($section_id);
      echo json_encode($section);
      die;
    }
  }


  public function show() {
    // Not Implemented
    status_header( 501 ); exit;
  }


  public function update() {
    //        'post_title'   => wp_strip_all_tags( $_POST['title'] ),
    return;
  }


  public function destroy() {
    return;
  }


  protected function _after() {
    return;
  }
}