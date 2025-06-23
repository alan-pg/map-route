// src/components/SortableStop.tsx
'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2Icon } from 'lucide-react';
import { Button } from './ui/button';
import { AddressAutocomplete } from './AddressAutocomplete';
import { useCreateRouteStore } from '@/store/createRouteStore';

interface SortableStopProps {
  id: string;
  index: number;
}

export function SortableStop({ id, index }: SortableStopProps) {
  const { waypoints, setPlace, removeWaypoint } = useCreateRouteStore();
  const waypoint = waypoints[index];
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 group bg-background p-1 rounded-lg">
      <Button type="button" variant="ghost" size="icon" {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </Button>

      <div className='flex-1'>
          <AddressAutocomplete
              placeholder={`Ponto ${index + 1}`}
              defaultValue={waypoint?.address}
              onSelect={(place) => setPlace(index, place)}
          />
      </div>

      <Button
        variant="ghost"
        size="icon"
        className='text-muted-foreground hover:text-destructive'
        type="button"
        onClick={() => removeWaypoint(id)}
        disabled={waypoints.length <= 2}
      >
        <Trash2Icon className="h-4 w-4" />
      </Button>
    </div>
  );
}