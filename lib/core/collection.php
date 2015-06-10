<?php

class WP_Coach_Collection implements IteratorAggregate, JsonSerializable {

  private $collection = array();

  private $owner;
  private $target_class;
  private $target_post_type;

  private static $class_dict = array(
    'course'   => 'WP_Coach_Course',
    'sections' => 'WP_Coach_Section',
    'lessons'  => 'WP_Coach_Lesson',
  );


  /**
   * Set the collection that should be iterated
   * @param mixed $collection empty, single WP_Coach_{model}, or array of WP_Coach_{model}
   */
  public function __construct( $owner, $prop_name ) {
    $this->owner            = $owner;
    $this->target_class     = self::_get_class_from_prop_name( $prop_name );
    $this->target_post_type = strtolower( $this->target_class );

    $this->collection = self::_get_associated($this->owner, $this->target_class, $this->target_post_type);
  }


  /**
   * Fetch the first item in a collection
   *
   * @return object Model
   */
  public function first() {
    return $this->collection[0];
  }


  /**
   * Find a model by ID in a collection
   *
   * @param  [type] $id [description]
   * @return [type]     [description]
   */
  public function find($id = NULL) {
    if ( ! empty( $this->collection ) ) {
      foreach ( $this->collection as $model ) {
        if ($model->ID == $id) {
          return model;
        }
      }
      return FALSE;
    }
  }


  /**
   * [create description]
   * @return [type] [description]
   */
  public function create( $args = array() ) {
    $target = $this->target_class;
    $owner  = $this->owner;

    $result = $target::create( $args );
    update_post_meta($result->ID, '_' . $owner::POST_TYPE . '_id', $owner->ID );
    return $result;
  }

  /**
   * Tells the iterator which array to use
   * during iterations.
   *
   * @return [type] [description]
   */
  public function getIterator() {
    return new ArrayIterator($this->collection);
  }


  /**
   * Tells the serializer to use the collection when encoding to JSON
   *
   * @return array
   */
  public function jsonSerialize() {
    return $this->collection;
  }

  /**
   * [_get_class_from_prop_name description]
   * @param  [type] $property [description]
   * @return [type]           [description]
   */
  private static function _get_class_from_prop_name($property) {
    return self::$class_dict[$property];
  }

  /**
   * [_get_associated description]
   * @return [type] [description]
   */
  private static function _get_associated($owner, $target_class, $target_post_type) {

    // Run an association query with meta key
    $query = array(
      'posts_per_page' => -1,
      'post_type'  => $target_post_type,
      'perm'       => 'readable',
      'post_status'=> 'any',
      'meta_query' => array(
        array(
          'key'     => '_' . $owner::POST_TYPE . '_id',
          'value'   => $owner->ID,
          'compare' => '=',
        ),
      ),
    );

    $posts = get_posts( $query );

    $collection = call_user_func_array( array( 'self', 'init_instance' ) , array($posts, $target_class) );
    return $collection;
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

}