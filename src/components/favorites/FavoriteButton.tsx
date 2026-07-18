"use client";

import { Star } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import type { GeoLocation } from "@/types/weather";

interface FavoriteButtonProps {
  city: GeoLocation;
  size?: "sm" | "md";
}

export function FavoriteButton({ city, size = "md" }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isHydrated } = useFavorites();
  const active = isHydrated && isFavorite(city.id);
  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const buttonSize = size === "sm" ? "p-1.5" : "p-2";

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(city)}
      aria-label={active ? "Retirer des favoris" : "Ajouter aux favoris"}
      aria-pressed={active}
      className={`rounded-full border transition ${buttonSize} ${
        active
          ? "border-amber-400/50 bg-amber-400/20 text-amber-300 hover:bg-amber-400/30"
          : "border-white/10 bg-white/5 text-slate-300 hover:border-amber-400/30 hover:text-amber-200"
      }`}
    >
      <Star className={`${iconSize} ${active ? "fill-current" : ""}`} />
    </button>
  );
}
