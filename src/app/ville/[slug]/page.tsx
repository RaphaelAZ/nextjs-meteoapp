import { notFound } from "next/navigation";
import { CityDetailActions } from "@/components/city/CityDetailActions";
import { CurrentWeatherCard } from "@/components/weather/CurrentWeather";
import { DailyForecastList } from "@/components/weather/DailyForecast";
import { SunTimes } from "@/components/weather/SunTimes";
import { WeatherMap } from "@/components/weather/WeatherMap";
import { getWeather } from "@/lib/api/weather";
import type { CityPageParams, CityPageSearchParams, GeoLocation } from "@/types/weather";

interface CityPageProps {
  params: Promise<CityPageParams>;
  searchParams: Promise<CityPageSearchParams>;
}

function parseCoordinates(searchParams: CityPageSearchParams) {
  const lat = Number(searchParams.lat);
  const lon = Number(searchParams.lon);

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return null;
  }

  return { lat, lon };
}

export default async function CityPage({ searchParams }: CityPageProps) {
  const query = await searchParams;
  const coordinates = parseCoordinates(query);

  if (!coordinates || !query.name || !query.country) {
    notFound();
  }

  const city: GeoLocation = {
    id: query.id ? Number(query.id) : 0,
    name: query.name,
    country: query.country,
    admin1: query.admin1,
    latitude: coordinates.lat,
    longitude: coordinates.lon,
    country_code: "",
  };

  let weather;
  try {
    weather = await getWeather(coordinates.lat, coordinates.lon);
  } catch {
    throw new Error("Impossible de charger la météo pour cette ville.");
  }

  const displayName = city.admin1
    ? `${city.name}, ${city.admin1}, ${city.country}`
    : `${city.name}, ${city.country}`;

  return (
    <div className="space-y-6">
      <CityDetailActions city={city} />

      <CurrentWeatherCard
        weather={weather.current}
        timezone={weather.timezone}
        cityName={displayName}
      />

      <DailyForecastList forecasts={weather.daily} timezone={weather.timezone} />

      <div className="grid gap-6 lg:grid-cols-2">
        <SunTimes today={weather.daily[0]} timezone={weather.timezone} />
        <WeatherMap
          latitude={weather.latitude}
          longitude={weather.longitude}
          cityName={city.name}
        />
      </div>
    </div>
  );
}
