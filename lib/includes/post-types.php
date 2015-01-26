<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_Post_Types {

  public function __construct() {
    add_action( 'init', array($this, 'register_course_post_type') );
    add_action( 'init', array($this, 'register_lesson_post_type') );
    add_action( 'init', array($this, 'register_subscription_post_type') );
  }

  /**
   * [register_course_post_type description]
   * @return {[type]} [description]
   */
  public function register_course_post_type() {

    $labels = array(
      'name'                => _x( 'Courses', 'Post Type General Name', 'wp-coach' ),
      'singular_name'       => _x( 'Course', 'Post Type Singular Name', 'wp-coach' ),
      'menu_name'           => __( 'Courses', 'wp-coach' ),
      'parent_item_colon'   => __( 'Parent Course:', 'wp-coach' ),
      'all_items'           => __( 'Courses', 'wp-coach' ),
      'view_item'           => __( 'View Course', 'wp-coach' ),
      'add_new_item'        => __( 'Add New Course', 'wp-coach' ),
      'add_new'             => __( 'Add New', 'wp-coach' ),
      'edit_item'           => __( 'Edit Course', 'wp-coach' ),
      'update_item'         => __( 'Update Course', 'wp-coach' ),
      'search_items'        => __( 'Search Course', 'wp-coach' ),
      'not_found'           => __( 'Not found', 'wp-coach' ),
      'not_found_in_trash'  => __( 'Not found in Trash', 'wp-coach' ),
    );
    $args = array(
      'label'               => __( 'wp_coach_course', 'wp-coach' ),
      'description'         => __( 'Learn from a complete track.', 'wp-coach' ),
      'labels'              => $labels,
      'supports'            => array( 'title', 'editor', 'author', 'thumbnail', 'comments', 'revisions', 'page-attributes', ),
      'taxonomies'          => array( 'category', 'post_tag' ),
      'rewrite'             => array( 'slug' => 'course', 'with-front' => FALSE ),
      'hierarchical'        => false,
      'public'              => true,
      'show_ui'             => true,
      'show_in_menu'        => 'wp-coach',
      'show_in_nav_menus'   => true,
      'show_in_admin_bar'   => true,
      'can_export'          => true,
      'has_archive'         => true,
      'exclude_from_search' => false,
      'publicly_queryable'  => true,
      'capability_type'     => 'page',
      //'register_meta_box_cb' => 'WP_Coach_Courses::add_meta_boxes'
    );
    register_post_type( 'wp_coach_course', $args );
  }

  /**
   * [register_lesson_post_type description]
   * @return {[type]} [description]
   */
  public function register_lesson_post_type() {

    $labels = array(
      'name'                => _x( 'Lessons', 'Post Type General Name', 'wp-coach' ),
      'singular_name'       => _x( 'Lesson', 'Post Type Singular Name', 'wp-coach' ),
      'menu_name'           => __( 'Lessons', 'wp-coach' ),
      'parent_item_colon'   => __( 'Parent Lesson:', 'wp-coach' ),
      'all_items'           => __( 'Lessons', 'wp-coach' ),
      'view_item'           => __( 'View Lesson', 'wp-coach' ),
      'add_new_item'        => __( 'Add New Lesson', 'wp-coach' ),
      'add_new'             => __( 'Add New', 'wp-coach' ),
      'edit_item'           => __( 'Edit Lesson', 'wp-coach' ),
      'update_item'         => __( 'Update Lesson', 'wp-coach' ),
      'search_items'        => __( 'Search Lesson', 'wp-coach' ),
      'not_found'           => __( 'Not found', 'wp-coach' ),
      'not_found_in_trash'  => __( 'Not found in Trash', 'wp-coach' ),
    );
    $args = array(
      'label'               => __( 'wp_coach_lesson', 'wp-coach' ),
      'description'         => __( 'Learn from a complete lesson.', 'wp-coach' ),
      'labels'              => $labels,
      'supports'            => array( 'title', 'editor', 'author', 'thumbnail', 'comments', 'trackbacks', 'revisions', 'custom-fields', 'page-attributes', ),
      'taxonomies'          => array( 'category', 'post_tag' ),
      'hierarchical'        => false,
      'public'              => false,
      'show_ui'             => false,
      'show_in_menu'        => 'wp-coach',
      'show_in_nav_menus'   => false,
      'show_in_admin_bar'   => false,
      'can_export'          => true,
      'has_archive'         => true,
      'exclude_from_search' => true,
      'publicly_queryable'  => false,
      'capability_type'     => 'page',
    );
    register_post_type( 'wp_coach_lesson', $args );
  }

  /**
   * [register_subscription_post_type description]
   * @return {[type]} [description]
   */
  public function register_subscription_post_type() {

    $labels = array(
      'name'                => _x( 'Subscriptions', 'Post Type General Name', 'wp-coach' ),
      'singular_name'       => _x( 'Subscription', 'Post Type Singular Name', 'wp-coach' ),
      'menu_name'           => __( 'Subscriptions', 'wp-coach' ),
      'parent_item_colon'   => __( 'Parent Subscription:', 'wp-coach' ),
      'all_items'           => __( 'Subscriptions', 'wp-coach' ),
      'view_item'           => __( 'View Subscription', 'wp-coach' ),
      'add_new_item'        => __( 'Add New Subscription', 'wp-coach' ),
      'add_new'             => __( 'Add New', 'wp-coach' ),
      'edit_item'           => __( 'Edit Subscription', 'wp-coach' ),
      'update_item'         => __( 'Update Subscription', 'wp-coach' ),
      'search_items'        => __( 'Search Subscription', 'wp-coach' ),
      'not_found'           => __( 'Not found', 'wp-coach' ),
      'not_found_in_trash'  => __( 'Not found in Trash', 'wp-coach' ),
    );
    $args = array(
      'label'               => __( 'wp_coach_subscription', 'wp-coach' ),
      'description'         => __( 'Manage Subscriptions.', 'wp-coach' ),
      'labels'              => $labels,
      'supports'            => array( 'title', 'page-attributes', ),
      'taxonomies'          => array( 'category', 'post_tag' ),
      'hierarchical'        => false,
      'public'              => false,
      'show_ui'             => false,
      'show_in_menu'        => 'wp-coach',
      'show_in_nav_menus'   => false,
      'show_in_admin_bar'   => false,
      'can_export'          => true,
      'has_archive'         => true,
      'exclude_from_search' => true,
      'publicly_queryable'  => false,
      'capability_type'     => 'page',
    );
    register_post_type( 'wp_coach_sub', $args );
  }

}