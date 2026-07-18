"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import type { GeoLocation } from "@/types/weather";

interface CityDetailActionsProps {
  city: GeoLocation;
}

export function CityDetailActions({ city }: CityDetailActionsProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-sky-400/30 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour
      </Link>
      <FavoriteButton city={city} />
    </div>
  );
}
