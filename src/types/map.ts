// src/types/map.ts

export interface MapMarker {
  position: [number, number]; // [latitude, longitude]
  popup?: string;
  title?: string;
  id?: string | number;
}

export interface MapProps {
  center?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
  markers?: MapMarker[];
}

export interface MapLocation {
  name: string;
  coordinates: [number, number];
  description?: string;
  category?: string;
}