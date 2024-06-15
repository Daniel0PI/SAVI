// components/MapComponent.tsx
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Verificar que estamos en el entorno del navegador antes de crear el mapa
    if (typeof window !== 'undefined' && mapRef.current) {
      // Crear mapa
      const map = L.map(mapRef.current).setView([17.06637811236944, -96.72308597720262], 13);

      // Añadir capa de mapa base
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    }
  }, []);

  return <div ref={mapRef} style={{ height: '100%' }} />;
};

export default MapComponent;