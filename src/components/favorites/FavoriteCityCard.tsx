"use client";

import Link from "next/link";
import { MapPin, Trash2 } from "lucide-react";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import { WeatherIcon } from "@/components/weather/WeatherIcon";
import { useFavorites } from "@/hooks/useFavorites";
import { buildCityUrl, favoriteToGeoLocation } from "@/lib/utils/slug";
import type { FavoriteCity } from "@/types/weather";

interface FavoriteCityCardProps {
  favorite: FavoriteCity;
  weatherCode?: number;
  temperature?: number;
}

export function FavoriteCityCard({ favorite, weatherCode, temperature }: FavoriteCityCardProps) {
  const { removeFavorite } = useFavorites();
  const city = favoriteToGeoLocation(favorite);

  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-sky-400/30 hover:bg-sky-500/5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Link href={buildCityUrl(favorite)} className="group block">
            <h3 className="truncate text-lg font-semibold text-white group-hover:text-sky-200">
              {favorite.name}
            </h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-400">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">
                {favorite.admin1 ? `${favorite.admin1}, ` : ""}
                {favorite.country}
              </span>
            </p>
          </Link>
        </div>

        <div className="flex items-center gap-1">
          <FavoriteButton city={city} size="sm" />
          <button
            type="button"
            onClick={() => removeFavorite(favorite.id)}
            aria-label={`Supprimer ${favorite.name} des favoris`}
            className="rounded-full border border-white/10 p-1.5 text-slate-400 transition hover:border-red-400/40 hover:text-red-300"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {weatherCode !== undefined && temperature !== undefined ? (
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-slate-900/30 px-3 py-2">
          <WeatherIcon code={weatherCode} />
          <span className="text-xl font-semibold text-white">{Math.round(temperature)}°C</span>
        </div>
      ) : null}
    </article>
  );
}
