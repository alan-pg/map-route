// src/app/map/page.tsx
'use client';

import dynamic from 'next/dynamic';
import MapSidebar from '@/components/TrackableItemsSidebar';
import { trackableItems } from '@/data/trackable-items';
import { exampleRoute } from '@/data/googleRouteExample';
import { Skeleton } from "@/components/ui/skeleton";
import { useMap } from '@/hooks/useMap';

const Map = dynamic(() => import('@/components/Map'), {
    loading: () => <Skeleton className="h-full w-full" />,
    ssr: false
});

export default function MapPage() {
  const {
    displayMarkers,
    activePolyline,
    mapCenter,
    mapZoom,
    selectedItemId,
    bounds,
    selectItem,
    selectRoute
  } = useMap();

  return (
    <div className="flex h-screen">
      <div className="flex-1 h-full">
        <Map
          center={mapCenter}
          zoom={mapZoom}
          bounds={bounds}
          displayMarkers={displayMarkers}
          polyline={activePolyline}
        />
      </div>
      <MapSidebar
        items={trackableItems}
        routes={[exampleRoute]} // Passamos a rota como um array
        selectedItemId={selectedItemId}
        onItemSelect={selectItem}
        onRouteSelect={selectRoute}
      />
    </div>
  );
}