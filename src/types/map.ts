// src/types/map.ts
import type L from "leaflet";

/**
 * Representa um marcador que será renderizado diretamente pelo react-leaflet.
 * Usado internamente pelo componente Map.tsx.
 */
export interface MapMarker {
  id?: string | number;
  position: [number, number];
  popup?: string;
  icon?: L.Icon | L.DivIcon;
}

/**
 * Tipos para os itens que podem ser rastreados individualmente.
 */
export type TrackableItemType = "vehicle" | "tag" | "smartphone";

export interface TrackableItem {
  id: number;
  name: string;
  type: TrackableItemType;
  coordinates: [number, number];
  status: string;
  lastUpdate: string;
  speed?: number;
  battery?: number;
}

/**
 * Tipos para a funcionalidade de Rotas.
 */
export interface Waypoint {
  name: string;
  coordinates: [number, number];
  details?: string;
}

export interface Route {
  id: number;
  name: string;
  driverName: string;
  schedule: string;
  status: "Planejada" | "Em Andamento" | "Concluída";
  waypoints: Waypoint[];
  path: [number, number][];
}

/**
 * Tipos para a comunicação entre a página e o componente de mapa.
 * Esta é uma representação agnóstica de um marcador, contendo apenas os dados
 * necessários para a sua configuração, sem depender de objetos do Leaflet.
 */
export type DisplayIconType =
  | TrackableItemType
  | "start"
  | "end"
  | "intermediate";

export interface DisplayMarker {
  id: string | number;
  position: [number, number];
  popup?: string;
  iconConfig: {
    type: DisplayIconType;
    label?: string | number;
    isActive?: boolean;
  };
}


// --- NOVOS TIPOS COMPATÍVEIS COM A API DE ROTAS DO GOOGLE ---

interface TextValue {
  texto: string;
}

interface Distance extends TextValue {
  valor_metros: number;
}

interface Duration extends TextValue {
  valor_segundos: number;
}

interface Leg {
  distancia: Distance;
  duracao: Duration;
  polyline: string; // A polyline codificada
}

export interface Stop {
  sequencia: number;
  tipo: 'ORIGEM' | 'PARADA_INTERMEDIARIA' | 'DESTINO';
  nome: string;
  endereco: string;
  coordenadas: {
    lat: number;
    lng: number;
  };
  percurso_proxima_parada: Leg | null;
}

export interface GoogleRoute {
  id_rota: string;
  data_criacao: string;
  resumo: {
    distancia_total: Distance;
    duracao_total: Duration;
  };
  paradas: Stop[];
}

export interface GoogleRoute {
  id_rota: string;
  data_criacao: string;
  status: 'Planejada' | 'Em Andamento' | 'Concluída'; // Adicione este campo
  motorista: string; // Adicione este campo
  resumo: {
    distancia_total: Distance;
    duracao_total: Duration;
  };
  paradas: Stop[];
}