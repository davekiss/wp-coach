<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_Backend_Sections_Controller extends WP_Coach_Base {
  public function __construct() {
    parent::__construct();
  }

  /**
   * URL that links to the Edit Lesson iFrame
   * @return [type] [description]
   */
  public function new_lesson_url() {
    global $post;
    return admin_url( 'admin-post.php?action=wp_coach_new_lesson&wp_coach_course_id=' . $post->ID );
  }
}