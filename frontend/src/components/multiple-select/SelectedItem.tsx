import CancelIcon from "../icons/CancelIcon";
import { Option } from "./MultipleSelect";

export default function SelectedItem({option, onClick} : {option: Option, onClick: () => void}) {
  return (
      <div
          className="flex gap-1 px-2 py-0.5 rounded-md bg-accent text-text cursor-default"
      >
          <p>{option.label}</p>
          <CancelIcon
              className="fill-white w-4 cursor-pointer hover:fill-primary"
              onClick={onClick}
          />
      </div>
  );
}
