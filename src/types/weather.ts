export interface GeoLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string;
  timezone?: string;
}

export interface FavoriteCity {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

export interface SearchHistoryEntry {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  searchedAt: string;
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  uvIndex: number;
  weatherCode: number;
  time: string;
}

export interface DailyForecast {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  sunrise: string;
  sunset: string;
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast[];
  timezone: string;
  latitude: number;
  longitude: number;
}

export interface CityPageParams {
  slug: string;
}

export interface CityPageSearchParams {
  id?: string;
  lat?: string;
  lon?: string;
  name?: string;
  country?: string;
  admin1?: string;
}

export interface GeocodingApiResponse {
  results?: Array<{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    country_code: string;
    admin1?: string;
    timezone?: string;
  }>;
}

export interface ForecastApiResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    pressure_msl: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    uv_index: number;
    weather_code: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
  };
}
