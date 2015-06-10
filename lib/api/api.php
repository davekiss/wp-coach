<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

abstract class WP_Coach_API {

  /**
   * Course ID for current instance
   * @var int
   */
  protected $course_id;

  public function __construct() {

    if ( isset( $_REQUEST['payload']['course_id'] ) ) {
      $this->course_id = intval( $_REQUEST['payload']['course_id'] );
    }

  }

  abstract protected function _before();
  abstract protected function index();
  abstract protected function create();
  abstract protected function show();
  abstract protected function update();
  abstract protected function destroy();
  abstract protected function _after();

  /**
   * Make sure the request originated from the admin for now.
   *
   * @return mixed
   */
  protected static function _verify_nonce() {
    if ( ! wp_verify_nonce( $_SERVER['HTTP_X_WP_NONCE'], 'wp_coach_admin' ) ) {
      status_header( 401 );
      die('Not allowed');
    }
  }

  /**
   * Handles the output of the payload response object
   * based on if we're requesting via AJAX.
   *
   * @param  mixed $payload
   * @return string
   */
  public static function output( $payload ) {
    echo json_encode($payload);
    die;
  }

}