import { cache } from "react";
import type { GeoLocation, GeocodingApiResponse } from "@/types/weather";

const GEOCODING_BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";

function mapGeocodingResult(result: NonNullable<GeocodingApiResponse["results"]>[number]): GeoLocation {
  return {
    id: result.id,
    name: result.name,
    latitude: result.latitude,
    longitude: result.longitude,
    country: result.country,
    country_code: result.country_code,
    admin1: result.admin1,
    timezone: result.timezone,
  };
}

export const searchCities = cache(async (query: string, count = 5): Promise<GeoLocation[]> => {
  const trimmed = query.trim();
  if (trimmed.length < 2) {
    return [];
  }

  const params = new URLSearchParams({
    name: trimmed,
    count: String(count),
    language: "fr",
    format: "json",
  });

  const response = await fetch(`${GEOCODING_BASE_URL}?${params.toString()}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Impossible de récupérer les suggestions de villes.");
  }

  const data = (await response.json()) as GeocodingApiResponse;
  return (data.results ?? []).map(mapGeocodingResult);
});
