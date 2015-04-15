<?php
/*
Plugin Name: WP Coach
Plugin URI: http://wpcoach.com
Description: WP Coach transforms your website into a training epicenter.
Version: 1.0
Author: Dave Kiss
Author URI: http://davekiss.com
Depends: JSON REST API
License: GPL3
Text Domain: wp-coach
*/

if ( ! class_exists( 'WP_Coach' ) ) {

  class WP_Coach {
    /**
     * The WP_Coach instance
     *
     * @var object
     */
    private static $instance = NULL;


    /**
     * [$courses description]
     * @var [type]
     */
    public $courses;

    /**
     * [$sections description]
     * @var [type]
     */
    public $sections;

    /**
     * [$lessons description]
     * @var [type]
     */
    public $lessons;


    /**
     * Creates or returns an instance of this class.
     *
     * @return  WP_Coach  A single instance of this class.
     */
    public static function get_instance() {
      if ( ! isset( self::$instance ) AND ! ( self::$instance instanceof WP_Coach  ) ) {
        self::$instance = new self;
        self::$instance->_define_constants();
        self::$instance->_include_files();
        Mustache_Autoloader::register();

        // Can save these in public vars if need to access
        if ( is_admin() ) {
          new WP_Coach_Base;
          new WP_Coach_Admin_Menu;
          new WP_Coach_Admin_Scripts;
          self::$instance->courses = new WP_Coach_Courses;
          self::$instance->sections = new WP_Coach_Sections;
          self::$instance->lessons = new WP_Coach_Lessons;
        }

        new WP_Coach_Init;
        new WP_Coach_Post_Types;
        new WP_Coach_Shortcode;
      }

      return self::$instance;
    }


    /**
     * Empty constructor… boring.
     */
    public function __construct() { }


    /**
     * Define all of the constants used throughout the plugin.
     *
     * @return void
     */
    private function _define_constants() {
      global $wpdb;
      define( 'WP_COACH_URL',  plugin_dir_url(__FILE__) );
      define( 'WP_COACH_PATH', plugin_dir_path(__FILE__) );
      define( 'WP_COACH_ASSETS_URL',  WP_COACH_URL . 'lib/shared/assets/' );
      define( 'WP_COACH_ASSETS_PATH', WP_COACH_PATH. 'lib/shared/assets/' );
      define( 'WP_COACH_BASENAME', plugin_basename( __FILE__ ) );
      define( 'WP_COACH_VERSION', '1.0');
      define( 'WP_COACH_CURRENT_PAGE', basename($_SERVER['PHP_SELF']));
    }


    /**
     * Include the files required by WP_Coach.
     * @return [type]
     */
    private function _include_files() {

      // Require Mustache.php
      if ( ! class_exists('Mustache_Engine') ) {
        require_once WP_COACH_PATH . '/vendor/mustache/mustache/src/Mustache/Autoloader.php';
      }

      require_once WP_COACH_PATH . 'lib/includes/exception.php';
      require_once WP_COACH_PATH . 'lib/base.php';
      require_once WP_COACH_PATH . 'lib/includes/init.php';
      require_once WP_COACH_PATH . 'lib/includes/post-types.php';
      require_once WP_COACH_PATH . 'lib/includes/shortcode.php';

      if ( is_admin() ) {
        if ( ! class_exists('Plugin_Dependencies_Loader') ) {
          require_once WP_COACH_PATH . 'vendor/plugin-dependencies/plugin-dependencies.php';
        }
        require_once WP_COACH_PATH . 'lib/backend/includes/menu.php';
        require_once WP_COACH_PATH . 'lib/backend/includes/scripts.php';

        // Controllers should be conditionally loaded?
        require_once WP_COACH_PATH . 'lib/backend/controllers/courses.php';
        require_once WP_COACH_PATH . 'lib/backend/controllers/sections.php';
        require_once WP_COACH_PATH . 'lib/backend/controllers/lessons.php';
      }
    }
  }
}

WP_Coach::get_instance();