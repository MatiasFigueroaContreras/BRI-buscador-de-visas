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
            className={`${className}
                        w-7 h-7 rounded  text-background 
                        flex justify-center items-center font-medium
                        hover:cursor-pointer hover:text-white hover:shadow-sh-white
                        ${active ? "bg-primary" : "bg-text hover:bg-accent"}`}
            href={href}
        >
            {children}
        </Link>
    );
}
