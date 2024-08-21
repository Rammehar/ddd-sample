import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

interface Pagination {
  currentPage: number;
  pageCount: number;
  perPage: number;
  total: number;
}
interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pagination: Pagination;
}

export function DataTablePagination<TData>({
  table,
  pagination,
}: DataTablePaginationProps<TData>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const nextPageHandle = () => {
    const params = new URLSearchParams(searchParams);
    const page = params.get("page");
    if (!page) {
      params.set("page", `${pagination.currentPage + 1}`);
      router.push(`${pathname}?${params.toString()}`);
    } else {
      const newPage = parseInt(params.get("page"));
      params.set("page", `${pagination.currentPage + 1}`);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const previousPageHandle = () => {
    const params = new URLSearchParams(searchParams);
    const page = params.get("page");
    if (!page) {
      params.set("page", `${pagination.currentPage}`);
      router.push(`${pathname}?${params.toString()}`);
    } else {
      const newPage = parseInt(params.get("page"));
      params.set("page", `${pagination.currentPage - 1}`);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className="flex items-center justify-end space-x-2">
      <p>
        Page {pagination.currentPage} of {pagination.pageCount}
      </p>
      <Button
        variant="outline"
        className="h-8 w-8 p-0"
        onClick={previousPageHandle}
        disabled={pagination.currentPage === 1}
      >
        <span className="sr-only">Go to previous page</span>
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        className="h-8 w-8 p-0"
        onClick={nextPageHandle}
        disabled={pagination.currentPage === pagination.pageCount}
      >
        <span className="sr-only">Go to next page</span>
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
