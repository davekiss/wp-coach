<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

abstract class WP_Coach_Model implements JsonSerializable {

  protected $post;

  public function __construct( $WP_Post ) {
    $this->post = get_object_vars( $WP_Post );
  }


  /**
   * Returns a collection containing models of the
   * desired post type
   *
   * ToDo: Can't I just return an array here?
   *
   * @return object
   */
  public static function all() {

    return 'not implemented';

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
    return new WP_Coach_Collection($class_name, $collection);
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
  public static function create( $args = array() ) {

    $class_name = get_called_class();
    $post_type = strtolower( $class_name );

    $post_args = array_merge( array(
      'post_title'   => __('Untitled', 'wp-coach'),
    ), $args );

    // User can't change these
    $post_args['post_type']   = $post_type;
    $post_args['post_status'] = 'draft';

    $id = wp_insert_post( $post_args );

    if ( $id !== 0 ) {
      return get_post( $id );
    } else {
      throw new WP_Coach_Exception( __( sprintf('Failed to insert new record for $1%s', $post_type), 'wp-coach') );
    }
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
    if ( array_key_exists( $prop_name, $this->post ) ) {
      return $this->post[$prop_name];
    }

    $class_name = get_class($this);

    if ( defined($class_name . '::HAS_MANY') && $this::HAS_MANY === $prop_name ) {

      $this->{$prop_name} = new WP_Coach_Collection($this, $prop_name);
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
   * Include any loaded associations in json response
   * 
   * @return array
   */
  public function jsonSerialize() {

    $result = $this->post;

    if ( defined( get_class($this) . '::HAS_MANY') && isset( $this->{$this::HAS_MANY} ) ) {
      $result[$this::HAS_MANY] = $this->{$this::HAS_MANY};
    }

    return $result;
  }

}