import CancelIcon from "../icons/CancelIcon";
import { Option } from "./MultipleSelectNavbar";

export default function SelectedItem({
  option,
  onClick,
}: {
  option: Option;
  onClick: () => void;
}) {
  return (
    <div
      className="flex items-center cursor-default gap-1 rounded-md bg-secondary-200 
                 px-2 py-0.5 text-text-primary-dark justify-between"
    >
      <p>{option.label}</p>
      <CancelIcon
        className="w-4 cursor-pointer fill-accent-500 hover:fill-secondary-700"
        onClick={onClick}
      />
    </div>
  )
}
