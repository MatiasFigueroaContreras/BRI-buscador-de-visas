"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import MultipleSelect from "../multiple-select/MultipleSelect"
import CheckBoxOption from "../checkbox-option/CheckboxOption"
import FilterOption from "./FilterOption"
import { countries } from "countries-list"

export default function FiltersBar({
  destinationCountries,
  categories,
  processingTimes,
}: {
  destinationCountries: any[]
  categories: any[]
  processingTimes: any[]
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

  return (
    <aside className="sticky top-0 left-0 flex flex-col basis-1/4 gap-5 z-10">
      <h2 className="text-xl font-semibold">Filters</h2>
      <hr className="-mt-3" />
      <FilterOption placeholder="Destination country">
        <MultipleSelect
          placeholder="Destination country"
          options={destinationCountries}
          onChange={(selectedOptions) => {
            changeUrlArray(
              "dest_country",
              selectedOptions.map((option) => option.value.toString())
            )
          }}
          defaultValue={
            searchParams.has("dest_country")
              ? destinationCountries.filter((country) =>
                  searchParams.getAll("dest_country").includes(country.value)
                )
              : []
          }
        />
      </FilterOption>
      <FilterOption placeholder="Visa category">
        <MultipleSelect
          placeholder="Visa category"
          options={categories}
          onChange={(selectedOptions) => {
            changeUrlArray(
              "category",
              selectedOptions.map((option) => option.value.toString())
            )
          }}
          defaultValue={
            searchParams.has("category")
              ? categories.filter((category) =>
                  searchParams.getAll("category").includes(category.value)
                )
              : []
          }
        />
      </FilterOption>
      <FilterOption placeholder="Processing time">
        <MultipleSelect
          placeholder="Processing time"
          options={processingTimes}
          onChange={(selectedOptions) => {
            changeUrlArray(
              "processing_time",
              selectedOptions.map((option) => option.value.toString())
            )
          }}
          defaultValue={
            searchParams.has("processing_time")
              ? processingTimes.filter((processingTime) =>
                  searchParams
                    .getAll("processing_time")
                    .includes(processingTime.value)
                )
              : []
          }
        />
      </FilterOption>
      <CheckBoxOption
        label="Possibility of extension"
        value={searchParams.has("extension")}
        onChange={(value) => changeUrl("extension", value.toString())}
      >
      </CheckBoxOption>
      <CheckBoxOption
        label="Availability E-Visa"
        value={searchParams.has("evisa")}
        onChange={(value) => changeUrl("evisa", value.toString())}
      >
      </CheckBoxOption>
    </aside>
  )
}
