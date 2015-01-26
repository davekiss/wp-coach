<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_Lessons extends WP_Coach_Admin {

  /**
   * [__construct description]
   */
  public function __construct() {
    parent::__construct();

    add_action( 'admin_enqueue_scripts', array($this, 'load_scripts') );
    add_action( 'admin_post_wp_coach_new_lesson', array($this, '_new') );
    add_action( 'admin_post_wp_coach_create_lesson', array($this, '_create') );
  }

  public function load_scripts() {
    wp_register_style('kendo-ui-common-material', WP_COACH_URL . 'lib/admin/assets/bower_components/kendo-ui/styles/kendo.common-material.min.css');
    wp_register_style('kendo-ui-material', WP_COACH_URL . 'lib/admin/assets/bower_components/kendo-ui/styles/kendo.material.min.css');
    wp_enqueue_style('kendo-ui-common-material');
    wp_enqueue_style('kendo-ui-material');

    wp_register_script('kendo-ui-core', WP_COACH_URL . 'lib/admin/assets/bower_components/kendo-ui/js/kendo.core.min.js', array('jquery'));
    wp_register_script('kendo-ui-data', WP_COACH_URL . 'lib/admin/assets/bower_components/kendo-ui/js/kendo.data.min.js', array('jquery', 'kendo-ui-core'));
    wp_register_script('kendo-ui-tabstrip', WP_COACH_URL . 'lib/admin/assets/bower_components/kendo-ui/js/kendo.tabstrip.min.js', array('jquery', 'kendo-ui-core', 'kendo-ui-data'));
    wp_enqueue_script('kendo-ui-core');
    wp_enqueue_script('kendo-ui-data');
    wp_enqueue_script('kendo-ui-tabstrip');
  }

  private static function _before() {
    if ( ! current_user_can('wp_coach_create_lessons', $course_id ) ) {
      return;
    }
  }

  public function _index() {

  }

  public function _show() {

  }

  /**
   * [add_lesson description]
   * Make sure to validate that the ucrrent user can actually view/edit the lesson if they own the course
   */
  public function _new() {
    define('IFRAME_REQUEST', true);
    set_current_screen('wp_coach_new_lesson');
    $template = $this->mustache->loadTemplate('lessons/new');
    self::render_iframe($template);
  }

  /**
   * [_create description]
   * @return [type] [description]
   */
  public function _create() {

    self::_before();

    $course_id = intval( $_REQUEST['course_id'] );

    if ( ! empty( $_POST ) && check_admin_referer( 'wp_coach_create_lesson_action', '_wpnonce' ) ) {
      $lesson_id = wp_insert_post( array(
          'post_content' => wp_strip_all_tags( $_REQUEST['lesson']['description'] ),
          'post_title'   => '',
          'post_status'  => 'publish',
          'post_type'    => 'wp_coach_lesson',
        )
      );

      update_post_meta( $lesson_id, '_wp_coach_course_id', $course_id );
    }
  }

  public function _edit() {

  }

  public function _update() {

  }

  public function _delete() {

  }

  /**
   * URL that links to the New Lesson iFrame
   * @return [type] [description]
   */
  public function admin_post_url() {
    global $post;
    return admin_url( 'admin-post.php?action=wp_coach_new_lesson&wp_coach_course_id=' . $post->ID );
  }

  /**
   * [create_lesson_url description]
   * @return [type] [description]
   */
  public function create_lesson_url() {
    return admin_url( 'admin-post.php?action=wp_coach_create_lesson' );
  }

  /**
   * [nonce_field description]
   * @return [type] [description]
   */
  public function create_lesson_nonce_field() {
    return wp_nonce_field( 'wp_coach_create_lesson_action');
  }

  /**
   * [render_iframe description]
   * @param  [type] $template [description]
   * @return [type]           [description]
   */
  public function render_iframe($template) {
    iframe_header();
    echo $template->render($this);
    iframe_footer();
    exit; //Die to prevent the page continueing loading and adding the admin menu's etc.
  }

  /**
   * [editor description]
   * @return [type] [description]
   */
  public function lesson_editor() {
    ob_start();
    wp_editor('Hello', 'lesson_editor', array(
      'media_buttons' => false,
      'textarea_name' => 'lesson[description]',
      'teeny'         => true,
      'quicktags'     => false,
      'drag_drop_upload' => true,
      'textarea_rows' => 8,
    ));
    return ob_get_clean();
  }
}
