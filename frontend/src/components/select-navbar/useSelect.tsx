import { useEffect, useMemo, useState } from "react";
import { Option } from "./SelectNavbar";

export const useSelect = (
  options: Option[],
  initialSelected: Option | undefined,
) => {
  const sortedOptions = useMemo(() => {
    return options.sort((a, b) => a.label.localeCompare(b.label));
  }, [options]);

  const [selected, setSelected] = useState<Option | undefined>(initialSelected);
  const [unselected, setUnselected] = useState<Option[]>(
    sortedOptions.filter((option) => initialSelected != option),
  );

  useEffect(() => {
    if (!initialSelected) return;
    const initialSelectedValue = initialSelected.value;
    setUnselected(sortedOptions.filter((option) => initialSelectedValue != option.value))
    setSelected(initialSelected);
  }, [sortedOptions, initialSelected]);

  const getSortedIndex = (optionsArr: Option[], optionVal: Option) => {
    let low = 0;
    let high = optionsArr.length;

    while (low < high) {
      const mid = (low + high) >>> 1;
      if (optionsArr[mid].label < optionVal.label) low = mid + 1;
      else high = mid;
    }
    return low;
  };

  const addSelected = (option: Option) => {
    setSelected(option);
    setUnselected((prev) => prev.filter((opt) => opt.value !== option.value));
    return option
  };

  const removeSelected = () => {
    setSelected(undefined);
    setUnselected(options);
    return undefined;
  };


  return {
    selected,
    unselected,
    addSelected,
    removeSelected,
  };
};
