// src/components/Map.tsx
'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

import { useEffect, type ReactNode } from 'react';
import { MapContainer, TileLayer, useMap, Polyline } from 'react-leaflet';
import type { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import CustomMarker from './map/CustomMarker';
import type { DisplayMarker } from '@/types/map';

// Componente que reage a mudanças e atualiza a visão do mapa
function MapViewUpdater({ center, zoom, bounds }: { center: LatLngExpression, zoom: number, bounds?: LatLngBoundsExpression }) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      map.setView(center, zoom);
    }
  }, [center, zoom, bounds, map]);

  return null;
}

export interface MapProps {
  center: LatLngExpression;
  zoom: number;
  displayMarkers?: DisplayMarker[];
  polyline?: [number, number][];
  bounds?: LatLngBoundsExpression;
}

export default function Map({ center, zoom, bounds, displayMarkers = [], polyline }: MapProps) {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />

      <MapViewUpdater center={center} zoom={zoom} bounds={bounds} />

      {displayMarkers.map(marker => (
        <CustomMarker key={marker.id} data={marker} />
      ))}

      {/* Efeito de "casing" para a rota (linha mais grossa por baixo) */}
      {polyline && <Polyline pathOptions={{ color: '#A8D8FF', weight: 9, opacity: 0.8 }} positions={polyline} />}
      {polyline && <Polyline pathOptions={{ color: '#0052D4', weight: 5, opacity: 1 }} positions={polyline} />}
    </MapContainer>
  );
}