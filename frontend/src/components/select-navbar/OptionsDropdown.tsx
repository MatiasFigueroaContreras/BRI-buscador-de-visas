"use client"

import { useState } from "react"
import NonSelectedItem from "./NonSelectedItem"
import { Option } from "./SelectNavbar"

export default function OptionsDropdown({
  placeholder,
  unselectedOptions,
  onSelect,
}: {
  placeholder: string
  unselectedOptions: Option[]
  onSelect: (option: Option, isSelected: boolean) => void
}) {
  const [searchValue, setSearchValue] = useState("")
  const normalizeString = (str: string) => {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
  }

  const renderUnselectedOptions = (search: string) => {
    return unselectedOptions
      .filter((option) =>
        normalizeString(option.label).includes(normalizeString(search))
      )
      .map((option, index) => (
        <NonSelectedItem
          key={index}
          option={option}
          onClick={() => {
            setSearchValue("")
            onSelect(option, false)
          }}
        />
      ))
  }

  const renderOptions = renderUnselectedOptions(searchValue)

  const handleChangeInput = (event: any) => {
    const value = event.target.value
    setSearchValue(value)
  }

  return (
    <section
      className="absolute left-0 z-50 mt-[1px] overflow-x-hidden
                  grid max-h-40 w-fit min-w-full gap-0.5 overflow-y-auto 
                  rounded-md bg-background px-1 py-1.5 
                  text-sm text-text-primary-dark shadow-lg"
    >
      <input
        className="min-w-16 grow bg-transparent px-2 mb-1 
                     placeholder:text-text-primary-dark focus:outline-none"
        type="text"
        size={1}
        onChange={handleChangeInput}
        placeholder={placeholder + "..."}
        value={searchValue}
      />
      {renderOptions.length != 0 ? (
        renderOptions
      ) : (
        <p className="cursor-default px-2 text-sm">No hay opciones</p>
      )}
    </section>
  )
}
