// components/MapComponent.tsx
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

type Sitio = {
  nombre: string;
  latitud: number;
  longitud: number;
  descripcion: string;
};

interface MapComponentProps {
  sitios: [number, Sitio][];
}

const MapComponent: React.FC<MapComponentProps> = ({ sitios }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current) {
      const map = L.map(mapRef.current).setView([17.06637811236944, -96.72308597720262], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      sitios.forEach(([id, sitio]) => {
        'uhaa'
        L.marker([sitio.latitud, sitio.longitud])
          .addTo(map)
          .bindPopup(`<b>${sitio.nombre}</b><br>${sitio.descripcion}`);
      });
    }
  }, [sitios]);

  return <div ref={mapRef} style={{ height: '100%' }} />;
};

export default MapComponent;
