"use client";

import { useCallback, useState } from "react";
import { GitCompareArrows, Loader2, MapPin, Search } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { WeatherIcon } from "@/components/weather/WeatherIcon";
import {
  formatHumidity,
  formatTemperature,
  formatWindSpeed,
  windDirectionLabel,
} from "@/lib/utils/format";
import { getWeatherCodeInfo } from "@/lib/utils/weather-code";
import type { GeoLocation, WeatherData } from "@/types/weather";

interface ComparisonSlot {
  label: string;
  query: string;
  city: GeoLocation | null;
  weather: WeatherData | null;
  loading: boolean;
}

const initialSlot = (label: string): ComparisonSlot => ({
  label,
  query: "",
  city: null,
  weather: null,
  loading: false,
});

async function fetchWeatherForCity(city: GeoLocation): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "pressure_msl",
      "wind_speed_10m",
      "wind_direction_10m",
      "uv_index",
      "weather_code",
    ].join(","),
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto",
    forecast_days: "1",
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
  if (!response.ok) throw new Error("Erreur météo");

  const data = await response.json();
  return {
    latitude: data.latitude,
    longitude: data.longitude,
    timezone: data.timezone,
    current: {
      time: data.current.time,
      temperature: data.current.temperature_2m,
      apparentTemperature: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      pressure: data.current.pressure_msl,
      windSpeed: data.current.wind_speed_10m,
      windDirection: data.current.wind_direction_10m,
      uvIndex: data.current.uv_index,
      weatherCode: data.current.weather_code,
    },
    daily: data.daily.time.map((date: string, index: number) => ({
      date,
      weatherCode: data.daily.weather_code[index],
      tempMax: data.daily.temperature_2m_max[index],
      tempMin: data.daily.temperature_2m_min[index],
      sunrise: "",
      sunset: "",
    })),
  };
}

