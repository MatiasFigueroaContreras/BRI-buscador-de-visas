"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import MultipleSelect from "../multiple-select/MultipleSelect"
import CheckBoxOption from "../checkbox-option/CheckboxOption"
import FilterOption from "./FilterOption"
import useDebounce from "@/hooks/useDebounce"
import RangeSlider from "../range-slider/Rangeslider"
import AvailableCapital from "../search-filter/AvailableCapital"

export default function FiltersBar({
  destinationCountries,
  categories,
  processingTimes,
  processingFee,
}: {
  destinationCountries: any[]
  categories: any[]
  processingTimes: any[]
  processingFee: { min: number; max: number }
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

  const changeCapitalUrl = useDebounce((value: string) => {
    changeUrl("available_capital", value)
  }, 300)

  const handleDurationChange = useDebounce((value: string) => {
    changeUrl("visa_duration", Number(value).toString())
  }, 300)

  const handleRangeChange = useDebounce((values: [number, number]) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("processing_fee_min", values[0].toString())
    params.set("processing_fee_max", values[1].toString())
    router.push(`${pathname}?${params.toString()}`)
  }, 300)

  const checkboxValue= (key: string) => {
    if(!searchParams.has(key)){
      return undefined
    }
    if(searchParams.get(key) == "true" || searchParams.get(key) == "false"){
      return searchParams.get(key) == "true"
    }

    return undefined
  }

  return (
    <aside className="sticky top-24 left-0 flex flex-col basis-1/4 gap-6 z-10 h-full">
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
      <FilterOption placeholder="Processing fee (USD)">
        <RangeSlider
          defaultMin={
            searchParams.has("processing_fee_min") &&
            Number(searchParams.get("processing_fee_min")) >= processingFee.min
              ? Number(searchParams.get("processing_fee_min"))
              : processingFee.min
          }
          defaultMax={
            searchParams.has("processing_fee_max") &&
            Number(searchParams.get("processing_fee_max")) <= processingFee.max
              ? Number(searchParams.get("processing_fee_max"))
              : processingFee.max
          }
          min={0}
          max={2634}
          onRangeChange={handleRangeChange}
        />
      </FilterOption>
      <FilterOption placeholder="Your available capital">
        <AvailableCapital
          id="capitalInput"
          placeholder="Enter capital"
          optionsType="Capital"
          defaultValue={
            searchParams.has("available_capital")
              ? Number(searchParams.get("available_capital"))
              : undefined
          }
          onChange={(e) => changeCapitalUrl(e.target.value)}
        />
      </FilterOption>
      <FilterOption placeholder="Visa duration">
        <AvailableCapital
          id="periodInput"
          optionsType="period"
          placeholder="Enter duration"
          defaultValue={
            searchParams.has("visa_duration")
              ? Number(searchParams.get("visa_duration"))
              : undefined
          }
          periodValue={searchParams.get("visa_duration_unit") ?? "day"}
          onChange={(e) => handleDurationChange(e.target.value)}
          onPeriodChange={(e) =>
            changeUrl("visa_duration_unit", e.target.value)
          }
        />
      </FilterOption>
      <CheckBoxOption
        label="Possibility of extension"
        value={checkboxValue("extension")}
        onChange={(value) => changeUrl("extension", value.toString())}
      ></CheckBoxOption>
      <CheckBoxOption
        label="Availability E-Visa"
        value={checkboxValue("evisa")}
        onChange={(value) => changeUrl("evisa", value.toString())}
      ></CheckBoxOption>
    </aside>
  )
}
