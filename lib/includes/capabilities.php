<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_Capabilities {
  
  public function __construct() {
    add_filter( 'map_meta_cap', array($this, 'map_meta_capabilities'), 10, 4 );
  }

  /**
   * [map_meta_capabilities description]
   * @param  [type]  $caps    [description]
   * @param  [type]  $cap     [description]
   * @param  integer $user_id [description]
   * @param  array   $args    [description]
   * @return [type]           [description]
   */
  public function map_meta_capabilities( $caps, $cap, $user_id = 0, $args = array() ) {

    // $allowed_posts_id_for_current_user = array( '29', '30' ); // you need to get these ids yourself
    // $post = get_post( $param[2] );

    // // If current post isn't allowed then delete edit and delete capabilities
    // if( !in_array( $post->ID, $allowed_post_type_ids ) ){
    //     if( ( $param[0] == "edit_projects") || ( $param[0] == "delete_projects" ) ) { // Change to yours capabilities
    //         foreach( (array) $capask as $capasuppr) {
    //            if ( array_key_exists($capasuppr, $capauser) ) {
    //               $capauser[$capasuppr] = 0;
    //            }
    //         }
    //     }
    // }

    // return $capauser;

    /* If editing, deleting, or reading a course, get the post and post type object. */
    if ( 'edit_wp_coach_course' == $cap || 'delete_wp_coach_course' == $cap || 'read_wp_coach_course' == $cap ) {
      $post = get_post( $args[0] );
      $post_type = get_post_type_object( $post->post_type );

      /* Set an empty array for the caps. */
      $caps = array();
    }

    /* If editing a course, assign the required capability. */
    if ( 'edit_wp_coach_course' == $cap ) {
      if ( $user_id == $post->post_author ) {
        $caps[] = $post_type->cap->edit_posts;
      }
      else {
        $caps[] = $post_type->cap->edit_others_posts;
      }
    }

    /* If deleting a course, assign the required capability. */
    elseif ( 'delete_wp_coach_course' == $cap ) {
      if ( $user_id == $post->post_author ) {
        $caps[] = $post_type->cap->delete_posts;
      }
      else {
        $caps[] = $post_type->cap->delete_others_posts;
      }
    }

    /* If reading a private course, assign the required capability. */
    elseif ( 'read_wp_coach_course' == $cap ) {

      if ( 'private' != $post->post_status ) {
        $caps[] = 'read';
      }
      elseif ( $user_id == $post->post_author ) {
        $caps[] = 'read';
      }
      else {
        $caps[] = $post_type->cap->read_private_posts;
      }
    }

    /* Return the capabilities required by the user. */
    return $caps;
  }
}