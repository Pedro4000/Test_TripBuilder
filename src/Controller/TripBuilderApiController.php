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


class TripBuilderApiController extends AbstractController
{

    /**
     * @Route("/get_airports", name="get_airports")
     */
    public function getAirports(Request $request)
    {
        $listAiport= [];
        $em = $this->getDoctrine()->getManager();
        $airportRepo = $em->getRepository(Airport::class);
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        if($request->isXmlHttpRequest()) {
            $query= ($request->query->get('query'));
        }

        $airports = $airportRepo->findListOfAirports($query);
        $jsonContent = $serializer->serialize($airports, 'json');

        return new Response(
            $jsonContent
        );
    }

    /**
 * @Route("/get_flight/{id}", name="get_flight")
 */
    public function getflights($id)
    {

        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $flightsRepo = $this->getDoctrine()->getManager()->getRepository(Flight::class);
        $flights = $flightsRepo->findBy(['trip_id'=>$id]);

        $jsonContent = $serializer->serialize($flights, 'json');

        return new Response(
            $jsonContent
        );

    }

    /**
     * @Route("/add/flight/{date}&{origin}&{destination}&{id}", name="add_flight")
     *
     */
    public function addFlights($date = false, $origin = false, $destination = false, $id = false, Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        if($date == false || $origin == false||  $destination == false || $id == false){
            $response = json_decode(['success'=>false]);
            return new Response( 'fail');
        }

        $dateFlight = date_create_from_format('d.m.Y H:i:s', $date . ' 11:00:00');

        $flight = new Flight();
        $flight->setDate($dateFlight);
        $flight->setOrigin($origin);
        $flight->setDestination($destination);
        $flight->setTripId($id);
        $em->persist($flight);
        $em->flush();

        $response = json_encode([ 'success'=>true ]);

        return new Response(
            $response
        );
    }

    /**
     * @Route("/remove/flight/{flightId}", name="remove_flight")
     */
    public function removeFlight($flightId, Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $flightRepository = $em->getRepository(Flight::class);
        $flightToDelete = $flightRepository->find($flightId);
        $em->remove($flightToDelete);
        $em->flush();

        $response = json_encode([ 'success'=>true ]);

        return new Response(
            $response
        );
    }


}
