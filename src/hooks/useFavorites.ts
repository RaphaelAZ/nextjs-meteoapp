"use client";

import { useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { FavoriteCity, GeoLocation } from "@/types/weather";

const FAVORITES_KEY = "meteo-favorites";

function toFavorite(city: GeoLocation): FavoriteCity {
  return {
    id: city.id,
    name: city.name,
    country: city.country,
    admin1: city.admin1,
    latitude: city.latitude,
    longitude: city.longitude,
  };
}

export function useFavorites() {
  const { value: favorites, setValue: setFavorites, isHydrated } = useLocalStorage<FavoriteCity[]>(
    FAVORITES_KEY,
    [],
  );

  const isFavorite = useCallback(
    (cityId: number) => favorites.some((favorite) => favorite.id === cityId),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (city: GeoLocation) => {
      setFavorites((prev) => {
        const exists = prev.some((favorite) => favorite.id === city.id);
        if (exists) {
          return prev.filter((favorite) => favorite.id !== city.id);
        }
        return [...prev, toFavorite(city)];
      });
    },
    [setFavorites],
  );

  const removeFavorite = useCallback(
    (cityId: number) => {
      setFavorites((prev) => prev.filter((favorite) => favorite.id !== cityId));
    },
    [setFavorites],
  );

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    isHydrated,
  };
}
