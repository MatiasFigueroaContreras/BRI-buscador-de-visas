"use client"

import { useRef, useState } from "react"
import Checkbox from 'react-three-state-checkbox'

export default function BooleanOption({
    label,
    value,
    onChange,
    }: {
    label: string
    value: boolean
    onChange: (value: string) => void
    }) {

    const [checked, setChecked] = useState(value)
    const [indeterminate, setIndeterminate] = useState(false)

    const handleChange = (checked: boolean) => {
        if (checked === true && indeterminate === false) {
            setChecked(false)
            setIndeterminate(true)
            onChange("")
        } else {
            if (checked) {
                setChecked(true)
                setIndeterminate(false)
                onChange("true")
                console.log("checked to true")
            } else {
                setChecked(false)
                setIndeterminate(false)
                onChange("false")
                console.log("checked to false")
        }    
    }
}

    return (
        <div className="flex items-center gap-2">
        <Checkbox
            className=" h-5 w-5"
            checked={checked}
            indeterminate={indeterminate}
            onChange={(e) => handleChange(e.target.checked)}
        />
        <label>{label}</label>
        </div>
    )
}

    