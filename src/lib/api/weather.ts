import { cache } from "react";
import type { ForecastApiResponse, WeatherData } from "@/types/weather";

const FORECAST_BASE_URL = "https://api.open-meteo.com/v1/forecast";

function mapForecastResponse(data: ForecastApiResponse): WeatherData {
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
    daily: data.daily.time.map((date, index) => ({
      date,
      weatherCode: data.daily.weather_code[index],
      tempMax: data.daily.temperature_2m_max[index],
      tempMin: data.daily.temperature_2m_min[index],
      sunrise: data.daily.sunrise[index],
      sunset: data.daily.sunset[index],
    })),
  };
}

export const getWeather = cache(async (latitude: number, longitude: number): Promise<WeatherData> => {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
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
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
    ].join(","),
    timezone: "auto",
    forecast_days: "7",
  });

  const response = await fetch(`${FORECAST_BASE_URL}?${params.toString()}`, {
    next: { revalidate: 1800 },
  });

  if (!response.ok) {
    throw new Error("Impossible de récupérer les données météorologiques.");
  }

  const data = (await response.json()) as ForecastApiResponse;
  return mapForecastResponse(data);
});
