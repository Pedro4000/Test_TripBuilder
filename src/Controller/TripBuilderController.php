<?php

namespace App\Controller;

use App\Entity\Airport;
use App\Entity\Flight;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;


class TripBuilderController extends AbstractController
{

    /**
     * @Route("/tripBuilder", name="landing_page")
     */
    public function landingAction(Request $request)
    {

        return $this->render('landing.html.twig', [

        ]);


    }


}