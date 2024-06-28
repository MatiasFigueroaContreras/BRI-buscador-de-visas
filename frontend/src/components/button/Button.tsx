interface ButtonProps extends React.ComponentProps<"button"> {}

export default function Button(props: ButtonProps) {
  const { className, children, ...rest } = props;

  return (
    <button
      className={`${className} rounded-md bg-accent-500 px-4 py-0.5 
                  text-sm text-text-primary-light 
                  shadow-md shadow-gray-500 
                  hover:bg-accent-400 hover:shadow-md hover:shadow-gray-600`}
      {...rest}
    >
      {children}
    </button>
  );
}
