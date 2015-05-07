<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_Section extends WP_Coach_Model {

  const POST_TYPE  = 'wp_coach_section';
  const BELONGS_TO = 'course';
  const HAS_MANY   = 'lessons';

}