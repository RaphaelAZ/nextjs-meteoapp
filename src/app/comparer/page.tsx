import { WeatherComparison } from "@/components/comparison/WeatherComparison";

export default function ComparePage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Comparaison météo</h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          Sélectionnez deux villes pour comparer leurs conditions actuelles et identifier la
          destination la plus favorable.
        </p>
      </section>

      <WeatherComparison />
    </div>
  );
}
