<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_Lesson extends WP_Coach_Model {

  const POST_TYPE  = 'wp_coach_lesson';
  const BELONGS_TO = 'section';

}