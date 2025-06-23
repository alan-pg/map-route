// src/app/api/places-autocomplete/route.ts
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { input } = await request.json();
  const apiKey = process.env.Maps_API_KEY;

  if (!input) {
    return NextResponse.json({ error: 'Input é obrigatório' }, { status: 400 });
  }

  if (!apiKey) {
    return NextResponse.json({ error: 'Chave de API do Google Maps não configurada' }, { status: 500 });
  }
  
  // Endpoint da nova Places API
  const url = 'https://places.googleapis.com/v1/places:autocomplete';

  const requestBody = {
    input,
    languageCode: 'pt-BR',
    includedRegionCodes: ['br'], // Prioriza resultados no Brasil
  };

  try {
    const response = await axios.post(url, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
      },
    });
console.log('Response from Places API:', response.data);
    // O formato da resposta da nova API é um pouco diferente
    return NextResponse.json(response.data.suggestions || []);
  } catch (error: any) {
    console.error('Erro ao buscar sugestões de endereço:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Erro interno ao buscar sugestões' }, { status: 500 });
  }
}