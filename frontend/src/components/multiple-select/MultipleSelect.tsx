"use client"

import { useRef, useState } from "react"
import ArrowDownIcon from "../icons/ArrowDownIcon"
import SelectedItem from "./SelectedItem"
import OptionsDropdown from "./OptionsDropdown"
import { useMultipleSelect } from "./useMultipleSelect"
import CloseIcon from "../icons/CloseIcon"
import { useClickOutside } from "./useClickOutside"

export type Option = {
  value: string | number
  label: string
}

const emptyOptions: Option[] = []

export default function MultipleSelect({
  options,
  defaultValue = emptyOptions,
  placeholder,
  onChange,
  className,
}: {
  options: Option[]
  defaultValue?: Option[]
  placeholder: string
  onChange?: (selectedOptions: Option[]) => void
  className?: string
}) {
  const boxRef = useClickOutside({
    handler: () => {
      setIsOptionsOpen(false)
    },
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const { selected, unselected, addSelected, removeSelected, removeAll } =
    useMultipleSelect(options, defaultValue)

  const normalizeString = (str: string) => {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
  }

  const handleChangeInput = (event: any) => {
    const value = event.target.value
    setSearchValue(value)
  }

  const renderSelectedOptions = () => {
    return selected.map((option, index) => (
      <SelectedItem
        key={index}
        option={option}
        onClick={() =>
          onChange ? onChange(removeSelected(option)) : removeSelected(option)
        }
      />
    ))
  }

  return (
    <div ref={boxRef} className="relative select-none">
      <section
        className={`${className} relative flex w-full 
                    rounded-md border border-accent-200 
                    bg-background py-0.5 pl-2 pr-1 
                    text-sm text-text-primary-dark 
                    focus-within:border-accent-500 hover:cursor-text`}
      >
        <div
          className="flex grow flex-wrap gap-1"
          onClick={() => {
            inputRef.current?.focus()
          }}
        >
          {renderSelectedOptions()}
          <input
            ref={inputRef}
            className="min-w-16 grow bg-transparent px-1 
                     placeholder:text-text-primary-dark focus:outline-none"
            type="text"
            size={1}
            onChange={handleChangeInput}
            placeholder={selected.length == 0 ? placeholder : ""}
            value={searchValue}
            onFocus={() => {
              setIsOptionsOpen(true)
            }}
          />
        </div>
        <div className="flex items-center justify-items-center gap-1">
          {selected.length != 0 && (
            <CloseIcon
              className="w-5 cursor-pointer rounded-lg fill-black hover:fill-red"
              onClick={() => (onChange ? onChange(removeAll()) : removeAll())}
            />
          )}
          <ArrowDownIcon
            className={`w-6 cursor-pointer rounded-lg 
                                  fill-black transition-transform duration-200 
                                  hover:bg-accent-400 hover:fill-white ${
                                    isOptionsOpen && "rotate-180"
                                  }`}
            onClick={() => {
              setIsOptionsOpen((prev) => !prev)
            }}
          />
        </div>
      </section>
      {isOptionsOpen && (
        <OptionsDropdown
          options={unselected.filter((option) =>
            normalizeString(option.label).includes(normalizeString(searchValue))
          )}
          onSelect={(option) => {
            onChange ? onChange(addSelected(option)) : addSelected(option)
            setSearchValue("")
          }}
        />
      )}
    </div>
  )
}
