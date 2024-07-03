import "./Checkbox.css"

export default function CheckBoxOption({
  label,
  value,
  onChange,
}: {
  label: string
  value: boolean | undefined
  onChange: (value: string) => void
}) {

  const handleChange = (value: boolean | undefined) => {
    if (value == undefined) {
      onChange("true")
      return
    }

    if (value) {
      onChange("false")
      return
    }
    else {
      onChange("")
      return
    }
  }

  return (
    <div className="flex items-center gap-2">
      <input
        id={label}
        type="checkbox"
        className={`h-6 w-6 rounded-sm ${value == undefined ? "indeterminate" : ""}`}
        checked={value}
        onChange={(e) => handleChange(value)}
      />
      <label className="cursor-pointer select-none" htmlFor={label}>
        {label}
      </label>
    </div>
  )
}
