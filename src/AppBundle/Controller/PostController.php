<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Post;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class PostController extends Controller
{
    /**
    * @Route("/post", name="view_post_route")
    */
    public function viewPostAction(){
        $posts = $this->getDoctrine()->getRepository('AppBundle:Post')->findAll();
        return $this->render("pages/index.html.twig", ['posts' => $posts]);

//        $postsArray = $posts->toArray();
////        $json = json_encode($postsArray);
////        print_r($json);
////        exit();
////        $json>header->set('Content-Type' , 'application/json' );
////        return $json;
//        $response = new Response(json_encode($postsArray ));
//        $response->headers->set('Content-Type', 'application/json');
//
//        return $response;



    }

    /**
     * @Route("/post/create", name="create_post_route")
     */
    public function createPostAction(Request $request){
        $post = new Post;
        $form = $this->createFormBuilder($post)
            ->add('title', TextType::Class, array('attr' => array('class' => 'form-control')))
            ->add('description', TextareaType::Class, array('attr' => array('class' => 'form-control')))
            ->add('category', TextType::Class, array('attr' => array('class' => 'form-control')))
            ->add('save', SubmitType::Class, array('label' => 'create post','attr' => array('class' => 'btn btn-primary')))
            ->getForm();
        $form->handleRequest($request);
        if($form->isSubmitted() && $form->isValid()){
            $title = $form['title']->getData();
            $description = $form['description']->getData();
            $category = $form['category']->getData();

            $post->setTitle($title);
            $post->setDescription($description);
            $post->setCategory($category);

            $em = $this->getDoctrine()->getManager();
            $em->persist($post);
            $em->flush();
            $this->addFlash('message' , 'Post saved successfully');
            return $this->redirectToRoute('view_post_route');
        }
        return $this->render("pages/create.html.twig",[
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/post/update/{id}", name="update_post_route")
     */
    public function updatePostAction($id , Request $request)
    {
        $post = $this->getDoctrine()->getRepository('AppBundle:Post')->find($id);

        $form = $this->createFormBuilder($post)
            ->add('title', TextType::Class, array('attr' => array('class' => 'form-control')))
            ->add('description', TextareaType::Class, array('attr' => array('class' => 'form-control')))
            ->add('category', TextType::Class, array('attr' => array('class' => 'form-control')))
            ->add('save', SubmitType::Class, array('label' => 'update post','attr' => array('class' => 'btn btn-primary')))
            ->getForm();
        $form  -> handleRequest($request);
        if($form->isSubmitted() && $form->isValid()){
            $title = $form['title']->getData();
            $description = $form['description']->getData();
            $category = $form['category']->getData();

            $em = $this->getDoctrine()->getManager();
            $post = $em->getRepository('AppBundle:Post')->find($id);

            $post->setTitle($title);
            $post->setDescription($description);
            $post->setCategory($category);

            $em->flush();
            $this->addFlash('message' , 'Post updated successfully');
            return $this->redirectToRoute('view_post_route');

        }
        return $this->render("pages/update.html.twig",['form' => $form->createView()]);
    }

    /**
     * @Route("/post/show/{id}", name="show_post_route")
     */
    public function showPostAction($id )
    {
        $post = $this->getDoctrine()->getRepository('AppBundle:Post')->find($id);
        return $this->render("pages/view.html.twig" , ['post' => $post]);
    }

    /**
     * @Route("/post/delete/{id}", name="delete_post_route")
     */
    public function deletePostAction($id )
    {
        $em = $this->getDoctrine()->getManager();
        $post = $em->getRepository('AppBundle:Post')->find($id);
        $em->remove($post);
        $em->flush();
        $this->addFlash('message' , 'Post deleted successfully');
        return $this->redirectToRoute('view_post_route');
    }
}
