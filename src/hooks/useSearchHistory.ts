"use client";

import { useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { GeoLocation, SearchHistoryEntry } from "@/types/weather";

const HISTORY_KEY = "meteo-search-history";
const MAX_HISTORY = 8;

function toHistoryEntry(city: GeoLocation): SearchHistoryEntry {
  return {
    id: city.id,
    name: city.name,
    country: city.country,
    admin1: city.admin1,
    latitude: city.latitude,
    longitude: city.longitude,
    searchedAt: new Date().toISOString(),
  };
}

export function useSearchHistory() {
  const { value: history, setValue: setHistory, isHydrated } = useLocalStorage<SearchHistoryEntry[]>(
    HISTORY_KEY,
    [],
  );

  const addToHistory = useCallback(
    (city: GeoLocation) => {
      setHistory((prev) => {
        const filtered = prev.filter((entry) => entry.id !== city.id);
        return [toHistoryEntry(city), ...filtered].slice(0, MAX_HISTORY);
      });
    },
    [setHistory],
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  const removeFromHistory = useCallback(
    (cityId: number) => {
      setHistory((prev) => prev.filter((entry) => entry.id !== cityId));
    },
    [setHistory],
  );

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory,
    isHydrated,
  };
}
