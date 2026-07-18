export function formatTemperature(value: number): string {
  return `${Math.round(value)}°C`;
}

export function formatWindSpeed(value: number): string {
  return `${Math.round(value)} km/h`;
}

export function formatPressure(value: number): string {
  return `${Math.round(value)} hPa`;
}

export function formatHumidity(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatUvIndex(value: number): string {
  return value.toFixed(1);
}

export function formatDate(dateString: string, timezone: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: timezone,
  }).format(new Date(dateString));
}

export function formatShortDate(dateString: string, timezone: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: timezone,
  }).format(new Date(dateString));
}

export function formatTime(dateString: string, timezone: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone,
  }).format(new Date(dateString));
}

export function windDirectionLabel(degrees: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

export function getUvLevel(uvIndex: number): { label: string; color: string } {
  if (uvIndex <= 2) return { label: "Faible", color: "text-green-600" };
  if (uvIndex <= 5) return { label: "Modéré", color: "text-yellow-600" };
  if (uvIndex <= 7) return { label: "Élevé", color: "text-orange-600" };
  if (uvIndex <= 10) return { label: "Très élevé", color: "text-red-600" };
  return { label: "Extrême", color: "text-purple-600" };
}
