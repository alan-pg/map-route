// src/components/AddressAutocomplete.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDebounce } from "@/hooks/useDebounce";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";

interface PlaceSuggestion {
  text: {
    text: string;
  };
  place: string;
}

export interface PlaceDetails {
  address: string;
  lat: number;
  lng: number;
  placeId: string;
}

interface AddressAutocompleteProps {
  onSelect: (place: PlaceDetails) => void;
  placeholder?: string;
  defaultValue?: string;
}

export function AddressAutocomplete({
  onSelect,
  placeholder,
  defaultValue,
}: AddressAutocompleteProps) {
  const [inputValue, setInputValue] = useState(defaultValue || "");
  const [suggestions, setSuggestions] = useState<
    { placePrediction: PlaceSuggestion }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(inputValue, 500);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectionInProgress = useRef(false);
  const apiKey = process.env.NEXT_PUBLIC_Maps_API_KEY;

  useEffect(() => {
    if (selectionInProgress.current) {
      selectionInProgress.current = false;
      return;
    }

    if (debouncedSearchTerm.length > 2) {
      setIsLoading(true);
      const url = "https://places.googleapis.com/v1/places:autocomplete";
      const requestBody = {
        input: debouncedSearchTerm,
        languageCode: "pt-BR",
        includedRegionCodes: ["br"],
      };

      axios
        .post(url, requestBody, {
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey,
          },
        })
        .then((response) => {
          setSuggestions(response.data.suggestions || []);
          setIsOpen(true);
        })
        .catch((error) => console.error("Erro no autocomplete:", error))
        .finally(() => setIsLoading(false));
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [debouncedSearchTerm, apiKey]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = async (placePrediction: PlaceSuggestion) => {
    const placeId = placePrediction.place;
    const description = placePrediction.text.text;

    selectionInProgress.current = true;
    setInputValue(description);

    setIsOpen(false);
    setSuggestions([]);
    setIsLoading(true);

    const fields = "location,displayName,formattedAddress";
    const url = `https://places.googleapis.com/v1/${placeId}`;

    try {
      const response = await axios.get(url, {
        params: { fields, languageCode: "pt-BR" },
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
        },
      });

      const placeDetails = response.data;

      // CORREÇÃO AQUI: Usando 'latitude' e 'longitude'
      const lat = placeDetails.location?.latitude;
      const lng = placeDetails.location?.longitude;

      if (lat !== undefined && lng !== undefined) {
        onSelect({
          address: placeDetails.formattedAddress || description,
          lat,
          lng,
          placeId: placeId,
        });
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes do local:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          onFocus={() => {
            if (suggestions.length > 0) {
              setIsOpen(true);
            }
          }}
        />
        {isLoading && (
          <Loader2 className="animate-spin h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        )}
      </div>
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-background border rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map(({ placePrediction }) => (
            <li
              key={placePrediction.place}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-muted"
              onClick={() => handleSelect(placePrediction)}
            >
              {placePrediction.text.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
