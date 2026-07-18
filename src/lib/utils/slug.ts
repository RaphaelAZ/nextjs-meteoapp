import type { FavoriteCity, GeoLocation } from "@/types/weather";

export function createCitySlug(name: string, country: string): string {
  return `${name}-${country}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function buildCityUrl(city: Pick<GeoLocation, "id" | "name" | "country" | "latitude" | "longitude" | "admin1">): string {
  const slug = createCitySlug(city.name, city.country);
  const params = new URLSearchParams({
    id: String(city.id),
    lat: String(city.latitude),
    lon: String(city.longitude),
    name: city.name,
    country: city.country,
  });

  if (city.admin1) {
    params.set("admin1", city.admin1);
  }

  return `/ville/${slug}?${params.toString()}`;
}

export function favoriteToGeoLocation(favorite: FavoriteCity): GeoLocation {
  return {
    id: favorite.id,
    name: favorite.name,
    latitude: favorite.latitude,
    longitude: favorite.longitude,
    country: favorite.country,
    country_code: "",
    admin1: favorite.admin1,
  };
}
