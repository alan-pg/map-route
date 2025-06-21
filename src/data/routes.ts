// src/data/routes.ts
import { Route } from "@/types/map";

export const routes: Route[] = [
  {
    id: 1,
    name: "Rota Centro-Sul",
    driverName: "Carlos Souza",
    schedule: "08:00 - 12:00",
    status: "Em Andamento",
    waypoints: [
      { name: "Ponto de Partida: Central do Brasil", coordinates: [-22.904, -43.189] },
      { name: "Parada 1: Largo do Machado", coordinates: [-22.930, -43.185] },
      { name: "Parada 2: Praia de Botafogo", coordinates: [-22.945, -43.180] },
      { name: "Ponto Final: Shopping RioSul", coordinates: [-22.955, -43.177] },
    ],
    path: [
        [-22.904, -43.189], [-22.915, -43.187], [-22.930, -43.185], 
        [-22.940, -43.182], [-22.945, -43.180], [-22.955, -43.177]
    ],
  },
  {
    id: 2,
    name: "Rota Barra-Recreio",
    driverName: "Ana Julia",
    schedule: "09:00 - 15:00",
    status: "Planejada",
    waypoints: [
      { name: "Ponto de Partida: Terminal Alvorada", coordinates: [-22.999, -43.365] },
      { name: "Parada 1: Posto 5, Barra", coordinates: [-23.012, -43.388] },
      { name: "Ponto Final: Pedra do Pontal", coordinates: [-23.033, -43.468] },
    ],
    path: [
        [-22.999, -43.365], [-23.005, -43.375], [-23.012, -43.388], 
        [-23.020, -43.420], [-23.033, -43.468]
    ],
  },
];