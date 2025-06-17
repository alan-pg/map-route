// src/components/Map.tsx
'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';

// Fix para ícones do Leaflet no Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapProps {
  center?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
  markers?: Array<{
    position: [number, number];
    popup?: string;
    title?: string;
  }>;
}

export default function Map({ 
  center = [-23.5505, -46.6333], // São Paulo como padrão
  zoom = 13,
  height = '400px',
  className = '',
  markers = []
}: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Verificar se o mapa já foi inicializado
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Criar nova instância do mapa
    const map = L.map(mapRef.current).setView(center, zoom);

    // Adicionar tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Adicionar marcadores
    markers.forEach(marker => {
      const leafletMarker = L.marker(marker.position).addTo(map);
      
      if (marker.popup) {
        leafletMarker.bindPopup(marker.popup);
      }
      
      if (marker.title) {
        leafletMarker.bindTooltip(marker.title);
      }
    });

    mapInstanceRef.current = map;

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom, markers]);

  return (
    <div 
      ref={mapRef} 
      style={{ height }} 
      className={`w-full rounded-lg border border-gray-200 dark:border-gray-700 ${className}`}
    />
  );
}