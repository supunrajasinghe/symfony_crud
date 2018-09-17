<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Post;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;




class PostController extends Controller
{
    /**
    * @Route("/api", name="view_post_route")
    */
    public function viewPostAction(){
        $posts = $this->getDoctrine()->getRepository('AppBundle:Post')->findAll();
//        return $this->render("pages/index.html.twig", ['posts' => $posts]);

         $responseArray = array();

         foreach($posts as $post){
            $responseArray[] = array('id' => $post->getId(), 'title' => $post->getTitle(), 'description'=>$post->getDescription(), 'category'=>$post->getCategory());
         }

         $response = new Response(json_encode($responseArray));
         $response->headers->set('Content-Type', 'application/json');

         $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'GET,POST,PUT');
        $response->headers->set('Access-Control-Allow-Headers', 'X-Header-One,X-Header-Two');
         return $response;
    }

    /**
     * @Route("/api/insert", name="insert_post_route")
     */

    public function insertPostAction(Request $request){

        $data = json_decode($request->getContent(), true);
        echo $data['title'];

        $post = new post;

        $title = $data['title'];
        $description = $data['description'];
        $category = $data['category'];

        $post->setTitle($title);
        $post->setDescription($description);
        $post->setCategory($category);


        $em = $this->getDoctrine()->getManager();
        $em->persist($post);
        $em->flush();

        $response = new Response();
        return $response;

    }


    /**
     * @Route("/api/update", name="update_post_route")
     */
    public function updatePostAction(Request $request)
    {
        $data = json_decode($request->getContent(), true);

        $id = $data['id'];
        $title = $data['title'];
        $description = $data['description'];
        $category = $data['category'];



        $post = $this->getDoctrine()->getRepository('AppBundle:Post')->find($id);

        $em = $this->getDoctrine()->getManager();
        $post = $em->getRepository('AppBundle:Post')->find($id);

        $post->setTitle($title);
        $post->setDescription($description);
        $post->setCategory($category);

        $em->flush();

        $response = new Response();
        return $response;
    }


    /**
     * @Route("/api/delete", name="delete_post_route")
     */
    public function deletePostAction(Request $request)
    {

        $data = json_decode($request->getContent(), true);
        $id = $data['id'];
        $em = $this->getDoctrine()->getManager();
        $post = $em->getRepository('AppBundle:Post')->find($id);
        $em->remove($post);
        $em->flush();
        $this->addFlash('message' , 'Post deleted successfully');
        //return $this->redirectToRoute('view_post_route');

        $response = new Response();
        return $response;

    }
}
