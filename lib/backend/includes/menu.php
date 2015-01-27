<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_Admin_Menu {

  public function __construct() {
    add_action( 'admin_menu', array($this, 'add_menu') );
  }

  /**
   * Adds a new top level menu to the admin menu.
   *
   * @access public
   * @return void
   */
  public function add_menu() {
    global $submenu;
    $hooks = array();

    add_menu_page( 'WP Coach Page Title', 'WP Coach', 'manage_options', 'wp-coach', 'WP_Coach_Admin_Menu::render_template', 'dashicons-welcome-learn-more' );
    // $hooks[] = add_submenu_page( 'wp-coach', __('Subscriptions', 'wp-coach'), __('Subscriptions', 'wp-coach'), 'manage_options', 'wp-coach-subscriptions', 'WP_Coach_Admin_Menu::render_template');
    // add_action('load-$hook', array($this, 'on_pageload') );
  }

  /**
   * Renders the admin template for the current page.
   *
   * @access public
   * @return void
   */
  public static function render_template() {
    if ( ! current_user_can( 'manage_options' ) ) {
      wp_die( __( 'You do not have sufficient permissions to access this page.', 'wp-coach' ) );
    }

    // require_once WP_COACH_PATH . 'lib/admin/controllers/base.php';

    // May want to add actions instead of doing this big switch eg:
    //add_action('load-wp-coach-edit-galleries_page_vimeography-upload', array( $this, 'vimeography_upload_on_upload_pageload') );

    switch( current_filter() ) {

      case 'toplevel_page_wp-coach':

        require_once WP_COACH_PATH . 'lib/admin/controllers/courses.php';
        $controller = new WP_Coach_Courses;
        $template = $this->mustache->loadTemplate('courses/index');

        break;
      default:
        wp_die( sprintf( __('The admin template for "%s" cannot be found.', 'wp-coach'), current_filter() ) );
      break;
    }

    self::process_actions();
    echo $template->render($controller);
  }

}
