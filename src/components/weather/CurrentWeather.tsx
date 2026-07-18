import {
  Droplets,
  Gauge,
  SunMedium,
  Thermometer,
  Wind,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { WeatherIcon } from "@/components/weather/WeatherIcon";
import { WeatherStat } from "@/components/weather/WeatherStat";
import {
  formatHumidity,
  formatPressure,
  formatTemperature,
  formatTime,
  formatUvIndex,
  formatWindSpeed,
  getUvLevel,
  windDirectionLabel,
} from "@/lib/utils/format";
import { getWeatherCodeInfo } from "@/lib/utils/weather-code";
import type { CurrentWeather } from "@/types/weather";

interface CurrentWeatherProps {
  weather: CurrentWeather;
  timezone: string;
  cityName: string;
}

export function CurrentWeatherCard({ weather, timezone, cityName }: CurrentWeatherProps) {
  const weatherInfo = getWeatherCodeInfo(weather.weatherCode);
  const uvLevel = getUvLevel(weather.uvIndex);

  return (
    <Card className={`bg-gradient-to-br ${weatherInfo.gradient} border-white/20`}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-white/80">Conditions actuelles</p>
          <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl">{cityName}</h1>
          <p className="mt-2 text-white/90">{weatherInfo.label}</p>
          <p className="mt-1 text-sm text-white/70">
            Mis à jour à {formatTime(weather.time, timezone)}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <WeatherIcon code={weather.weatherCode} className="h-16 w-16 text-white" />
          <div>
            <p className="text-5xl font-bold text-white sm:text-6xl">
              {formatTemperature(weather.temperature)}
            </p>
            <p className="text-white/80">
              Ressenti {formatTemperature(weather.apparentTemperature)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <WeatherStat
          icon={<Thermometer className="h-4 w-4" />}
          label="Ressenti"
          value={formatTemperature(weather.apparentTemperature)}
        />
        <WeatherStat
          icon={<Droplets className="h-4 w-4" />}
          label="Humidité"
          value={formatHumidity(weather.humidity)}
        />
        <WeatherStat
          icon={<Gauge className="h-4 w-4" />}
          label="Pression"
          value={formatPressure(weather.pressure)}
        />
        <WeatherStat
          icon={<Wind className="h-4 w-4" />}
          label="Vent"
          value={formatWindSpeed(weather.windSpeed)}
          hint={windDirectionLabel(weather.windDirection)}
        />
        <WeatherStat
          icon={<SunMedium className="h-4 w-4" />}
          label="Indice UV"
          value={formatUvIndex(weather.uvIndex)}
          hint={uvLevel.label}
        />
        <WeatherStat
          icon={<WeatherIcon code={weather.weatherCode} className="h-4 w-4" />}
          label="Ciel"
          value={weatherInfo.label}
        />
      </div>
    </Card>
  );
}
