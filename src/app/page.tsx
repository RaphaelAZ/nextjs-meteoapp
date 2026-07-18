import { Star } from "lucide-react";
import { FavoritesList } from "@/components/favorites/FavoritesList";
import { SearchHistory } from "@/components/history/SearchHistory";
import { CitySearch } from "@/components/search/CitySearch";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-sky-300">
          Application météo
        </p>
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          Consultez la météo partout dans le monde
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          Recherchez une ville, consultez les prévisions sur 7 jours, gérez vos favoris et
          comparez deux destinations en un clin d&apos;œil.
        </p>
      </section>

      <section>
        <CitySearch />
      </section>

      <section>
        <div className="mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-amber-300" />
          <h2 className="text-xl font-semibold text-white">Mes villes favorites</h2>
        </div>
        <FavoritesList />
      </section>

      <SearchHistory />
    </div>
  );
}
