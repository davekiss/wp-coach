<?php

class WP_Coach_Collection implements IteratorAggregate {

  public $collection = array();
  public $collection_class;


  /**
   * Set the collection that should be iterated
   * @param [type] $collection [description]
   */
  public function __construct( $collection ) {
    
    if ( empty( $collection) ) {
      return;
    }

    if ( is_array( $collection ) ) {

      $this->collection_class = get_class( $collection[0] );
      $this->collection = $collection;

    } else {

      $this->collection_class = get_class( $collection );
      $this->collection = array( $collection );

    }

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
   * Tells the iterator which array to use
   * during iterations.
   * 
   * @return [type] [description]
   */
  public function getIterator() {
    return new ArrayIterator($this->collection);
  }

}