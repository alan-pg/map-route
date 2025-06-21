// src/data/trackable-items.ts
import { TrackableItem } from "@/types/map";

export const trackableItems: TrackableItem[] = [
  {
    id: 1,
    name: "Caminhão de Entregas",
    type: "vehicle",
    coordinates: [-22.9083, -43.1964],
    status: "Em Movimento",
    speed: 45,
    lastUpdate: "Agora",
  },
  {
    id: 2,
    name: "Tag da Carga 78B",
    type: "tag",
    coordinates: [-22.9519, -43.2105],
    status: "Parado",
    battery: 80,
    lastUpdate: "2 min atrás",
  },
  {
    id: 3,
    name: "Celular do Entregador",
    type: "smartphone",
    coordinates: [-22.9772, -43.1896],
    status: "Bateria Fraca",
    battery: 15,
    lastUpdate: "10 min atrás",
  },
  {
    id: 4,
    name: "Viatura de Segurança",
    type: "vehicle",
    coordinates: [-22.8436, -43.2446],
    status: "Offline",
    lastUpdate: "1 hora atrás",
  },
  {
    id: 5,
    name: "Carro de Vendas 03",
    type: "vehicle",
    coordinates: [-22.9845, -43.2202],
    status: "Parado",
    speed: 0,
    lastUpdate: "5 min atrás",
  },
];