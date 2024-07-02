"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Button from "../button/Button"
import MultipleSelect from "../multiple-select/MultipleSelect"
import SearchInput from "../search-input/SearchInput"
import Select from "../select/Select"
import useDebounce from "@/hooks/useDebounce"

export default function VisaSearchBar({
  visaTypes,
  countries,
}: {
  visaTypes: { label: string; value: string }[]
  countries: { label: string; value: string }[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const changeUrl = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)
    params.delete("page")
    router.push(`${pathname}?${params.toString()}`)
  }

  const changeUrlArray = (key: string, values: string[]) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)
    values.forEach((value) => {
      params.append(key, value)
    })
    params.delete("page")
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleOnSearch = () => {
    router.push(`/visas/?${searchParams.toString()}`)
  }

  const handleOnChangeSearch = useDebounce((value: string) => {
    changeUrl("search", value)
  }, 300)

  return (
    <div className="flex h-10 w-full justify-center gap-2 !text-sm">
      <Select
        defaultValue={searchParams.get("origin_country") || undefined}
        placeholder="Pais de origen"
        className="!w-48 !font-medium"
        onChange={(event) => {
          changeUrl("origin_country", event.target.value)
        }}
      >
        {countries.map((country, index) => (
          <option key={index} value={country.value}>
            {country.label}
          </option>
        ))}
      </Select>
      <MultipleSelect
        className="!min-h-10 !w-60 font-medium"
        placeholder="Tipo de visa"
        options={visaTypes}
        onChange={(selectedOptions) => {
          changeUrlArray(
            "visa_type",
            selectedOptions.map((option) => option.value.toString())
          )
        }}
        defaultValue={
          searchParams.has("visa_type")
            ? visaTypes.filter((type) =>
                searchParams.getAll("visa_type").includes(type.value)
              )
            : []
        }
      />
      <SearchInput
        placeholder="Tipos de visa, Requisitos, países..."
        className="!h-10 !w-[30rem]"
        defaultValue={searchParams.get("search") || undefined}
        onChange={(event) => {
          handleOnChangeSearch(event.target.value)
        }}
      />
      <Button
        className="!w-28 bg-background !font-semibold !text-text-primary-dark shadow-none hover:bg-gray-200"
        onClick={() => handleOnSearch()}
      >
        BUSCAR
      </Button>
    </div>
  )
}
