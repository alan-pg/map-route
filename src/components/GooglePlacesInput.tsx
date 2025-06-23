// src/components/GooglePlacesInput.tsx
'use client';
import { Autocomplete } from '@react-google-maps/api';
import { useState } from 'react';
import { Input } from './ui/input';

interface GooglePlacesInputProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
  placeholder?: string;
  defaultValue?: string;
}

export function GooglePlacesInput({ onPlaceSelect, placeholder, defaultValue }: GooglePlacesInputProps) {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const onLoad = (ac: google.maps.places.Autocomplete) => {
    setAutocomplete(ac);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      onPlaceSelect(place);
    } else {
      console.error('Autocomplete is not loaded yet!');
    }
  };

  return (
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} fields={['geometry', 'formatted_address', 'place_id']}>
      <Input type="text" placeholder={placeholder} defaultValue={defaultValue}/>
    </Autocomplete>
  );
}