// pages/Mapa.tsx
import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic'; // Importar dinámicamente Leaflet para asegurar que se cargue solo en el cliente
import 'leaflet/dist/leaflet.css'; // Estilos de Leaflet

const MapComponent = dynamic(() => import('../components/MapComponent'), {
  ssr: false // Evitar la representación del lado del servidor para Leaflet
});

const Mapa: React.FC = () => {
  return (
    <div style={{ height: '400px' }}>
      <MapComponent />
    </div>
  );
};

export default Mapa;
