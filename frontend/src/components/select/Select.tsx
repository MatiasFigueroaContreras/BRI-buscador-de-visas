interface SelectProps extends React.ComponentProps<"select"> {
    placeholder: string;
}

export default function Select({ children, placeholder, className, defaultValue, ...props }: SelectProps ) {
    return (
        <select
            className={
                className +
                "bg-text rounded-md pl-1 pr-6 py-1 \
                text-background text-sm hover:cursor-pointer"
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
