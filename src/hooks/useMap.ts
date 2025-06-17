// src/hooks/useMap.ts
'use client';

import { useState, useCallback } from 'react';
import { MapMarker, MapLocation } from '@/types/map';

export interface UseMapReturn {
  markers: MapMarker[];
  center: [number, number];
  zoom: number;
  addMarker: (marker: MapMarker) => void;
  removeMarker: (index: number) => void;
  clearMarkers: () => void;
  setCenter: (center: [number, number]) => void;
  setZoom: (zoom: number) => void;
  addLocation: (location: MapLocation) => void;
}

export function useMap(
  initialCenter: [number, number] = [-23.5505, -46.6333],
  initialZoom: number = 13,
  initialMarkers: MapMarker[] = []
): UseMapReturn {
  const [markers, setMarkers] = useState<MapMarker[]>(initialMarkers);
  const [center, setCenter] = useState<[number, number]>(initialCenter);
  const [zoom, setZoom] = useState<number>(initialZoom);

  const addMarker = useCallback((marker: MapMarker) => {
    setMarkers(prev => [...prev, { ...marker, id: Date.now() }]);
  }, []);

  const removeMarker = useCallback((index: number) => {
    setMarkers(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearMarkers = useCallback(() => {
    setMarkers([]);
  }, []);

  const addLocation = useCallback((location: MapLocation) => {
    const marker: MapMarker = {
      position: location.coordinates,
      title: location.name,
      popup: location.description ? 
        `<b>${location.name}</b><br>${location.description}` : 
        `<b>${location.name}</b>`,
      id: Date.now()
    };
    addMarker(marker);
  }, [addMarker]);

  return {
    markers,
    center,
    zoom,
    addMarker,
    removeMarker,
    clearMarkers,
    setCenter,
    setZoom,
    addLocation
  };
}