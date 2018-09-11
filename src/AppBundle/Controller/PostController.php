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
            ->add('save', SubmitType::Class, array('label' => 'create post','attr' => array('class' => 'form-control')))
            ->getForm();
        $form->handleRequest($request);
        if($form->isSubmitted() && $form->isValid()){
            $title = $form['title']->getData();
            $description = $form['description']->getData();
            $category = $form['category']->getData();

            $post->setTitle($title);
            $post->setTitle($description);
            $post->setTitle($category);

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
    public function updatePostAction($id )
    {
        return $this->render("pages/update.html.twig");
    }

    /**
     * @Route("/post/view/{id}", name="show_post_route")
     */
    public function showPostAction($id )
    {
        return $this->render("pages/view.html.twig");
    }

    /**
     * @Route("/post/delete/{id}", name="delete_post_route")
     */
    public function deletePostAction($id )
    {
        return $this->render("pages/delete.html.twig");
    }
}
