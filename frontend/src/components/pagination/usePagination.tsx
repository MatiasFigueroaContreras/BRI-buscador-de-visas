import { useMemo } from "react";

export const usePagination = (
  currentPage: number,
  totalItems: number,
  pageSize: number,
  sideNumbers = 2,
) => {
  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return useMemo(() => {
    const totalPages = Math.ceil(Math.max(1, totalItems) / pageSize);
    const l = Math.max(
      1,
      Math.min(currentPage - sideNumbers, totalPages - sideNumbers * 2),
    );
    const r = Math.min(
      totalPages,
      Math.max(currentPage + sideNumbers, sideNumbers * 2 + 1),
    );
    const pages = range(l, r);

    return { totalPages, pages };
  }, [currentPage, totalItems, pageSize, sideNumbers]);
};
