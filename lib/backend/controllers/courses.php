<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_Courses extends WP_Coach_Base {
  public function __construct() {
    parent::__construct();
    add_filter('parse_query', array($this, 'only_show_users_courses') );

    add_action( 'add_meta_boxes_wp_coach_course', array( $this, 'add_meta_boxes' ) );
    add_action( 'save_post', array( $this, 'save' ) );
    add_action( 'admin_enqueue_scripts', array($this, 'add_scripts') );
  }

  /**
   * Limit the courses shown in the course list to courses
   * created by the current author unless the user is an admin
   *
   * @return [type] [description]
   */
  public function only_show_users_courses() {
    if ( strpos( $_SERVER[ 'REQUEST_URI' ], '/wp-admin/edit.php?post_type=wp_coach_course' ) !== false ) {
      if ( ! current_user_can( 'update_core' ) ) {
        global $current_user;
        $wp_query->set( 'author', $current_user->id );
      }
    }
  }

  /**
   * [add_scripts description]
   * @param [type] $hook [description]
   */
  public function add_scripts($hook) {
    if ( 'post.php' != $hook ) {
        return;
    }

    wp_register_script('magnific-popup', WP_COACH_URL . 'lib/backend/assets/bower_components/magnific-popup/dist/jquery.magnific-popup.min.js', array('jquery') );
    wp_register_style('magnific-popup', WP_COACH_URL . 'lib/backend/assets/bower_components/magnific-popup/dist/magnific-popup.css');

    wp_enqueue_script('magnific-popup');
    wp_enqueue_style('magnific-popup');
  }

  /**
   * [add_meta_boxes description]
   */
  public function add_meta_boxes($course) {
    add_meta_box('wp-coach-sections', 'Course Sections', array($this, 'sections_metabox'), 'wp_coach_course', 'normal', 'high' );
    add_meta_box('wp-coach-course-settings', 'Course Settings', array($this, 'render_course_settings_metabox'), 'wp_coach_course', 'normal', 'high' );
  }

  /**
   * [render_course_settings_metabox description]
   * @param  [type] $course [description]
   * @return [type]         [description]
   */
  public function render_course_settings_metabox($course) {
    echo 'no settings';
  }

  /**
   * [modules_metabox description]
   * @param  [type] $course [description]
   * @return [type]         [description]
   */
  public function sections_metabox($course) {

    $sections = get_posts( array(
      'posts_per_page' => -1,
      'post_type'  => 'wp_coach_section',
      'perm'       => 'readable',
      'meta_query' => array(
        array(
          'key'     => '_wp_coach_course_id',
          'value'   => $course->ID,
          'compare' => '=',
        ),
      ),
    ) );

    $controller = WP_Coach::get_instance()->sections;
    $template = $this->mustache->loadTemplate('sections/index');
    echo $template->render($controller);
  }

  /**
   * [save description]
   * @param  [type] $post_id [description]
   * @return [type]          [description]
   */
  public function save( $post_id ) {

    // Check if our nonce is set.
    if ( ! isset( $_POST['myplugin_inner_custom_box_nonce'] ) )
      return $post_id;

    $nonce = $_POST['myplugin_inner_custom_box_nonce'];

    // Verify that the nonce is valid.
    if ( ! wp_verify_nonce( $nonce, 'myplugin_inner_custom_box' ) )
      return $post_id;

    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE )
      return $post_id;

    // Check the user's permissions.
    if ( 'wp_coach_course' == $_POST['post_type'] ) {

      if ( ! current_user_can( 'edit_page', $post_id ) )
        return $post_id;

    } else {

      if ( ! current_user_can( 'edit_post', $post_id ) )
        return $post_id;
    }

    /* OK, its safe for us to save the data now. */

    // Sanitize the user input.
    $mydata = sanitize_text_field( $_POST['myplugin_new_field'] );

    // Update the meta field.
    update_post_meta( $post_id, '_my_meta_value_key', $mydata );
  }

}
