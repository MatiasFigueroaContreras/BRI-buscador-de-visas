"use client";

import { useRef, useState, useEffect } from "react";
import './Checkbox.css';

export default function BooleanOption({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: string) => void;
}) {
  const [checked, setChecked] = useState(value);
  const [indeterminate, setIndeterminate] = useState(true);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleChange = (checked: boolean) => {
    if (checked === true && indeterminate === false) {
      setChecked(false);
      setIndeterminate(true);
      onChange("");
    } else {
      if (checked) {
        setChecked(true);
        setIndeterminate(false);
        onChange("true");
      } else {
        setChecked(false);
        setIndeterminate(false);
        onChange("false");
      }
    }
  };

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        ref={checkboxRef}
        className={`h-5 w-5 ${indeterminate ? 'indeterminate' : ''}`}
        checked={checked}
        onChange={(e) => handleChange(e.target.checked)}
      />
      <label>{label}</label>
    </div>
  );
}
