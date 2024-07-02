import FilterSidebar from "@/components/filter-sidebar/FilterSidebar"
import Pagination from "@/components/pagination/Pagination"
import VisaSurrogate from "@/components/visa-surrogate/VisaSurrogate"
import { getPageRange } from "@/lib/utils"
import visaService from "@/services/VisaService"
import SearchParams from "@/types/SearchParams"
import Visa from "@/types/Visa"
import VisaResponse from "@/types/VisaResponse"

export default async function VisasPage({
  searchParams,
}: {
  searchParams: SearchParams & any
}) {
  const query = visaService.transformSearchParamsToQuery(searchParams)

  const response: VisaResponse = await visaService.getAll(query)
  const totalItems = response.total.value
  const pageSize = searchParams.page_size || 10
  const range = getPageRange(searchParams.page || 1, pageSize, totalItems)
  const visas: Visa[] = response.data
  const facets = await visaService.getFacets(query)

  const destinationCountries = facets.dest_country.map(
    (country: { key: string; doc_count: number }) => ({
      label: `${country.key} (${country.doc_count})`,
      value: country.key,
    })
  )

  const categories = facets.category.map(
    (type: { key: string; doc_count: number }) => ({
      label: `${type.key} (${type.doc_count})`,
      value: type.key,
    })
  )

  const processingTimes = facets.processing_time.map(
    (time: { key: string; doc_count: number }) => ({
      label: `${time.key} (${time.doc_count})`,
      value: time.key,
    })
  )

  return (
    <main className="flex w-3/5 py-10 gap-10">
      <FilterSidebar
        destinationCountries={destinationCountries}
        categories={categories}
        processingTimes={processingTimes}
      />
      <section className="basis-3/4 grid gap-6 justify-center">
        <div className="flex flex-col items-center md:items-end gap-1 w-full">
          <p className="justify-self-end hidden md:block">
            {range.start}-{range.end} de {totalItems} componentes
          </p>
          <hr className="h-0.5 border-none bg-primary-300 w-full mb-2" />
          <Pagination totalItems={totalItems} pageSize={pageSize} />
        </div>
        {visas.map((visa, index) => (
          <VisaSurrogate key={index} visa={visa} />
        ))}
        <div className="flex flex-col items-center md:items-end gap-1 w-full">
          <hr className="h-0.5 border-none w-full bg-primary-300 mb-2" />
          <Pagination totalItems={totalItems} pageSize={pageSize} />
        </div>
      </section>
    </main>
  )
}
