interface SelectProps extends React.ComponentProps<"select"> {
  placeholder: string;
}

export default function Select({
  children,
  placeholder,
  className,
  defaultValue,
  ...props
}: SelectProps) {
  return (
    <select
      className={
        className +
        " rounded-md border border-accent-200 bg-background \
         py-1 pl-1 pr-6 text-sm text-text-primary-dark \
         hover:cursor-pointer focus:border-accent-500 focus:outline-none"
      }
      defaultValue={defaultValue || placeholder}
      {...props}
    >
      <option value={placeholder} disabled>
        {placeholder}
      </option>
      {children}
    </select>
  );
}
