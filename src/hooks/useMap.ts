// src/hooks/useMap.ts
"use client";

import { useState } from "react";
import { decode } from "@googlemaps/polyline-codec";
import type { LatLngBoundsExpression } from "leaflet";
import type { DisplayMarker, TrackableItem, GoogleRoute } from "@/types/map";

export function useMap() {
  const [displayMarkers, setDisplayMarkers] = useState<DisplayMarker[]>([]);
  const [activePolyline, setActivePolyline] = useState<
    [number, number][] | undefined
  >(undefined);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    -22.9121329, -43.2301388,
  ]); // Centralizado no Maracanã
  const [mapZoom, setMapZoom] = useState<number>(12);
  const [selectedItemId, setSelectedItemId] = useState<string | number | null>(
    null
  );
  const [bounds, setBounds] = useState<LatLngBoundsExpression | undefined>(
    undefined
  );

  const clearMap = () => {
    setDisplayMarkers([]);
    setActivePolyline(undefined);
    setSelectedItemId(null);
    setBounds(undefined);
  };

  const selectItem = (item: TrackableItem) => {
    clearMap();
    setDisplayMarkers([
      {
        id: item.id,
        position: [item.coordinates.lat, item.coordinates.lng],
        popup: `<b>${item.name}</b><br>Status: ${item.status}`,
        iconConfig: { type: item.type, isActive: true },
      },
    ]);
    setMapCenter([item.coordinates.lat, item.coordinates.lng]);
    setMapZoom(16); // Zoom mais próximo para um único item
    setSelectedItemId(item.id);
  };

  const selectRoute = (route: GoogleRoute) => {
    clearMap();

    const waypointsAsDisplayMarkers: DisplayMarker[] = route.paradas.map(
      (parada) => {
        let type: "start" | "intermediate" | "end" = "intermediate";
        if (parada.tipo === "ORIGEM") type = "start";
        else if (parada.tipo === "DESTINO") type = "end";

        return {
          id: parada.sequencia,
          position: [parada.coordenadas.lat, parada.coordenadas.lng],
          popup: `<b>${parada.nome}</b><br>${parada.endereco}`,
          iconConfig: { type, label: parada.sequencia, isActive: false },
        };
      }
    );

    const fullPath: [number, number][] = route.paradas
      .filter((p) => p.percurso_proxima_parada)
      .flatMap((p) => decode(p.percurso_proxima_parada!.polyline, 5)); // Precisão 5 é o padrão

    console.log("Full path:", fullPath[0], fullPath[fullPath.length - 1]);
    
    setDisplayMarkers(waypointsAsDisplayMarkers);
    setActivePolyline(fullPath);
    if (fullPath.length > 0) setBounds(fullPath);
    setSelectedItemId(route.id_rota);
  };

  return {
    displayMarkers,
    activePolyline,
    mapCenter,
    mapZoom,
    selectedItemId,
    bounds,
    selectItem,
    selectRoute,
  };
}
