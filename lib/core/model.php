<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

abstract class WP_Coach_Model {

  public function __construct( $WP_Post ) {
    $post_vars = get_object_vars( $WP_Post );

    if ( is_array( $post_vars) ) {
      foreach ($post_vars as $key => $value) {
        $this->{$key} = $value;
      }
    }
  }


  /**
   * Returns a collection containing models of the
   * desired post type
   * 
   * @return object
   */
  public static function all() {

    $class_name = get_called_class();
    $post_type = strtolower( $class_name );

    $query = array(
      'posts_per_page' => -1,
      'post_type'      => $post_type,
      'post_status'    => 'any',
      'perm'           => 'readable',
    );

    $posts = get_posts( $query );

    $collection = call_user_func_array( array( 'self', 'init_instance' ) , array($posts, $class_name) );
    return new WP_Coach_Collection($collection);
  }


  /**
   * Returns a model containing the post
   * 
   * @param  int $id Post ID
   * @return object
   */
  public static function find( $id ) {
    $klass = get_called_class();
    $post  = get_post( $id );
    return new $klass( $post );
  }


  /**
   * Create a new record for the calling model
   * 
   * @return object New record
   */
  public static function create() {

    return 'not implemented';

    // Validate and create lesson
    $post_id = wp_insert_post( array(
        'post_status'  => 'draft',
        'post_type'    => 'wp_coach_section',
      )
    );

    if ( ! empty($section_id) ) {
      update_post_meta($section_id, '_wp_coach_course_id', $this->course_id );
      $section = get_post($section_id);
      echo json_encode($section);
      die;
    }
    return;
  }


  /**
   * [update description]
   * @return [type] [description]
   */
  public static function update() {
    return 'not implemented';
  }


  /**
   * [destroy description]
   * @return [type] [description]
   */
  public static function destroy() {
    return 'not implemented';
  }


  /**
   * Check the property being called to determine if we're
   * trying to return an associated object
   *
   * @param  string $name      Property name
   * @param  mixed  $arguments passed arguments
   * @return [type]            [description]
   */
  public function __get( $prop_name ) {

    // If it is a normal or cached property, just return it
    if ( property_exists($this, $prop_name) ) {
      return;
    }

    $class_name = get_class($this);

    if ( defined($class_name . '::HAS_MANY') && $this::HAS_MANY === $prop_name ) {

      $association = 'WP_Coach_' . ucfirst( self::_depluralize( $prop_name ) );
      $association_post_type = strtolower( $association );

      // Run an association query with meta key
      $query = array(
        'posts_per_page' => -1,
        'post_type'  => $association_post_type,
        'perm'       => 'readable',
        'meta_query' => array(
          array(
            'key'     => '_' . $this::POST_TYPE . '_id',
            'value'   => $this->ID,
            'compare' => '=',
          ),
        ),
      );

      if ( current_user_can('edit_wp_coach_course', $this->ID) ) {
        $query['post_status'] = 'any';
      }

      $posts = get_posts( $query );
      
      $collection = call_user_func_array( array( 'self', 'init_instance' ) , array($posts, $association) );
      $this->{$prop_name} = new WP_Coach_Collection($collection);

      return $this->{$prop_name};
    }


    if ( defined( $class_name . '::BELONGS_TO' ) && $klass::BELONGS_TO == $prop_name ) {
      // Run an association query with meta key
      return 'not implemented';

      $query = array(
        'posts_per_page' => -1,
        'post_type'  => $klass::BELONGS_TO,
        'perm'       => 'readable',
        'meta_query' => array(
          array(
            'key'     => '_' . $klass::BELONGS_TO . '_id',
            'value'   => $klass->_id,
            'compare' => '=',
          ),
        ),
      );

      if ( current_user_can('edit_wp_coach_course', $this->course_id) ) {
        $query['post_status'] = 'any';
      }

      return get_posts( $query );
    }

    throw new Exception( __('Property does not exist on model', 'wp-coach') );
  }


  /**
   * Creates a new model instance for each of the given
   * WP_Post objects
   * 
   * @param  mixed $posts empty, single or array of WP_Post
   * @param  string $klass Model name
   * @return mixed empty, single or array of Model instances
   */
  private static function init_instance($posts, $klass) {

    if ( empty( $posts ) ) {
      return array();
    }
    
    if ( is_array($posts) ) {
      $result = array();
      foreach( $posts as $post) {
        $result[] = new $klass($post);
      }
    } else {
      $result = new $klass($post);
    }

    return $result;
  }


  /**
   * Depluralize a word
   * 
   * @link https://sites.google.com/site/chrelad/notes-1/pluraltosingularwithphp
   * @param  [type] $word [description]
   * @return [type]       [description]
   */
  private static function _depluralize($word){
    // Here is the list of rules. To add a scenario,
    // Add the plural ending as the key and the singular
    // ending as the value for that key. This could be
    // turned into a preg_replace and probably will be
    // eventually, but for now, this is what it is.
    //
    // Note: The first rule has a value of false since
    // we don't want to mess with words that end with
    // double 's'. We normally wouldn't have to create
    // rules for words we don't want to mess with, but
    // the last rule (s) would catch double (ss) words
    // if we didn't stop before it got to that rule.
    $rules = array(
        'ss' => false,
        'os' => 'o',
        'ies' => 'y',
        'xes' => 'x',
        'oes' => 'o',
        'ies' => 'y',
        'ves' => 'f',
        's' => '');
    // Loop through all the rules and do the replacement.
    foreach(array_keys($rules) as $key){
      // If the end of the word doesn't match the key,
      // it's not a candidate for replacement. Move on
      // to the next plural ending.
      if(substr($word, (strlen($key) * -1)) != $key)
          continue;
      // If the value of the key is false, stop looping
      // and return the original version of the word.
      if($key === false)
          return $word;
      // We've made it this far, so we can do the
      // replacement.
      return substr($word, 0, strlen($word) - strlen($key)) . $rules[$key];
    }
    return $word;
  }

}