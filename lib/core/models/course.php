<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_Course extends WP_Coach_Model {

  const POST_TYPE = 'wp_coach_course';
  const HAS_MANY  = 'sections';

}