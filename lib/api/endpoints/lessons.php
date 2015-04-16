<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class WP_Coach_API_Lessons {

  public function __construct() {
    add_action( 'wp_ajax_wp_coach_api_lessons_index',   array( $this, 'index' ) );
    add_action( 'wp_ajax_wp_coach_api_lessons_new',     array( $this, 'new_lesson') );
    add_action( 'wp_ajax_wp_coach_api_lessons_create',  array( $this, 'create' ) );
    add_action( 'wp_ajax_wp_coach_api_lessons_show',    array( $this, 'show' ) );
    add_action( 'wp_ajax_wp_coach_api_lessons_edit',    array( $this, 'edit' ) );
    add_action( 'wp_ajax_wp_coach_api_lessons_update',  array( $this, 'update' ) );
    add_action( 'wp_ajax_wp_coach_api_lessons_destroy', array( $this, 'destroy' ) );
  }


  private function _before() {
    return;
  }


  public function index() {
    return;
  }


  public function new_lesson() {
    return;
  }


  public function create() {
    return;
  }


  public function show() {
    return;
  }


  public function edit() {
    return;
  }


  public function update() {
    return;
  }


  public function destroy() {
    return;
  }


  private function _after() {
    return;
  }
}