<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_Shortcode extends WP_Coach {

  /**
   * The shortcode tag attributes applied by the user on a page or post.
   *
   * @var array
   */
  private $_atts;

  /**
   * The content located inside of the shortcode tag applied by the
   * user on a page or post.
   *
   * @var string
   */
  private $_content = NULL;


  /**
   * Hook into the Vimeography Shortcode and
   * add shortcode support for widgets.
   */
  public function __construct() {
    add_filter( 'widget_text', 'do_shortcode' );
    add_shortcode( 'wp_coach', array($this, 'shortcode') );
  }

  /**
   * Loads the gallery settings, generates any custom CSS, and creates the gallery token.
   *
   * @param array  $atts    The shortcode tag attributes applied by the user on a page or post.
   * @param string $content The content located inside of the shortcode tag.
   */
  public function shortcode($atts, $content = NULL) {
    $this->_atts       = $atts;
    $this->_content    = $content;

    try {
      return 'hello coach';
    }
    catch (WP_Coach_Exception $e) {
      return __("WP Coach Error: ", 'wp-coach') . $e->getMessage();
    }
  }

}
