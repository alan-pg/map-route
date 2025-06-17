// src/app/map/page.tsx
'use client';

import { useState } from 'react';
import Map from '@/components/Map';

export default function MapPage() {
  // Coordenadas de exemplo (pontos interessantes do Rio de Janeiro)
  const [markers] = useState([
    {
      position: [-22.9068, -43.1729] as [number, number],
      popup: '<b>Cristo Redentor</b><br>Uma das 7 maravilhas do mundo moderno',
      title: 'Cristo Redentor'
    },
    {
      position: [-22.9711, -43.1822] as [number, number],
      popup: '<b>Pão de Açúcar</b><br>Cartão postal do Rio de Janeiro',
      title: 'Pão de Açúcar'
    },
    {
      position: [-22.9732, -43.1896] as [number, number],
      popup: '<b>Praia de Copacabana</b><br>A princesinha do mar',
      title: 'Copacabana'
    },
    {
      position: [-22.9838, -43.2096] as [number, number],
      popup: '<b>Praia de Ipanema</b><br>Garota de Ipanema',
      title: 'Ipanema'
    }
  ]);

  return (
    <div className="h-screen">
      {/* Mapa ocupando toda a área disponível (descontando a sidebar) */}
      <Map
        center={[-22.9068, -43.1729]} // Cristo Redentor como centro
        zoom={12}
        height="100vh"
        markers={markers}
        className="w-full"
      />
    </div>
  );
}