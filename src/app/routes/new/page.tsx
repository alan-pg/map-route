// src/app/routes/new/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { CreateRouteForm } from '@/components/CreateRouteForm';
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateRouteStore } from '@/store/createRouteStore';

const Map = dynamic(() => import('@/components/Map'), {
    loading: () => <Skeleton className="h-full w-full" />,
    ssr: false
});

export default function NewRoutePage() {
    const { mapCenter, mapZoom, mapMarkers, mapBounds, polyline } = useCreateRouteStore();

    return (
        // A classe 'h-screen' aqui é crucial para limitar a altura total
        <div className="grid md:grid-cols-[1fr_400px] lg:grid-cols-[1fr_480px] h-screen">
            <div className="h-full">
                <Map 
                    center={mapCenter} 
                    zoom={mapZoom} 
                    displayMarkers={mapMarkers}
                    bounds={mapBounds}
                    polyline={polyline}
                />
            </div>
             {/* A 'aside' com 'h-full' e 'flex' também é crucial */}
            <aside className="h-full bg-background border-l flex flex-col">
                <CreateRouteForm />
            </aside>
        </div>
    );
}