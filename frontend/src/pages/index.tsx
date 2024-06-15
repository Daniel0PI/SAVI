// pages/Mapa.tsx
import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic'; // Importar dinámicamente Leaflet para asegurar que se cargue solo en el cliente
import 'leaflet/dist/leaflet.css'; // Estilos de Leaflet
import Header from '../components/header'; // Importa tu componente Header
import { Carousel } from 'react-responsive-carousel'; // Importa Carousel
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Importa los estilos de Carousel



const MapComponent = dynamic(() => import('../components/MapComponet'), {
  ssr: false // Evitar la representación del lado del servidor para Leaflet
});

const Mapa: React.FC = () => {
  return (
    <>
      <Header /> {/* Usa tu componente Header */}
      <div style={{ height: '400px' }}>
        <MapComponent />
      </div>
      <h2 style={{ fontSize: '2em', textAlign: 'center' }}>SEGUN TUS GUSTOS</h2> {/* Agrega tu texto con estilo */}
    

   <Carousel> 
        <div>
      
          <img src="IMAGES/MUFI.png" style={{ width: '50%' }}/>
          <p className="legend">MUSEO DE LA FILATELIA</p>
        </div>

        <div>
          <img src="IMAGES/SANTO.png" style={{ width: '50%' }}/>
          <p className="legend">TEMPLO DE SANTO DOMINGO</p>
        </div>

        <div>
          <img src="IMAGES/JALATLACO.png" style={{ width: '50%' }}/>
          <p className="legend">PUEBLO MAGICO DE JALATALCO</p>
        </div>
        
      </Carousel>
    </>
  );
};

export default Mapa;