"use client"

import { useRef, useState } from "react"
import ArrowDownIcon from "../icons/ArrowDownIcon"
import OptionsDropdown from "./OptionsDropdown"
import { useMultipleSelect } from "./useMultipleSelect"
import CloseIcon from "../icons/CloseIcon"
import { useClickOutside } from "./useClickOutside"

export type Option = {
  value: string | number
  label: string
}

const emptyOptions: Option[] = []

export default function MultipleSelectNavbar({
  options,
  defaultValue = emptyOptions,
  placeholder,
  onChange,
  className,
  placeholderIcon,
}: {
  options: Option[]
  defaultValue?: Option[]
  placeholder: string
  onChange?: (selectedOptions: Option[]) => void
  className?: string
  multi?: boolean
  placeholderIcon?: any
}) {
  const boxRef = useClickOutside({
    handler: () => {
      setIsOptionsOpen(false)
    },
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const { selected, unselected, addSelected, removeSelected, removeAll } =
    useMultipleSelect(options, defaultValue)

  const onChangeSelected = (option: Option, isSelected: boolean) => {
    if (isSelected) {
      onChange ? onChange(removeSelected(option)) : removeSelected(option)
    } else {
      onChange ? onChange(addSelected(option)) : addSelected(option)
    }
  }

  return (
    <div ref={boxRef} className="relative select-none">
      <section
        className={`${className} relative flex w-full 
                    rounded-md border border-accent-200 
                    bg-background py-0.5 pl-2 pr-1 
                    text-sm text-text-primary-dark 
                    focus-within:border-accent-500 cursor-pointer`}
      >
        <div
          className="flex w-full gap-1 items-center"
          onClick={() => {
            inputRef.current?.focus()
            setIsOptionsOpen((prev) => !prev)
          }}
        >
          {placeholderIcon && placeholderIcon}
          <span>
            {selected.length != 0
              ? `${placeholder} (${selected.length})`
              : placeholder}
          </span>
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
          unselectedOptions={unselected}
          selectedOptions={selected}
          onSelect={onChangeSelected}
        />
      )}
    </div>
  )
}
