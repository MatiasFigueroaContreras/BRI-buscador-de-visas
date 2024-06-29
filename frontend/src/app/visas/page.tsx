import FilterSidebar from "@/components/filter-sidebar/FilterSidebar"
import VisaSurrogate from "@/components/visa-surrogate/VisaSurrogate"

export default function VisasPage() {
  const visas = [
    {
      type: "Trabajo",
      country: "Argentina",
      countryCode: "AR",
      duration: "1 año",
      category: "H1B1",
      keywords: ["Trabajo", "Argentina", "H1B1"],
      cost: "200 USD",
      processDuration: "30 dias",
    },
    {
      type: "Estudio",
      country: "Australia",
      countryCode: "AU",
      duration: "6 meses",
      category: "F1",
      keywords: ["Estudio", "Australia", "F1"],
      cost: "300 USD",
      processDuration: "45 dias",
    },
    {
      type: "Turismo",
      country: "Brasil",
      countryCode: "BR",
      duration: "3 meses",
      category: "B2",
      keywords: ["Turismo", "Brasil", "B2"],
      cost: "100 USD",
      processDuration: "15 dias",
    },
    {
      type: "Trabajo",
      country: "Chile",
      countryCode: "CL",
      duration: "2 años",
      category: "G",
      keywords: ["Trabajo", "Chile", "G"],
      cost: "400 USD",
      processDuration: "60 dias"
    }
  ]

  return (
    <main className="flex w-3/5 py-10 gap-10">
      <FilterSidebar />
      <section className="basis-3/4 grid gap-6 justify-center">
        {visas.map((visa, index) => (
          <VisaSurrogate
            key={index}
            type={visa.type}
            duration={visa.duration}
            country={visa.country}
            countryCode={visa.countryCode}
            category={visa.category}
            keywords={visa.keywords}
            cost={visa.cost}
            processDuration={visa.processDuration}
          />
        ))}
      </section>
    </main>
  )
}
