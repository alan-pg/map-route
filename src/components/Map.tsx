// src/components/Map.tsx
'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet'; // O import fica seguro aqui
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import CustomMarker from './map/CustomMarker';
import type { DisplayMarker } from '@/types/map';

interface MapViewUpdaterProps {
  center: LatLngExpression;
  zoom: number;
  bounds?: LatLngExpression[] | null;
}

function MapViewUpdater({ center, zoom, bounds }: MapViewUpdaterProps) {
  const map = useMap();

  useEffect(() => {
    // A criação do objeto do Leaflet acontece aqui, de forma segura no cliente.
    if (bounds && bounds.length > 0) {
      try {
        const leafletBounds = L.latLngBounds(bounds);
        if (leafletBounds.isValid()) {
          map.fitBounds(leafletBounds, { padding: [50, 50] });
        } else {
            map.setView(center, zoom);
        }
      } catch (error) {
        console.error("Erro ao criar bounds do Leaflet:", error);
        map.setView(center, zoom);
      }
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
  bounds?: LatLngExpression[] | null;
}

export default function Map({ center, zoom, bounds, displayMarkers = [], polyline }: MapProps) {
  console.log('markers', displayMarkers);
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />

      <MapViewUpdater center={center} zoom={zoom} bounds={bounds} />

      {displayMarkers.map(marker => (
        <CustomMarker key={marker.id} data={marker} />
      ))}

      {polyline && polyline.length > 0 && (
        <>
            <Polyline pathOptions={{ color: '#A8D8FF', weight: 9, opacity: 0.8 }} positions={polyline} />
            <Polyline pathOptions={{ color: '#0052D4', weight: 5, opacity: 1 }} positions={polyline} />
        </>
      )}
    </MapContainer>
  );
}