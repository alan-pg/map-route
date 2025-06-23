// src/store/createRouteStore.ts
import { create } from 'zustand';
import axios from 'axios';
import type { LatLngExpression } from 'leaflet';
import type { DisplayMarker } from '@/types/map';
import type { PlaceDetails } from '@/components/AddressAutocomplete';

interface Waypoint {
  id: string;
  address: string;
  placeId?: string;
  lat?: number;
  lng?: number;
}

// O resumo agora inclui a hora de chegada
interface RouteSummary {
    duration: string;
    distance: string;
    arrivalTime: string;
}

interface CreateRouteState {
  name: string;
  driver: string;
  departureTime: string;
  details: string;
  waypoints: Waypoint[];
  mapMarkers: DisplayMarker[];
  mapCenter: [number, number];
  mapZoom: number;
  mapBounds: LatLngExpression[] | null;
  polyline: [number, number][];
  isCalculatingRoute: boolean;
  routeSummary: RouteSummary | null;
  
  setFormField: (field: 'name' | 'driver' | 'departureTime' | 'details', value: string) => void;
  setPlace: (index: number, place: PlaceDetails) => void;
  addWaypoint: () => void;
  removeWaypoint: (id: string) => void;
  reorderWaypoints: (from: number, to: number) => void;
  calculateRoute: () => Promise<void>;
}

const RIO_CENTER: [number, number] = [-22.9068, -43.1729];

const updateMapState = (get: () => CreateRouteState) => {
    // ... (função sem alterações)
    const { waypoints } = get();
    const newMarkers: DisplayMarker[] = []; const pointsWithCoords: LatLngExpression[] = [];
    waypoints.forEach((waypoint, index) => {
        if (waypoint.lat && waypoint.lng) {
            newMarkers.push({ id: waypoint.id, position: [waypoint.lat, waypoint.lng], iconConfig: { type: 'intermediate', label: index + 1 }});
            pointsWithCoords.push([waypoint.lat, waypoint.lng]);
        }
    });
    if (pointsWithCoords.length > 1) { return { mapMarkers: newMarkers, mapBounds: pointsWithCoords }; }
    if (pointsWithCoords.length === 1) { return { mapMarkers: newMarkers, mapBounds: null, mapCenter: pointsWithCoords[0] as [number, number], mapZoom: 15 }; }
    return { mapMarkers: newMarkers, mapBounds: null, mapCenter: RIO_CENTER, mapZoom: 12 };
}

const formatDuration = (durationString: string): string => { /* ... (sem alterações) */ 
    const seconds = parseInt(durationString.replace('s', ''), 10);
    if (isNaN(seconds)) return '';
    const minutes = Math.ceil(seconds / 60);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
};

// Nova função para calcular a hora de chegada
const calculateArrivalTime = (departureTime: string, durationString: string): string => {
    if (!departureTime || !durationString) return '--:--';
    try {
        const departureDate = new Date(departureTime);
        const durationSeconds = parseInt(durationString.replace('s', ''), 10);
        if (isNaN(durationSeconds)) return '--:--';

        const arrivalDate = new Date(departureDate.getTime() + durationSeconds * 1000);
        const hours = arrivalDate.getHours().toString().padStart(2, '0');
        const minutes = arrivalDate.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    } catch (e) {
        return '--:--';
    }
};


export const useCreateRouteStore = create<CreateRouteState>((set, get) => ({
  // ... (estado inicial)
  name: '', driver: '', departureTime: '', details: '',
  waypoints: [ { id: crypto.randomUUID(), address: '' }, { id: crypto.randomUUID(), address: '' } ],
  mapMarkers: [], mapCenter: RIO_CENTER, mapZoom: 12, mapBounds: null, polyline: [],
  isCalculatingRoute: false, routeSummary: null,

  // ... (outras ações)
  setFormField: (field, value) => set({ [field]: value }),
  addWaypoint: () => { set(state => ({ waypoints: [...state.waypoints, { id: crypto.randomUUID(), address: '' }] })); },
  removeWaypoint: (id) => { if (get().waypoints.length <= 2) return; set(state => ({ waypoints: state.waypoints.filter(w => w.id !== id) })); set({ polyline: [], routeSummary: null }); set(updateMapState(get)); get().calculateRoute(); },
  reorderWaypoints: (from, to) => { set(state => { const reordered = Array.from(state.waypoints); const [moved] = reordered.splice(from, 1); reordered.splice(to, 0, moved); return { waypoints: reordered }; }); set({ polyline: [], routeSummary: null }); set(updateMapState(get)); get().calculateRoute(); },
  setPlace: (index, place) => { set(state => { const newWaypoints = [...state.waypoints]; if (newWaypoints[index]) { newWaypoints[index] = { ...newWaypoints[index], ...place }; } return { waypoints: newWaypoints }; }); set({ polyline: [], routeSummary: null }); set(updateMapState(get)); get().calculateRoute(); },

  calculateRoute: async () => {
    set({ isCalculatingRoute: true, polyline: [], routeSummary: null });
    const { waypoints, departureTime } = get();
    const pointsWithCoords = waypoints.filter(p => p.lat && p.lng);
    if (pointsWithCoords.length < 2) { set({ isCalculatingRoute: false }); return; }
    try {
      const response = await axios.post('/api/calculate-route', {
        waypoints: pointsWithCoords.map(p => ({ lat: p.lat!, lng: p.lng! }))
      });
      const { polyline, duration, distanceMeters } = response.data;
      if (polyline) {
        const summary = {
            duration: formatDuration(duration),
            distance: `${(distanceMeters / 1000).toFixed(1)} km`,
            // Calcula e adiciona a hora de chegada
            arrivalTime: calculateArrivalTime(departureTime, duration)
        };
        set({ polyline, mapBounds: polyline, routeSummary: summary });
      }
    } catch (error) { console.error("Erro ao calcular a rota:", error);
    } finally { set({ isCalculatingRoute: false }); }
  }
}));