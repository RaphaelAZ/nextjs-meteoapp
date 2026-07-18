import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface WeatherMapProps {
  latitude: number;
  longitude: number;
  cityName: string;
}

export function WeatherMap({ latitude, longitude, cityName }: WeatherMapProps) {
  const delta = 0.08;
  const bbox = [
    longitude - delta,
    latitude - delta,
    longitude + delta,
    latitude + delta,
  ].join("%2C");

  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude}%2C${longitude}`;

  return (
    <Card title="Localisation">
      <div className="mb-3 flex items-center gap-2 text-sm text-slate-300">
        <MapPin className="h-4 w-4 text-sky-300" />
        <span>
          {cityName} — {latitude.toFixed(4)}°, {longitude.toFixed(4)}°
        </span>
      </div>
      <div className="overflow-hidden rounded-xl border border-white/10">
        <iframe
          title={`Carte de ${cityName}`}
          src={mapUrl}
          className="h-64 w-full"
          loading="lazy"
        />
      </div>
    </Card>
  );
}
