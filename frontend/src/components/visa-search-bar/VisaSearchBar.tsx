"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Button from "../button/Button"
import SearchInput from "../search-input/SearchInput"
import useDebounce from "@/hooks/useDebounce"
import MultipleSelectNavbar from "../multiple-select-navbar/MultipleSelectNavbar"
import SelectNavbar from "../select-navbar/SelectNavbar"
import LocationIcon from "../icons/LocationIcon"

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
    <div className="flex h-10 w-full justify-center gap-2 !text-sm z-20">
      <SelectNavbar
        className="!w-56 !font-medium !min-h-10"
        options={countries}
        defaultValue={
          searchParams.has("origin_country")
            ? countries.find(
                (country) =>
                  country.value === searchParams.get("origin_country")
              )
            : undefined
        }
        placeholder="Country of origin"
        placeholderIcon={<LocationIcon className="w-6" />}
        onChange={(selectedOption) => {
          selectedOption
            ? changeUrl("origin_country", selectedOption.value.toString())
            : changeUrl("origin_country", "")
        }}
      />
      <MultipleSelectNavbar
        className="!min-h-10 !w-60 font-medium"
        placeholder="Type of visa"
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
        placeholder="Characteristics, requirements met, countries..."
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
        SEARCH
      </Button>
    </div>
  )
}
