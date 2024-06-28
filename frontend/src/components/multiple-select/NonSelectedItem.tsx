import { Option } from "./MultipleSelect";

export default function NonSelectedItem({
  option,
  onClick,
}: {
  option: Option;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="text-text whitespace-pre rounded-md px-2 py-0.5 
                 hover:cursor-pointer hover:bg-accent-400 
                 hover:text-text-primary-light"
    >
      {option.label}
    </div>
  );
}
