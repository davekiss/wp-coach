<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_Init extends WP_Coach {

  public function __construct() {
    add_action( 'init', array($this, 'load_text_domain') );
    register_activation_hook( WP_COACH_BASENAME, array($this, 'flush_rewrite_rules') );
    register_activation_hook( WP_COACH_BASENAME, array($this, 'add_roles') );
    register_activation_hook( WP_COACH_BASENAME, array($this, 'add_caps') );
    register_deactivation_hook( WP_COACH_BASENAME, array($this, 'flush_rewrite_rules') );
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
    $role->add_cap( 'approve_wp_coach_courses' ); 
  }


  /**
   * [flush_rewrite_rules description]
   * @return [type] [description]
   */
  public function flush_rewrite_rules() {
    flush_rewrite_rules();
  }

}
