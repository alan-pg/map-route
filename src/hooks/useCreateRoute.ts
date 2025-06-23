// src/hooks/useCreateRoute.ts
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFieldArray } from 'react-hook-form';
import type { DisplayMarker } from '@/types/map';
import type { DragEndEvent } from '@dnd-kit/core';
import type { LatLngExpression } from 'leaflet';

// Schemas (sem alterações)
const routePointSchema = z.object({
  address: z.string().min(1, { message: "O endereço é obrigatório." }),
  placeId: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
});
const routeFormSchema = z.object({
  name: z.string().min(3, { message: "O nome da rota deve ter pelo menos 3 caracteres." }),
  driver: z.string().min(1, { message: "O nome do motorista é obrigatório." }),
  departureTime: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Por favor, insira uma data e hora válidas." }),
  origin: routePointSchema,
  destination: routePointSchema,
  intermediates: z.array(
    routePointSchema.extend({
        id: z.string(),
    })
  ),
  details: z.string().optional(),
});
export type RouteFormData = z.infer<typeof routeFormSchema>;

const RIO_CENTER: [number, number] = [-22.9068, -43.1729];

export function useCreateRoute() {
    const [mapMarkers, setMapMarkers] = useState<DisplayMarker[]>([]);
    const [mapCenter, setMapCenter] = useState<[number, number]>(RIO_CENTER);
    const [mapZoom, setMapZoom] = useState<number>(12);
    const [mapBounds, setMapBounds] = useState<LatLngExpression[] | null>(null);

    const form = useForm<RouteFormData>({
        resolver: zodResolver(routeFormSchema),
        defaultValues: {
            name: '',
            driver: '',
            departureTime: '',
            origin: { address: '' },
            destination: { address: '' },
            intermediates: [],
            details: '',
        },
        mode: 'onChange'
    });
    
    const { fields, append, remove, move } = useFieldArray({
        control: form.control, name: "intermediates", keyName: "fieldId"
    });
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = fields.findIndex((item) => item.id === active.id);
            const newIndex = fields.findIndex((item) => item.id === over.id);
            move(oldIndex, newIndex);
        }
    };
    
    const { watch } = form;
    useEffect(() => {
        const subscription = watch((value) => {
            const { origin, destination, intermediates } = value;
            const newMarkers: DisplayMarker[] = [];
            const pointsWithCoords: LatLngExpression[] = [];
            
            if (origin?.lat && origin?.lng) {
                newMarkers.push({ id: 'origin', position: [origin.lat, origin.lng], iconConfig: { type: 'start', label: 'O' }});
                pointsWithCoords.push([origin.lat, origin.lng]);
            }
            if (destination?.lat && destination?.lng) {
                newMarkers.push({ id: 'destination', position: [destination.lat, destination.lng], iconConfig: { type: 'end', label: 'D' }});
                pointsWithCoords.push([destination.lat, destination.lng]);
            }
            intermediates?.forEach((stop, index) => {
                if(stop?.lat && stop?.lng) {
                    newMarkers.push({ id: stop.id, position: [stop.lat, stop.lng], iconConfig: { type: 'intermediate', label: index + 1 }});
                    pointsWithCoords.push([stop.lat, stop.lng]);
                }
            });
    
            setMapMarkers(newMarkers);
    
            if (pointsWithCoords.length > 1) {
                setMapBounds(pointsWithCoords);
            } else if (pointsWithCoords.length === 1) {
                setMapCenter(pointsWithCoords[0] as [number, number]);
                setMapZoom(15);
                setMapBounds(null);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const onSubmit = (data: RouteFormData) => {
        console.log('Rota VÁLIDA a ser salva:', data);
    };

    return {
        form,
        fields,
        append,
        remove,
        handleDragEnd,
        onSubmit,
        mapMarkers,
        mapCenter,
        mapZoom,
        mapBounds,
    };
}