// src/app/api/calculate-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { decode } from "@googlemaps/polyline-codec";

interface Waypoint {
  lat: number;
  lng: number;
}

export async function POST(request: NextRequest) {
  const { waypoints }: { waypoints: Waypoint[] } = await request.json();
  const apiKey = process.env.Maps_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Chave de API do Google Maps não configurada" }, { status: 500 });
  }
  if (!waypoints || waypoints.length < 2) {
    return NextResponse.json({ error: "São necessários pelo menos 2 pontos" }, { status: 400 });
  }

  const origin = waypoints[0];
  const destination = waypoints[waypoints.length - 1];
  const intermediates = waypoints.slice(1, -1);

  const requestBody: any = {
    origin: { location: { latLng: { latitude: origin.lat, longitude: origin.lng } } },
    destination: { location: { latLng: { latitude: destination.lat, longitude: destination.lng } } },
    travelMode: "DRIVE",
    routingPreference: "TRAFFIC_AWARE",
    polylineEncoding: "ENCODED_POLYLINE",
  };
  
  if (intermediates.length > 0) {
    requestBody.intermediates = intermediates.map(point => ({ 
        location: { latLng: { latitude: point.lat, longitude: point.lng } } 
    }));
  }

  try {
    const response = await axios.post(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
        },
      }
    );

    const route = response.data.routes?.[0];
    if (route) {
        const decodedPolyline = route.polyline?.encodedPolyline ? decode(route.polyline.encodedPolyline, 5) : [];
        
        // CORREÇÃO: Retornando um objeto completo
        return NextResponse.json({ 
            polyline: decodedPolyline,
            duration: route.duration,
            distanceMeters: route.distanceMeters,
        });
    }

    return NextResponse.json({ error: "Não foi possível calcular a rota" }, { status: 500 });

  } catch (error: any) {
    console.error("Erro na API do Google Routes:", error.response?.data || error.message);
    return NextResponse.json({ error: "Erro ao chamar a API do Google" }, { status: 500 });
  }
}