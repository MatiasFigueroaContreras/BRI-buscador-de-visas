import Link from "next/link";

export default function PaginationBox({
  children,
  className,
  active,
  href,
}: {
  children: any;
  className?: string;
  active: boolean;
  href: string;
}) {
  return (
    <Link
      className={`${className} flex h-7 w-7 items-center justify-center 
                    rounded font-medium hover:shadow-sh-white 
                    hover:cursor-pointer hover:text-text-primary-light 
                    ${
                      active
                        ? "bg-primary-500 text-text-primary-light"
                        : "bg-secondary-200 text-text-primary-dark hover:bg-accent-400"
                    }`}
      href={href}
    >
      {children}
    </Link>
  );
}
