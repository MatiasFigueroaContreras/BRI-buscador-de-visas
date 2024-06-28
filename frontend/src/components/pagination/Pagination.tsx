"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { usePagination } from "./usePagination";
import PaginationBox from "./PaginationBox";
import DoubleArrowLeft from "../icons/DoubleArrowLeft";
import DoubleArrowRight from "../icons/DoubleArrowRight";

export default function Pagination({
  totalItems,
  pageSize,
}: {
  totalItems: number;
  pageSize: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? 1) || 1;

  const { totalPages, pages } = usePagination(
    currentPage,
    totalItems,
    pageSize
  );

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  };

  return (
    <section className="flex items-center gap-2">
      <PaginationBox
        className="group !h-5 !w-5"
        active={false}
        href={createPageURL(1)}
      >
        <DoubleArrowLeft className="fill-text w-4 group-hover:fill-white" />
      </PaginationBox>
      {pages.map((page, index) => (
        <PaginationBox
          key={index}
          active={currentPage == page}
          href={createPageURL(page)}
        >
          {page}
        </PaginationBox>
      ))}
      <PaginationBox
        className="group !h-5 !w-5"
        active={false}
        href={createPageURL(totalPages)}
      >
        <DoubleArrowRight className="fill-text !w-4 group-hover:fill-white" />
      </PaginationBox>
    </section>
  );
}
