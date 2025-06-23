// src/components/map/CustomMarker.tsx
'use client';

import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { FaCarSide, FaTag, FaMobileAlt } from 'react-icons/fa';
import type { DisplayMarker } from '@/types/map';

const iconStyles = {
  vehicle: { icon: <FaCarSide size={20} color="white" /> },
  tag: { icon: <FaTag size={18} color="white" /> },
  smartphone: { icon: <FaMobileAlt size={20} color="white" /> },
  // Os tipos 'start' e 'end' não são mais necessários aqui
  intermediate: { icon: null }, // Este será o nosso marcador numérico padrão
};

const pinColorClasses = {
    vehicle: "bg-blue-600",
    tag: "bg-purple-600",
    smartphone: "bg-green-600",
    // Removemos as cores específicas de start/end
    intermediate: "bg-slate-700", // Usaremos uma cor padrão para todos os pontos
}

function createLeafletIcon(data: DisplayMarker['iconConfig']) {
  const { type, label, isActive = false } = data;
  const style = iconStyles[type as keyof typeof iconStyles];
  const colorClass = pinColorClasses[type as keyof typeof pinColorClasses] || 'bg-gray-500';
  // Todos os marcadores da rota agora terão o mesmo tamanho
  const size = type === 'intermediate' ? 28 : 38;

  const pinClasses = [
    'map-pin',
    'flex justify-center items-center',
    isActive ? 'map-pin-active' : '',
    colorClass
  ].join(' ');

  // O conteúdo será o ícone (para veículos, etc.) ou o rótulo numérico
  const content = style?.icon ? style.icon : <span className="text-white font-bold text-sm">{label}</span>;

  const iconHtml = renderToStaticMarkup(
    <div className={pinClasses} style={{ width: `${size}px`, height: `${size}px`}}>
      <div className="map-pin-content">
        {content}
      </div>
    </div>
  );

  return L.divIcon({
    html: iconHtml,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size], 
    popupAnchor: [0, -size]
  });
}

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