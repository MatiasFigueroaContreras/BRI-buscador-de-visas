import { useEffect, useMemo, useState } from "react";
import { Option } from "./MultipleSelect";

export const useMultipleSelect = (
  options: Option[],
  initialSelected: Option[],
) => {
  const sortedOptions = useMemo(() => {
    return options.sort((a, b) => a.label.localeCompare(b.label));
  }, [options]);

  const [selected, setSelected] = useState<Option[]>(initialSelected);
  const [unselected, setUnselected] = useState<Option[]>(
    sortedOptions.filter((option) => !initialSelected.includes(option)),
  );

  useEffect(() => {
    const initialSelectedValues = initialSelected.map((option) => option.value);
    setUnselected(
      sortedOptions.filter(
        (option) => !initialSelectedValues.includes(option.value),
      ),
    );
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
    const newSelected = [...selected, option];
    setSelected(newSelected);
    setUnselected((prev) => prev.filter((opt) => opt.value !== option.value));
    return newSelected;
  };

  const removeSelected = (option: Option) => {
    const newSelected = selected.filter((opt) => opt.value !== option.value);
    setSelected(newSelected);
    setUnselected((prev) => {
      const index = getSortedIndex(prev, option);
      return [...prev.slice(0, index), option, ...prev.slice(index)];
    });
    return newSelected;
  };

  const removeAll = () => {
    setSelected([]);
    setUnselected(sortedOptions);
    return [];
  };

  return {
    selected,
    unselected,
    addSelected,
    removeSelected,
    removeAll,
  };
};
