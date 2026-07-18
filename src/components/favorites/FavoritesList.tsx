"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { FavoriteCityCard } from "@/components/favorites/FavoriteCityCard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useFavorites } from "@/hooks/useFavorites";
import type { FavoriteCity } from "@/types/weather";

interface FavoriteWeatherSummary {
  id: number;
  weatherCode: number;
  temperature: number;
}

async function fetchFavoriteWeather(favorites: FavoriteCity[]): Promise<FavoriteWeatherSummary[]> {
  if (favorites.length === 0) return [];

  const requests = favorites.map(async (favorite) => {
    const params = new URLSearchParams({
      latitude: String(favorite.latitude),
      longitude: String(favorite.longitude),
      current: "temperature_2m,weather_code",
      timezone: "auto",
    });

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
    if (!response.ok) return null;

    const data = (await response.json()) as {
      current: { temperature_2m: number; weather_code: number };
    };

    return {
      id: favorite.id,
      weatherCode: data.current.weather_code,
      temperature: data.current.temperature_2m,
    };
  });

  const results = await Promise.all(requests);
  return results.filter((result): result is FavoriteWeatherSummary => result !== null);
}

export function FavoritesList() {
  const { favorites, isHydrated } = useFavorites();
  const [summaries, setSummaries] = useState<FavoriteWeatherSummary[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isHydrated || favorites.length === 0) {
      return;
    }

    let cancelled = false;

    queueMicrotask(() => {
      void (async () => {
        setLoading(true);
        try {
          const data = await fetchFavoriteWeather(favorites);
          if (!cancelled) setSummaries(data);
        } finally {
          if (!cancelled) setLoading(false);
        }
      })();
    });

    return () => {
      cancelled = true;
    };
  }, [favorites, isHydrated]);

  const visibleSummaries = favorites.length === 0 ? [] : summaries;

  if (!isHydrated) {
    return <LoadingSpinner label="Chargement des favoris..." size="sm" />;
  }

  if (favorites.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-8 text-center">
        <Star className="mx-auto h-8 w-8 text-slate-500" />
        <p className="mt-3 text-slate-300">Aucune ville favorite pour le moment.</p>
        <p className="mt-1 text-sm text-slate-500">
          Recherchez une ville et cliquez sur l&apos;étoile pour l&apos;ajouter.
        </p>
      </div>
    );
  }

  return (
    <div>
      {loading ? <LoadingSpinner label="Mise à jour des favoris..." size="sm" /> : null}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((favorite) => {
          const summary = visibleSummaries.find((item) => item.id === favorite.id);
          return (
            <FavoriteCityCard
              key={favorite.id}
              favorite={favorite}
              weatherCode={summary?.weatherCode}
              temperature={summary?.temperature}
            />
          );
        })}
      </div>
    </div>
  );
}
