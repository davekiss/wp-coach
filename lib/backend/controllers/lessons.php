<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_Lessons extends WP_Coach_Base {

  /**
   * An array of messages to be sent to the view
   * @var array
   */
  public $flash = array();

  /**
   * The heading for the rendered page
   * @var string
   */
  public $page_title = '';

  /**
   * A specific WP Lesson Post Object
   * @var null
   */
  public $lesson = NULL;

  /**
   * [$lesson_meta description]
   * @var array
   */
  public $lesson_meta = array();

  /**
   * The course id that this lesson is associated with.
   * @var null
   */
  public $course_id = NULL;

  /**
   * [__construct description]
   */
  public function __construct() {
    parent::__construct();

    if ( isset( $_REQUEST['wp_coach_course_id'] ) && ! empty( $_REQUEST['wp_coach_course_id'] ) ) {
      $this->course_id = intval( $_REQUEST['wp_coach_course_id'] );
    }

    $this->mustache->setPartialsLoader( new Mustache_Loader_CascadingLoader( array(
        new Mustache_Loader_FilesystemLoader(WP_COACH_PATH . 'lib/backend/views/lessons/_form'),
      ) )
    );

    add_action( 'admin_enqueue_scripts', array($this, 'load_scripts') );
    add_action( 'admin_post_wp_coach_new_lesson', array($this, '_new') );
    add_action( 'admin_post_wp_coach_create_lesson', array($this, '_create') );
  }

  /**
   * Load the kendo UI scripts for the lesson editor.
   * @return [type] [description]
   */
  public function load_scripts() {
    wp_register_style('kendo-ui-common-material', WP_COACH_URL . 'lib/backend/assets/bower_components/kendo-ui/styles/kendo.common-material.min.css');
    wp_register_style('kendo-ui-material', WP_COACH_URL . 'lib/backend/assets/bower_components/kendo-ui/styles/kendo.material.min.css');
    wp_enqueue_style('kendo-ui-common-material');
    wp_enqueue_style('kendo-ui-material');

    wp_register_script('kendo-ui-core', WP_COACH_URL . 'lib/backend/assets/bower_components/kendo-ui/js/kendo.core.min.js', array('jquery'));
    wp_register_script('kendo-ui-data', WP_COACH_URL . 'lib/backend/assets/bower_components/kendo-ui/js/kendo.data.min.js', array('jquery', 'kendo-ui-core'));
    wp_register_script('kendo-ui-tabstrip', WP_COACH_URL . 'lib/backend/assets/bower_components/kendo-ui/js/kendo.tabstrip.min.js', array('jquery', 'kendo-ui-core', 'kendo-ui-data'));
    wp_enqueue_script( 'heartbeat' );
    wp_enqueue_script('kendo-ui-core');
    wp_enqueue_script('kendo-ui-data');
    wp_enqueue_script('kendo-ui-tabstrip');
  }

  /**
   * A function to run before any given action
   * @return [type] [description]
   */
  private function _before() {
    if ( $this->course_id == NULL || ! current_user_can('edit_post', $this->course_id ) ) {
      wp_die( __('You are not authorized to edit this course.', 'wp-coach') );
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
    $this->page_title = __('Add a Lesson', 'wp-coach');
    $template = $this->mustache->loadTemplate('lessons/editor');
    self::render_iframe($template);
  }

  /**
   * [_create description]
   * @return [type] [description]
   */
  public function _create() {

    $this->_before();

    if ( ! empty( $_POST ) && check_admin_referer( 'wp_coach_create_lesson_action', '_wpnonce' ) ) {
      // Validate and create lesson
      $lesson_id = wp_insert_post( array(
          'post_content' => wp_strip_all_tags( $_POST['lesson']['description'] ),
          'post_title'   => wp_strip_all_tags( $_POST['lesson']['name'] ),
          'post_status'  => 'publish',
          'post_type'    => 'wp_coach_lesson',
        )
      );

      if ( ! empty($lesson_id) ) {
        update_post_meta($lesson_id, '_wp_coach_course_id', $this->course_id );
        update_post_meta($lesson_id, '_wp_coach_require_payment', isset( $_POST['lesson']['require_payment'] ) );
        update_post_meta($lesson_id, '_wp_coach_lesson_price', $_POST['lesson']['price'] );
        update_post_meta($lesson_id, '_wp_coach_lesson_difficulty', $_POST['lesson']['difficulty'] );
        update_post_meta($lesson_id, '_wp_coach_lesson_length', $_POST['lesson']['length'] );
        update_post_meta($lesson_id, '_wp_coach_lesson_prereq', $_POST['lesson']['prereq'] );
      }

      $this->flash[] = array(
        'title'  => __("Lesson created.", "wp-coach"),
        'message' => __("Your lesson has been added to this course.", "wp-coach"),
        'class'   => 'updated',
      );

      $this->lesson = get_post($lesson_id);
      $this->lesson_meta = get_post_meta($lesson_id);

      echo '<pre>';
      var_dump($this->lesson);
      echo '</pre>';
      echo '<pre>';
      var_dump($this->lesson_meta);
      echo '</pre>';
      die;
      die;
    }
  }

  /**
   * [_edit description]
   * @param  [type] $lesson_id [description]
   * @return [type]            [description]
   */
  public function _edit($lesson_id = NULL) {
    define('IFRAME_REQUEST', true);
    set_current_screen('wp_coach_edit_lesson');
    $this->page_title = __('Edit Lesson', 'wp-coach');
    $template = $this->mustache->loadTemplate('lessons/editor');
    self::render_iframe($template);
  }

  /**
   * [_update description]
   * @return [type] [description]
   */
  public function _update() {

  }

  /**
   * [_delete description]
   * @return [type] [description]
   */
  public function _delete() {

  }

  /**
   * URL that links to the New Lesson iFrame
   * @return [type] [description]
   */
  public function new_lesson_url() {
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
