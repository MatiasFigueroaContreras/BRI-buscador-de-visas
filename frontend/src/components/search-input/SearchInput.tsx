import SearchIcon from "../icons/SearchIcon";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconClassName?: string;
}

export default function SearchInput({
  id = "search",
  placeholder,
  className,
  iconClassName,
  ...props
}: SearchInputProps) {
  return (
    <div className={`relative w-fit rounded-md`}>
      <input
        id={id}
        type="text"
        className={`${className} h-8 w-80 rounded-md 
                    border border-accent-200 bg-background px-3 
                    font-medium text-text-primary-dark 
                    focus:border-accent-500 focus:outline-none lg:w-96`}
        {...props}
        placeholder={placeholder}
      />
      <label htmlFor={id} className="hover:cursor-pointer">
        <SearchIcon
          className={`${iconClassName} absolute w-6 right-2 top-1/2 -translate-y-1/2 fill-primary-500`}
        />
      </label>
    </div>
  );
}
