import NonSelectedItem from "./NonSelectedItem";
import { Option } from "./MultipleSelect";

export default function OptionsDropdown({
  options,
  onSelect,
}: {
  options: Option[];
  onSelect: (option: Option) => void;
}) {
  const renderOptions = options.map((option, index) => (
    <NonSelectedItem
      key={index}
      option={option}
      onClick={() => onSelect(option)}
    />
  ));

  return (
    <section
      className="absolute left-0 z-50 mt-[1px] 
                  grid max-h-40 w-full gap-0.5 overflow-y-auto 
                  rounded-md bg-background px-1 py-1.5 
                  text-sm text-text-primary-dark shadow-lg"
    >
      {renderOptions.length != 0 ? (
        renderOptions
      ) : (
        <p className="cursor-default pl-2 text-sm">No hay opciones</p>
      )}
    </section>
  );
}
