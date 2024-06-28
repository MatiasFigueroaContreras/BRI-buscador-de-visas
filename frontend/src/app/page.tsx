import VisaSearchBar from "@/components/visa-search-bar/VisaSearchBar";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <section className="clip-triangle-down flex h-2/5 w-full flex-col items-center gap-2 bg-gradient-to-t from-primary-500 to-accent-500 p-14 text-text-primary-light">
        <h1 className="text-4xl font-bold">Buscador de Visas</h1>
        <h4 className="mb-3 text-xl text-secondary-200">
          Todo lo que necesitas saber sobre visas de viajes
        </h4>
        <VisaSearchBar />
      </section>
    </main>
  );
}
