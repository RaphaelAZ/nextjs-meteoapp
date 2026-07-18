import { getWeatherCodeInfo } from "@/lib/utils/weather-code";

interface WeatherIconProps {
  code: number;
  className?: string;
}

export function WeatherIcon({ code, className = "h-8 w-8" }: WeatherIconProps) {
  const { icon: Icon } = getWeatherCodeInfo(code);
  return <Icon className={`${className} text-sky-200`} aria-hidden="true" />;
}
