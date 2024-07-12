import VisaSearchBar from "@/components/visa-search-bar/VisaSearchBar";
import visaService from "@/services/VisaService";
import FastSearch from "@/components/fast-search/FastSearch";
import SearchAllButton from "@/components/search-all-button/SearchAllButton";

export default async function Home() {
  const searchOptions = await visaService.getSearchOptions()
  const visaTypes = searchOptions.type_of_visa.map(
    (type: { key: string; doc_count: number }) => ({
      label: type.key,
      value: type.key,
    })
  )
  const countries = searchOptions.destination_country.map(
    (country: string) => ({
      label: country,
      value: country,
    })
  )

  return (
    <main className="flex min-h-screen w-full flex-col">
      <section className="clip-triangle-down flex h-2/5 w-full flex-col items-center gap-2 bg-gradient-to-t from-primary-500 to-accent-500 p-14 text-text-primary-light">
        <h1 className="text-4xl font-bold">Search for visas</h1>
        <h4 className="mb-3 text-xl text-secondary-200">
          Everything you need to know about travel visas
        </h4>
        <VisaSearchBar countries={countries} visaTypes={visaTypes} />
        <SearchAllButton />
      </section>
      <FastSearch />
    </main>
  )
}
