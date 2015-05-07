<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_Capabilities {
  
  public function __construct() {
    add_filter( 'map_meta_cap', array($this, 'map_meta_capabilities'), 10, 4 );
  }

  /**
   * Checks the passed capability name and maps _actual_ WordPress core capabilities
   * required to perform the action in question based on our own custom requirements.
   * 
   * @param  array   $required_caps    Capabilities required for the user to perform action
   * @param  string  $requested_cap    Capability requested to check
   * @param  integer $user_id
   * @param  array   $args    custom arguments passed to current_user_can
   * @return array   Required capabilities
   */
  public function map_meta_capabilities( $required_caps, $requested_cap, $user_id = 0, $args = array() ) {

    /* If editing, deleting, or reading a course, get the post and post type object. */
    if ( 'edit_wp_coach_course' == $requested_cap || 'delete_wp_coach_course' == $requested_cap || 'read_wp_coach_course' == $requested_cap ) {
      $post = get_post( $args[0] );
      $post_type = get_post_type_object( $post->post_type );

      /* Set an empty array for the caps. */
      $required_caps = array();
    }

    /* If editing a course, assign the required capability. */
    if ( 'edit_wp_coach_course' == $requested_cap ) {
      if ( $user_id == $post->post_author ) {
        $required_caps[] = $post_type->cap->edit_posts;
      }
      else {
        $required_caps[] = $post_type->cap->edit_others_posts;
      }
    }

    /* If deleting a course, assign the required capability. */
    elseif ( 'delete_wp_coach_course' == $requested_cap ) {
      if ( $user_id == $post->post_author ) {
        $required_caps[] = $post_type->cap->delete_posts;
      }
      else {
        $required_caps[] = $post_type->cap->delete_others_posts;
      }
    }

    /* If reading a private course, assign the required capability. */
    elseif ( 'read_wp_coach_course' == $requested_cap ) {

      if ( 'private' != $post->post_status ) {
        $required_caps[] = 'read';
      }
      elseif ( $user_id == $post->post_author ) {
        $required_caps[] = 'read';
      }
      else {
        $required_caps[] = $post_type->cap->read_private_posts;
      }
    }

    /* Return the capabilities required by the user. */
    return $required_caps;
  }
}