import React from 'react';

interface AvailableCapitalProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  optionsType?: string
  periodValue?: string
  onPeriodChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function AvailableCapital({
  id = "search",
  placeholder,
  className,
  optionsType,
  periodValue,
  onPeriodChange,
  ...props
}: AvailableCapitalProps) {
  return (
    <div className="relative w-full rounded-md">
      <input
        id={id}
        type="number"
        className={`${className} h-8 w-full rounded-md 
                    border border-gray-300 bg-background px-3 
                    font-medium text-text-primary-dark 
                    focus:border-accent-500 focus:outline-none`}
        {...props}
        placeholder={placeholder}
      />
      {optionsType === "period" ? (
        <select
          className={`${className} absolute inset-y-0 right-0 flex items-center pr-2 bg-[#d6d6ff] text-black font-bold rounded-r-md px-2 border-l-[1px] border-gray-300`}
          value={periodValue}
          onChange={onPeriodChange}
        >
          <option value="day">Day</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      ) : (
        <div
          className={`${className} absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none bg-[#d6d6ff] text-black font-bold rounded-r-md px-2 border-l-[1px] border-gray-300`}
        >
          <span>{optionsType === "Capital" ? "USD" : "DÍAS"}</span>
        </div>
      )}
    </div>
  )
}