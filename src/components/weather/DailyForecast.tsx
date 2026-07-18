import { Card } from "@/components/ui/Card";
import { WeatherIcon } from "@/components/weather/WeatherIcon";
import { formatShortDate, formatTemperature } from "@/lib/utils/format";
import { getWeatherCodeInfo } from "@/lib/utils/weather-code";
import type { DailyForecast } from "@/types/weather";

interface DailyForecastProps {
  forecasts: DailyForecast[];
  timezone: string;
}

export function DailyForecastList({ forecasts, timezone }: DailyForecastProps) {
  return (
    <Card title="Prévisions sur 7 jours">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {forecasts.map((day) => {
          const info = getWeatherCodeInfo(day.weatherCode);
          return (
            <div
              key={day.date}
              className="rounded-xl border border-white/10 bg-slate-900/30 p-4 text-center"
            >
              <p className="text-sm font-medium capitalize text-slate-200">
                {formatShortDate(day.date, timezone)}
              </p>
              <div className="my-3 flex justify-center">
                <WeatherIcon code={day.weatherCode} className="h-8 w-8" />
              </div>
              <p className="text-xs text-slate-400">{info.label}</p>
              <div className="mt-3 flex items-center justify-center gap-2 text-sm">
                <span className="font-semibold text-white">{formatTemperature(day.tempMax)}</span>
                <span className="text-slate-400">{formatTemperature(day.tempMin)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
