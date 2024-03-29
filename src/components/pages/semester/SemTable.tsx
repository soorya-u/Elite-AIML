"use client";

import { Rubik, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";

import { ChangeEvent, useState } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";

import { Input } from "@/components/shadcn/input";

import { cn } from "@/utils/shadcn";

const poppins = Poppins({ weight: "600", subsets: ["latin"] });
const rubik = Rubik({ weight: "400", subsets: ["latin"] });

interface SemTableProps<TData, TValue> {
  semester: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function SemTable<TData, TValue>({
  semester,
  columns,
  data,
}: SemTableProps<TData, TValue>) {
  const router = useRouter();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [filterValue, setFilterValue] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filterValue,
    },
    onGlobalFilterChange: setFilterValue,
  });

  return (
    <>
      <Input
        type="text"
        placeholder="Search by Name or USN..."
        className={cn(
          "w-[95vw] sm:w-[80vw] bg-[#00000030] outline-none border-[2px] border-white",
          poppins.className
        )}
        value={filterValue}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setFilterValue(event.target.value)
        }
      />
      <Table className="w-[95vw] sm:w-[80vw]">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="hover:bg-none" key={headerGroup.id}>
              {headerGroup.headers.map((header, idx) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      poppins.className,
                      "text-base text-center p-0",
                      idx === 2 || idx === 4 ? "hidden md:table-cell" : ""
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody className="w-full">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="cursor-pointer hover:bg-black/20"
                onClick={() =>
                  router.push(`/${semester}/${row.getValue("usn")}`)
                }
              >
                {row.getVisibleCells().map((cell, idx) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      rubik.className,
                      "font-medium text-center text-base",
                      (idx === 2 || idx === 4) && "hidden md:table-cell"
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>
                <h1 className={cn(poppins.className, "text-xl w-full text-center")}>
                  No Match Found
                </h1>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}

export default SemTable;
