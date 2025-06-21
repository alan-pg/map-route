// src/app/api/calculate-route/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';
import { exampleRoute } from '@/data/googleRouteExample';

// Definindo um tipo para a requisição para maior clareza
interface CalculateRouteRequest {
  origin: { lat: number, lng: number };
  destination: { lat: number, lng: number };
  intermediates?: { location: { latLng: { lat: number, lng: number } } }[];
  departureTime?: string; // Formato ISO 8601, ex: "2025-06-21T10:00:00-03:00"
}

/**
 * Este é um Route Handler que calcula uma rota usando a API do Google.
 * Ele recebe uma requisição POST com origem, destino e, opcionalmente,
 * paradas intermediárias e uma data de partida.
 */
export async function POST(request: Request) {
  try {
    const { origin, destination, intermediates, departureTime }: CalculateRouteRequest = await request.json();

    if (!origin?.lat || !destination?.lat) {
      return NextResponse.json({ error: 'Origem e destino são obrigatórios.' }, { status: 400 });
    }
    
    const apiKey = process.env.Maps_API_KEY;
    if (!apiKey) {
      console.error('A chave da API do Google não foi configurada no .env.local');
      return NextResponse.json({ error: 'Erro de configuração do servidor.' }, { status: 500 });
    }

    // --- Montagem dinâmica do corpo da requisição para a API do Google ---
    const requestBody: any = {
      origin: { location: { latLng: origin } },
      destination: { location: { latLng: destination } },
      travelMode: 'DRIVE',
      routingPreference: 'TRAFFIC_AWARE', // Essencial para usar departureTime
      languageCode: 'pt-BR',
      units: 'METRIC'
    };

    // Adiciona os pontos intermediários se eles forem fornecidos
    if (intermediates && intermediates.length > 0) {
      requestBody.intermediates = intermediates;
    }

    // Adiciona o tempo de partida se for fornecido
    if (departureTime) {
      requestBody.departureTime = departureTime;
    }


    // --- MODO DE SIMULAÇÃO (MOCK) ---
    // Para que a rota seja "funcional" sem uma chave de API real.
    if (process.env.NODE_ENV !== 'production' || !apiKey.startsWith('AIza')) {
      console.log('API de Rotas em modo de simulação. Corpo da requisição que SERIA enviado:', JSON.stringify(requestBody, null, 2));
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      return NextResponse.json(exampleRoute);
    }
    

    // --- CÓDIGO PARA A CHAMADA REAL À API DO GOOGLE (PARA PRODUÇÃO) ---
    console.log('API de Rotas em modo real. Fazendo requisição para o Google...');
    
    const response = await axios.post(
      'https://routes.googleapis.com/directions/v2:computeRoutes',
      requestBody, // Usa o corpo da requisição montado dinamicamente
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline,routes.legs',
        },
      }
    );

    if (response.data.routes && response.data.routes.length > 0) {
      return NextResponse.json(response.data.routes[0]);
    } else {
      return NextResponse.json({ error: 'Nenhuma rota encontrada.' }, { status: 404 });
    }

  } catch (error: any) {
    console.error("Erro no endpoint /api/calculate-route:", error.response?.data || error.message);
    return NextResponse.json({ error: 'Falha ao calcular a rota.' }, { status: 500 });
  }
}