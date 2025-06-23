// src/app/api/place-details/route.ts
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get('placeId'); // O ID agora vem como 'places/PLACE_ID'
  const apiKey = process.env.Maps_API_KEY;

  if (!placeId) {
    return NextResponse.json({ error: 'placeId é obrigatório' }, { status: 400 });
  }

  if (!apiKey) {
    return NextResponse.json({ error: 'Chave de API do Google Maps não configurada' }, { status: 500 });
  }

  // A nova API requer que os campos sejam especificados
  const fields = 'location,displayName,formattedAddress';
  const url = `https://places.googleapis.com/v1/${placeId}`;

  try {
    const response = await axios.get(url, {
      params: {
        fields,
        languageCode: 'pt-BR'
      },
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
      },
    });
    
    return NextResponse.json(response.data);

  } catch (error: any) {
    console.error('Erro ao buscar detalhes do local:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Erro interno ao buscar detalhes' }, { status: 500 });
  }
}