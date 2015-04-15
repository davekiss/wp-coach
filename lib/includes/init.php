<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_Init extends WP_Coach {

  public function __construct() {
    add_action( 'init', array($this, 'load_text_domain') );
    add_filter( 'heartbeat_received', array($this, 'get_lessons'), 10, 2 );
    register_activation_hook( WP_COACH_BASENAME, array($this, 'flush_rewrite_rules') );
    register_activation_hook( WP_COACH_BASENAME, array($this, 'add_roles') );
    register_activation_hook( WP_COACH_BASENAME, array($this, 'add_caps') );
    register_deactivation_hook( WP_COACH_BASENAME, array($this, 'flush_rewrite_rules') );
  }

  /**
   * [get_lessons description]
   * @param  [type] $response [description]
   * @param  [type] $data     [description]
   * @return [type]           [description]
   */
  public function get_lessons( $response, $data ) {
    if ( $data['wp_coach_heartbeat']['action'] == 'get_course_lessons' ) {

      $lessons = get_posts( array(
        'posts_per_page' => -1,
        'post_type'  => 'wp_coach_lesson',
        'perm'       => 'readable',
        'meta_query' => array(
          array(
            'key'     => '_wp_coach_course_id',
            'value'   => $data['wp_coach_heartbeat']['course_id'],
            'compare' => '=',
          ),
        ),
      ) );

      $response['wp-coach-lessons'] = json_encode($lessons);
    }
    return $response;
  }

  /**
   * Localization
   * @return [type] [description]
   */
  public function load_text_domain() {
    load_plugin_textdomain('wp-coach', false, dirname( WP_COACH_BASENAME ) . '/languages/');
  }

  /**
   * [add_roles description]
   * Todo: Add custom caps here, eg.: edit_wp_coach_course etc.
   */
  public function add_roles() {
    add_role( 'wp_coach_educator',  __('Educator', 'wp-coach'),  array( 'read' => true, ) );
    add_role( 'wp_coach_applicant', __('Applicant', 'wp-coach'), array( 'read' => true, ) );
    add_role( 'wp_coach_student',   __('Student', 'wp-coach'),   array( 'read' => true, ) );
  }

  /**
   * [add_caps description]
   */
  public function add_caps() {
    $role = get_role( 'administrator' );
    // $role->add_cap( 'read_wp_coach_course' );
    $role->add_cap( 'read_wp_coach_courses' );
    $role->add_cap( 'read_private_wp_coach_courses' );
    $role->add_cap( 'approve_wp_coach_courses' );
    // $role->add_cap( 'edit_wp_coach_course' );
    $role->add_cap( 'edit_wp_coach_courses' );
    $role->add_cap( 'edit_published_wp_coach_courses' );
    $role->add_cap( 'edit_others_wp_coach_courses' );
    // $role->add_cap( 'delete_wp_coach_course' );
    $role->add_cap( 'delete_wp_coach_courses' );
    $role->add_cap( 'delete_published_wp_coach_courses' );
    $role->add_cap( 'delete_others_wp_coach_courses' );
  }


  /**
   * [flush_rewrite_rules description]
   * @return [type] [description]
   */
  public function flush_rewrite_rules() {
    flush_rewrite_rules();
  }

}
