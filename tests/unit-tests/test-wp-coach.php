<?php

namespace WP_Coach_Unit_Tests;

class Tests_WP_Coach extends WP_Coach_UnitTestCase {

  protected $_coach;

  /**
   * Runs before every test.
   * Think of it as emulating what would usually happen once the plugin is activated on a Wordpress site.
   *
   */
  public function setUp() {
    parent::setUp();
    $this->_coach = \WP_Coach::get_instance();

    // $z->installation_housekeeping();
    // update_option('zam_options', array(
    //     'zam_twitter_id' => 'Wern_Ancheta'
    // ));

    //update_option('wp_coach_db_version', WP_COACH_VERSION);
  }

  public function test_wp_coach_instance() {
    $this->assertClassHasStaticAttribute( 'instance', 'WP_Coach' );
  }

  /**
   * @covers Coach Contants
   */
  public function test_constants() {
    // Plugin Folder URL
    $path = str_replace( 'tests/unit-tests/', '', plugin_dir_url( __FILE__ ) );
    $this->assertSame( WP_COACH_URL, $path );

    // Plugin Folder Path
    $path = str_replace( 'tests/unit-tests/', '', plugin_dir_path( __FILE__ ) );
    $this->assertSame( WP_COACH_PATH, $path );

    // URL to common assets shared by Coach themes
    $this->assertSame( WP_COACH_ASSETS_URL, WP_COACH_URL . 'lib/shared/assets/' );

    // Path to common assets shared by Coach themes
    $this->assertSame( WP_COACH_ASSETS_PATH, WP_COACH_PATH . 'lib/shared/assets/' );

    // Basename of the Vimeography plugin.
    $this->markTestIncomplete('The basename is not working properly, see https://github.com/wp-cli/wp-cli/issues/1037');
    //$this->assertSame( WP_COACH_BASENAME, 'wp-coach/wp-coach.php' );

    // Current Version
    $this->assertSame( WP_COACH_VERSION, '1.0');

    // Basename of current page
    $this->assertSame( WP_COACH_CURRENT_PAGE, 'index.php' );
  }

  /**
   * @covers WP_Coach::includes
   */
  public function test_includes() {
    $this->assertFileExists( WP_COACH_PATH . 'lib/base.php' );

    /** Check Admin Assets Exist */
    $this->assertFileExists( WP_COACH_PATH . 'lib/backend/assets/scss/screen.scss' );
  }

  public function tearDown() {
    delete_site_option('wp_coach_db_version');
  }

}