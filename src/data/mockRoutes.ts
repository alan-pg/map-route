// src/data/mockRoutes.ts
import { GoogleRoute } from "@/types/map";

// Usando uma versão modificada do seu exemplo para criar variedade
const createRoute = (id: number, status: 'Planejada' | 'Em Andamento' | 'Concluída'): GoogleRoute => ({
  id_rota: `RIO-${1750205285826 + id}`,
  data_criacao: new Date(new Date().getTime() - id * 24 * 60 * 60 * 1000).toISOString(),
  status: status, // Adicionamos um status para o filtro
  motorista: ['Carlos Souza', 'Ana Julia', 'Marcos Silva', 'Beatriz Lima'][id % 4],
  resumo: {
    distancia_total: { texto: `${(43.5 - id * 2).toFixed(1)} km`, valor_metros: 43503 - id * 2000 },
    duracao_total: { texto: `1 hora e ${27 - id} minutos`, valor_segundos: 5206 - id * 60 }
  },
  paradas: [
    {
      sequencia: 1, tipo: 'ORIGEM', nome: `Ponto de Partida ${id + 1}`,
      endereco: "Endereço Origem, Rio de Janeiro - RJ",
      coordenadas: { lat: -22.951916, lng: -43.2104872 },
      percurso_proxima_parada: { distancia: { texto: '15,8 km', valor_metros: 15782 }, duracao: { texto: '41 minutos', valor_segundos: 2440 }, polyline: "..." }
    },
    {
      sequencia: 2, tipo: 'PARADA_INTERMEDIARIA', nome: 'Parada Intermediária',
      endereco: "Endereço Parada, Rio de Janeiro - RJ",
      coordenadas: { lat: -22.9496034, lng: -43.1572284 },
      percurso_proxima_parada: { distancia: { texto: '13,1 km', valor_metros: 13114 }, duracao: { texto: '24 minutos', valor_segundos: 1429 }, polyline: "..." }
    },
    {
      sequencia: 3, tipo: 'DESTINO', nome: `Ponto Final ${id + 1}`,
      endereco: "Endereço Destino, Rio de Janeiro - RJ",
      coordenadas: { lat: -22.9712952, lng: -43.1825988 },
      percurso_proxima_parada: null
    }
  ]
});

export const mockRoutes: GoogleRoute[] = [
  createRoute(0, 'Em Andamento'),
  createRoute(1, 'Concluída'),
  createRoute(2, 'Concluída'),
  createRoute(3, 'Planejada'),
  createRoute(4, 'Planejada'),
  createRoute(5, 'Em Andamento'),
  createRoute(6, 'Concluída'),
  createRoute(7, 'Planejada'),
  createRoute(8, 'Em Andamento'),
  createRoute(9, 'Concluída'),
  createRoute(10, 'Planejada'),
  createRoute(11, 'Concluída'),
  createRoute(12, 'Em Andamento'),
];