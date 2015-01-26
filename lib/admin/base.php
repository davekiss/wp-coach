<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_Admin {

  /**
   * [$mustache description]
   * @var [type]
   */
  public $mustache;

  /**
   * [__construct description]
   */
  public function __construct() {

    $this->mustache = new Mustache_Engine( array(
      'loader' => new Mustache_Loader_FilesystemLoader(WP_COACH_PATH . 'lib/admin/views'),
    ) );

  }

  /**
   * Processes all WP Coach actions sent via POST and GET by looking for the 'wp-coach-action'
   * request and running do_action() to call the function
   *
   * @return void
   */
  public static function process_actions() {
    if ( isset( $_POST['wp-coach-action'] ) ) {
      do_action( 'wp_coach_action_' . $_POST['wp-coach-action'], $_POST );
    }

    if ( isset( $_GET['wp-coach-action'] ) ) {
      do_action( 'wp_coach_action_' . $_GET['wp-coach-action'], $_GET );
    }
  }
}
