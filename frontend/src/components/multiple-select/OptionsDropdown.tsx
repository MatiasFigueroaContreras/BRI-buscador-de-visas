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
            className="absolute left-0 grid gap-0.5  
                       w-full px-1 py-1.5 mt-[1px] rounded-md
                     text-background bg-text text-sm
                       shadow-lg z-10 overflow-y-auto max-h-40"
        >
            {renderOptions.length != 0 ? (
                renderOptions
            ) : (
                <p className="pl-2 text-sm cursor-default">No hay opciones</p>
            )}
        </section>
    );
}
