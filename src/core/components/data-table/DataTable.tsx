import { Pagination } from "@components/Pagination";
import { Skeleton } from "@components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { cn } from "@lib/utils";
import { useMemo, useState } from "react";

interface DataTableProps<TData, TValue> {
  className?: string;
  columnVisibility?: any;
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | undefined;
  defaultPageSize?: number;
  defaultSorting?: SortingState;
  pageSizes?: number[];
  loading?: boolean;
}

export function DataTable<TData, TValue>({
  className,
  columnVisibility,
  columns,
  data,
  defaultPageSize = 5,
  defaultSorting = [],
  pageSizes = [5, 10, 20, 50],
  loading,
}: DataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });
  const [sorting, setSorting] = useState<SortingState>(defaultSorting);

  const tableData = useMemo(() => (loading ? Array(5).fill({}) : data), [loading, data]);
  const tableColumns = useMemo(
    () =>
      loading
        ? columns.map((column) => ({
            ...column,
            cell: () => <Skeleton className="h-9 w-full" />,
          }))
        : columns,
    [loading, columns],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: tableData || [],
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      columnVisibility: columnVisibility,
      pagination: pagination,
      sorting: sorting,
    },
  });

  return (
    <div className={cn("overflow-hidden rounded-md border shadow-sm", className)}>
      <Table className="dark:bg-muted">
        <TableHeader className="dark:bg-primary-foreground bg-neutral-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="py-2.5"
                    key={header.id}
                    style={{
                      minWidth: header.column.columnDef.minSize,
                      width: header.column.getSize(),
                    }}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    style={{
                      minWidth: cell.column.columnDef.minSize,
                      width: cell.column.getSize(),
                    }}
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sin resultados
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {!loading && (
        <Pagination table={table} setPagination={setPagination} pagination={pagination} pageSizes={pageSizes} />
      )}
    </div>
  );
}
