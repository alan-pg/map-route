// src/components/map/CustomMarker.tsx
'use client';

import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { FaCarSide, FaTag, FaMobileAlt, FaFlagCheckered, FaMapMarkerAlt } from 'react-icons/fa';
import type { DisplayMarker } from '@/types/map';

// --- A lógica de criação de ícones agora vive aqui dentro ---

const iconStyles = {
  vehicle: { color: '#2563eb', icon: <FaCarSide size={20} color="white" /> },
  tag: { color: '#9333ea', icon: <FaTag size={18} color="white" /> },
  smartphone: { color: '#16a34a', icon: <FaMobileAlt size={20} color="white" /> },
  start: { color: '#059669', icon: <FaMapMarkerAlt size={14} color="white" /> },
  end: { color: '#e11d48', icon: <FaFlagCheckered size={14} color="white" /> },
  intermediate: { color: '#64748b', icon: null },
};

function createLeafletIcon(data: DisplayMarker['iconConfig']) {
  const { type, label, isActive = false } = data;
  const style = iconStyles[type];
  const size = type === 'intermediate' ? 28 : 38;

  // Monta a string de classes CSS dinamicamente
  const pinClasses = [
    'map-pin',
    isActive ? 'map-pin-active' : '',
    type.startsWith('waypoint') ? `pin-waypoint pin-${type}` : `pin-${type}`,
  ].join(' ');

  // Gera o HTML do ícone
  const iconHtml = renderToStaticMarkup(
    <div className={pinClasses}>
      <div className="map-pin-content">
        {style.icon ? style.icon : <span>{label}</span>}
      </div>
    </div>
  );

  return L.divIcon({
    html: iconHtml,
    className: '', // A classe já está no HTML
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
  });
}

// --- O componente principal ---

interface CustomMarkerProps {
  data: DisplayMarker;
}

export default function CustomMarker({ data }: CustomMarkerProps) {
  const customIcon = createLeafletIcon(data.iconConfig);

  return (
    <Marker position={data.position} icon={customIcon}>
      {data.popup && <Popup>{data.popup}</Popup>}
    </Marker>
  );
}