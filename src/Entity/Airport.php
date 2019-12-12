<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\AirportRepository")
 */
class Airport
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Iso;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Municipality;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->Name;
    }

    public function setName(string $Name): self
    {
        $this->Name = $Name;

        return $this;
    }

    public function getIso(): ?string
    {
        return $this->Iso;
    }

    public function setIso(string $Iso): self
    {
        $this->Iso = $Iso;

        return $this;
    }

    public function getMunicipality(): ?string
    {
        return $this->Municipality;
    }

    public function setMunicipality(string $Municipality): self
    {
        $this->Municipality = $Municipality;

        return $this;
    }
}
