import { Option } from "./MultipleSelect";

export default function NonSelectedItem({option, onClick} : {option: Option, onClick: () => void}) {
  return (
      <div
          onClick={onClick}
          className="px-2 py-0.5 rounded-md text-background
                   hover:bg-accent hover:text-text 
                   hover:cursor-pointer whitespace-pre"
      >
          {option.label}
      </div>
  );
}
