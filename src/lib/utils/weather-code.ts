import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
  type LucideIcon,
} from "lucide-react";

export interface WeatherCodeInfo {
  label: string;
  icon: LucideIcon;
  gradient: string;
}

const WEATHER_CODES: Record<number, WeatherCodeInfo> = {
  0: { label: "Ciel dégagé", icon: Sun, gradient: "from-sky-400 to-blue-500" },
  1: { label: "Principalement dégagé", icon: CloudSun, gradient: "from-sky-300 to-blue-400" },
  2: { label: "Partiellement nuageux", icon: CloudSun, gradient: "from-slate-300 to-sky-400" },
  3: { label: "Couvert", icon: Cloud, gradient: "from-slate-400 to-slate-600" },
  45: { label: "Brouillard", icon: CloudFog, gradient: "from-slate-400 to-slate-500" },
  48: { label: "Brouillard givrant", icon: CloudFog, gradient: "from-slate-400 to-slate-600" },
  51: { label: "Bruine légère", icon: CloudDrizzle, gradient: "from-slate-400 to-blue-400" },
  53: { label: "Bruine modérée", icon: CloudDrizzle, gradient: "from-slate-400 to-blue-500" },
  55: { label: "Bruine dense", icon: CloudDrizzle, gradient: "from-slate-500 to-blue-600" },
  61: { label: "Pluie légère", icon: CloudRain, gradient: "from-slate-500 to-blue-600" },
  63: { label: "Pluie modérée", icon: CloudRain, gradient: "from-slate-600 to-blue-700" },
  65: { label: "Pluie forte", icon: CloudRain, gradient: "from-slate-700 to-blue-800" },
  71: { label: "Neige légère", icon: CloudSnow, gradient: "from-slate-300 to-blue-200" },
  73: { label: "Neige modérée", icon: CloudSnow, gradient: "from-slate-400 to-blue-300" },
  75: { label: "Neige forte", icon: CloudSnow, gradient: "from-slate-500 to-blue-400" },
  77: { label: "Grains de neige", icon: CloudSnow, gradient: "from-slate-400 to-slate-500" },
  80: { label: "Averses légères", icon: CloudRain, gradient: "from-slate-500 to-blue-500" },
  81: { label: "Averses modérées", icon: CloudRain, gradient: "from-slate-600 to-blue-600" },
  82: { label: "Averses violentes", icon: CloudRain, gradient: "from-slate-700 to-blue-700" },
  85: { label: "Averses de neige légères", icon: CloudSnow, gradient: "from-slate-400 to-blue-300" },
  86: { label: "Averses de neige fortes", icon: CloudSnow, gradient: "from-slate-500 to-blue-400" },
  95: { label: "Orage", icon: CloudLightning, gradient: "from-slate-700 to-indigo-800" },
  96: { label: "Orage avec grêle", icon: CloudLightning, gradient: "from-slate-800 to-indigo-900" },
  99: { label: "Orage violent avec grêle", icon: CloudLightning, gradient: "from-slate-900 to-indigo-950" },
};

const DEFAULT_WEATHER: WeatherCodeInfo = {
  label: "Conditions inconnues",
  icon: Cloud,
  gradient: "from-slate-400 to-slate-600",
};

export function getWeatherCodeInfo(code: number): WeatherCodeInfo {
  return WEATHER_CODES[code] ?? DEFAULT_WEATHER;
}
