import visaService from "@/services/VisaService"
import VisaSearchBar from "../visa-search-bar/VisaSearchBar"

export default async function Navbar() {
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
    <header className="w-full">
      <nav
        className="sticky flex items-center w-full px-8 py-4 z-50
                   bg-gradient-to-t from-primary-500 to-accent-500"
      >
        {/* mt-4 rounded-xl */}
        <VisaSearchBar countries={countries} visaTypes={visaTypes} />
      </nav>
    </header>
  )
}