function ComparisonPanel({
  slot,
  onQueryChange,
  onSelectCity,
}: {
  slot: ComparisonSlot;
  onQueryChange: (value: string) => void;
  onSelectCity: (city: GeoLocation) => void;
}) {
  const [suggestions, setSuggestions] = useState<GeoLocation[]>([]);
  const [searching, setSearching] = useState(false);

  const search = useCallback(async (value: string) => {
    onQueryChange(value);
    if (value.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setSearching(true);
    try {
      const response = await fetch(`/api/geocode?q=${encodeURIComponent(value.trim())}`);
      const data = (await response.json()) as GeoLocation[];
      setSuggestions(data);
    } catch {
      setSuggestions([]);
    } finally {
      setSearching(false);
    }
  }, [onQueryChange]);

  const weatherInfo = slot.weather ? getWeatherCodeInfo(slot.weather.current.weatherCode) : null;

  return (
    <Card title={slot.label}>
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={slot.query}
          onChange={(event) => void search(event.target.value)}
          placeholder="Nom de la ville..."
          className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-10 text-white outline-none focus:border-sky-400/40"
        />
        {searching ? (
          <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-sky-300" />
        ) : null}
      </div>

      {suggestions.length > 0 && !slot.city ? (
        <ul className="mb-4 max-h-40 overflow-auto rounded-xl border border-white/10">
          {suggestions.map((city) => (
            <li key={city.id}>
              <button
                type="button"
                onClick={() => {
                  onSelectCity(city);
                  setSuggestions([]);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-sky-500/10"
              >
                <MapPin className="h-4 w-4 text-sky-300" />
                <span>
                  {city.name}
                  {city.admin1 ? `, ${city.admin1}` : ""}, {city.country}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {slot.loading ? (
        <div className="flex items-center justify-center py-8 text-slate-400">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Chargement...
        </div>
      ) : slot.city && slot.weather && weatherInfo ? (
        <div className={`rounded-xl bg-gradient-to-br ${weatherInfo.gradient} p-5`}>
          <h3 className="text-xl font-bold text-white">{slot.city.name}</h3>
          <p className="text-sm text-white/80">
            {slot.city.admin1 ? `${slot.city.admin1}, ` : ""}
            {slot.city.country}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <WeatherIcon code={slot.weather.current.weatherCode} className="h-10 w-10 text-white" />
            <span className="text-4xl font-bold text-white">
              {formatTemperature(slot.weather.current.temperature)}
            </span>
          </div>
          <p className="mt-2 text-white/90">{weatherInfo.label}</p>
          <dl className="mt-4 grid grid-cols-2 gap-2 text-sm text-white/90">
            <div>
              <dt className="text-white/70">Ressenti</dt>
              <dd>{formatTemperature(slot.weather.current.apparentTemperature)}</dd>
            </div>
            <div>
              <dt className="text-white/70">Humidité</dt>
              <dd>{formatHumidity(slot.weather.current.humidity)}</dd>
            </div>
            <div>
              <dt className="text-white/70">Vent</dt>
              <dd>
                {formatWindSpeed(slot.weather.current.windSpeed)} (
                {windDirectionLabel(slot.weather.current.windDirection)})
              </dd>
            </div>
            <div>
              <dt className="text-white/70">Max / Min</dt>
              <dd>
                {formatTemperature(slot.weather.daily[0].tempMax)} /{" "}
                {formatTemperature(slot.weather.daily[0].tempMin)}
              </dd>
            </div>
          </dl>
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-slate-400">
          Sélectionnez une ville pour afficher la comparaison.
        </p>
      )}
    </Card>
  );
}

export function WeatherComparison() {
  const [slotA, setSlotA] = useState<ComparisonSlot>(initialSlot("Ville A"));
  const [slotB, setSlotB] = useState<ComparisonSlot>(initialSlot("Ville B"));

  const loadCity = async (
    city: GeoLocation,
    setter: React.Dispatch<React.SetStateAction<ComparisonSlot>>,
  ) => {
    setter((prev) => ({
      ...prev,
      city,
      query: city.name,
      loading: true,
      weather: null,
    }));

    try {
      const weather = await fetchWeatherForCity(city);
      setter((prev) => ({ ...prev, weather, loading: false }));
    } catch {
      setter((prev) => ({ ...prev, loading: false }));
    }
  };

  const temperatureDiff =
    slotA.weather && slotB.weather
      ? Math.round(slotA.weather.current.temperature - slotB.weather.current.temperature)
      : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 rounded-2xl border border-sky-400/20 bg-sky-500/10 p-4">
        <GitCompareArrows className="h-6 w-6 text-sky-300" />
        <p className="text-sm text-slate-200">
          Fonctionnalité originale : comparez instantanément les conditions météo de deux villes
          côte à côte pour planifier un déplacement ou un voyage.
        </p>
      </div>

      {temperatureDiff !== null ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
          <p className="text-sm text-slate-400">Écart de température</p>
          <p className="text-2xl font-bold text-white">
            {temperatureDiff > 0 ? "+" : ""}
            {temperatureDiff}°C
          </p>
          <p className="mt-1 text-sm text-slate-400">
            {slotA.city?.name} est{" "}
            {temperatureDiff === 0
              ? "à la même température que"
              : Math.abs(temperatureDiff) + "°C " + (temperatureDiff > 0 ? "plus chaude que" : "plus froide que")}{" "}
            {slotB.city?.name}
          </p>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <ComparisonPanel
          slot={slotA}
          onQueryChange={(value) => setSlotA((prev) => ({ ...prev, query: value, city: null, weather: null }))}
          onSelectCity={(city) => void loadCity(city, setSlotA)}
        />
        <ComparisonPanel
          slot={slotB}
          onQueryChange={(value) => setSlotB((prev) => ({ ...prev, query: value, city: null, weather: null }))}
          onSelectCity={(city) => void loadCity(city, setSlotB)}
        />
      </div>
    </div>
  );
}
