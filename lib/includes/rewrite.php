<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_Rewrite {

  public function __construct() {
    // add_action('generate_rewrite_rules', array( $this, 'add_rewrite_rules' ) );
    // add_filter('query_vars', array( $this, 'add_query_vars' ) );
    // add_action('init', array( $this, 'flush_rewrite_rules' ) );
  }

  /**
   * [add_rewrite_rules description]
   * @param [type] $wp_rewrite [description]
   */
  public function add_rewrite_rules($wp_rewrite) {
    $wp_rewrite->rules = array(
      '(.+?)/vimeography/(\d+)' => $wp_rewrite->index . '?pagename='. $wp_rewrite->preg_index( 1 ) .'&vimeography_id=' . $wp_rewrite->preg_index( 2 ),
      '(.+?)/vimeography/page/(\d+)' => $wp_rewrite->index . '?pagename='. $wp_rewrite->preg_index( 1 ) .'&vimeography_page=' . $wp_rewrite->preg_index( 2 ),
    ) + $wp_rewrite->rules;
  }


  /**
   * Adds the WP Coach query vars so they may be read in WordPress.
   * @param  [type] $qvars [description]
   * @return [type]        [description]
   */
  public function add_query_vars( $qvars ) {
    $qvars[] = 'wp_coach_course_id';
    return $qvars;
  }


  /**
   * Flush rewrite rules on activation if our rules are not yet included/registered.
   * @return [type] [description]
   */
  public static function flush_rewrite_rules() {
    $rules = get_option( 'rewrite_rules' );

    if ( ! isset( $rules['(.+?)/vimeography/(\d+)'] ) ) {
      global $wp_rewrite;
      $wp_rewrite->flush_rules();
    }
  }

}