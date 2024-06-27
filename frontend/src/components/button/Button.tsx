interface ButtonProps extends React.ComponentProps<"button"> {}

export default function Button(props: ButtonProps) {
    const { className, children, ...rest } = props;

    return (
        <button
            className={`${className} rounded-md px-4 py-0.5 
                        text-text bg-secondary shadow-sh-button text-sm
                        hover:bg-accent hover:shadow-sh-button-hover`}
            {...rest}
        >
            {children}
        </button>
    );
}
