<?php

namespace Drupal\isu_implemenation\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Response;

/**
 * Returns json representation of the Program Finder Taxonomy.
 */
class ProgramFinderController extends ControllerBase {

  /**
   * {@inheritdoc}
   */
  public function getJson() {
    // Load your json content here.
    $query = \Drupal::entityQuery('node')
    ->condition('status', 1)
    ->condition('type', array('page_program'), 'IN');
    // $query->sort('created', 'DESC');
    $nids = $query->execute();

    $programs_array = array();
    foreach($nids as $nid) {
      $node = \Drupal\node\Entity\Node::load($nid);

      $program = new \stdClass();

      $program->name = $node->getTitle();
      $program->url = \Drupal::service('path_alias.manager')->getAliasByPath('/node/'.$nid);


      if(!empty($node->get('field_search_keywords')->value)) {
        $program->search = array($node->get('field_search_keywords')->value);
      } else {
        $program->search = array();
      }

      $type = array();
      for($i = 0; $i < count($node->get('field_degree_type')); $i++) {
        if (!empty($node->get('field_degree_type')[$i]->entity)){
          $type[] = $node->get('field_degree_type')[$i]->entity->get('name')->value;
        }
      }
      $program->degree = $type;

      $aoi = array();
      for($i = 0; $i < count($node->get('field_areas_of_interest')); $i++) {
        if (!empty($node->get('field_areas_of_interest')[$i]->entity)){
          $aoi[] = $node->get('field_areas_of_interest')[$i]->entity->get('name')->value;
        }
      }
      $program->interest = $aoi;

      $colleges = array();
      if($node->hasField('field_college')) {
        for($i = 0; $i < count($node->get('field_college')); $i++) {
          if (!empty($node->get('field_college')[$i]->entity)){
            $colleges[] = $node->get('field_college')[$i]->entity->get('name')->value;
          }
        }
      }

      $program->college = $colleges;

      $location = array();
      if($node->hasField('field_location')) {
        for($i = 0; $i < count($node->get('field_location')); $i++) {
          if (!empty($node->get('field_location')[$i]->entity)){
            $location[] = $node->get('field_location')[$i]->entity->get('name')->value;
          }
        }
      }
      $program->location = $location;

      if(isset($node->get('field_image')->entity)) {
        $imageUrl = $node->get('field_image')->entity->get('field_media_image')->entity->uri;
        if (!empty($imageUrl)) {
          $style = \Drupal::entityTypeManager()->getStorage('image_style')->load('card');
          $url = $style->buildUrl($node->get('field_image')->entity->get('field_media_image')->entity->getFileUri());
          $program->image = $url;
        }
      } else {
        $program->image = '';
      }

      $programs_array[] = $program;
    }

    $result = new \stdClass();
    $result->programs = $programs_array;

    $json = json_encode($result);

    $response = new Response();
    $response->setContent($json);
    $response->headers->set('Content-Type', 'application/json');
    return $response;

  }

}
