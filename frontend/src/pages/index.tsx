// pages/Mapa.tsx
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import Header from '../components/header';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Link from 'next/link';
import styled from 'styled-components';
type Sitio = {
  nombre: string;
  latitud: number;
  longitud: number;
  descripcion: string;
};
const CreateButton = styled.a`
  display: inline-block;
  background-color: #0070f3;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
    transform: scale(1.05);
  }

  &:active {
    background-color: #003f7f;
  }
`;
const MapComponent = dynamic(() => import('../components/MapComponet'), {
  ssr: false // Evitar la representación del lado del servidor para Leaflet
});

const Mapa: React.FC = () => {
  const [sitios, setSitios] = useState<[number, Sitio][]>([]);

  useEffect(() => {
    async function fetchSitios() {
      try {
        const response = await fetch('/api/read-all-sitios');
        const data: [number, Sitio][] = await response.json();
        setSitios(data);
      } catch (error) {
        console.error('Error fetching sitios:', error);
      }
    }

    fetchSitios();
  }, []);

  const handleCreateSitio = async () => {
    try {
      const response = await fetch('/api/create-sitio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: 'Nombre del sitio',
          latitud: 0,
          longitud: 0,
          descripcion: 'Descripción del sitio',
        }),
      });
      const data = await response.json();
      setSitios([...sitios, data]);
    } catch (error) {
      console.error('Error al crear el sitio:', error);
    }
  };

  return (
    <>
      <Header />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link href="/create-site" passHref>
          <CreateButton onClick={handleCreateSitio}>Crear Nuevo Sitio</CreateButton>
        </Link>
      </div>
      <div style={{ height: '600px' }}>
        <MapComponent sitios={sitios} />
      </div>
      <h2 style={{ fontSize: '2em', textAlign: 'center' }}>SEGÚN TUS GUSTOS</h2>

      <Carousel>
        <div>
          <img src="IMAGES/MUFI.png" style={{ width: '50%' }} />
          <p className="legend">MUSEO DE LA FILATELIA</p>
        </div>
        <div>
          <img src="IMAGES/SANTO.png" style={{ width: '50%' }} />
          <p className="legend">TEMPLO DE SANTO DOMINGO</p>
        </div>
        <div>
          <img src="IMAGES/JALATLACO.png" style={{ width: '50%' }} />
          <p className="legend">PUEBLO MÁGICO DE JALATLACO</p>
        </div>
      </Carousel>

      
    </>
  );
};

export default Mapa;
