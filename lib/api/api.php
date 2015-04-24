<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

abstract class WP_Coach_API {

  /**
   * Course ID for current instance
   * @var int
   */
  protected $course_id;

  public function __construct() { }


  public function set_course( $course_id ) {
    $this->course_id = $course_id;
    return $this;
  }

  abstract protected function _before();
  abstract protected function index();
  abstract protected function create();
  abstract protected function show();
  abstract protected function update();
  abstract protected function destroy();
  abstract protected function _after();


  /**
   * Handles the output of the payload response object
   * based on if we're requesting via AJAX.
   *
   * @param  mixed $payload
   * @return string
   */
  public function output( $payload ) {
    $payload = json_encode($payload);

    if ( self::_is_ajax() ) {
      echo $payload;
      die;
    } else {
      return $payload;
    }
  }

  /**
   * [is_ajax description]
   * @return boolean [description]
   */
  private static function _is_ajax() {
    if (defined('DOING_AJAX') && DOING_AJAX) {
      return TRUE;
    } else {
      return FALSE;
    }
  }

}