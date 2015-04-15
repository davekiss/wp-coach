<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_Base {

  /**
   * [$mustache description]
   * @var [type]
   */
  public $mustache;

  /**
   * An array of messages to be sent to the view
   * @var array
   */
  public $flash = array();

  /**
   * [__construct description]
   */
  public function __construct() {

    // Determine which views to load based on where we are
    if ( is_admin() ) {
      $this->mustache = new Mustache_Engine( array(
        'loader' => new Mustache_Loader_FilesystemLoader(WP_COACH_PATH . 'lib/backend/views'),
      ) );
    } else {
      $this->mustache = new Mustache_Engine( array(
        'loader' => new Mustache_Loader_FilesystemLoader(WP_COACH_PATH . 'lib/frontend/views'),
      ) );
    }

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
