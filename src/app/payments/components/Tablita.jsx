import { useEffect, useState } from "react";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import ModalImg from "./ModalImg";

import { Modal } from "./Modal";

export default function Tablita({data, obtenerPagos}){
    const [open, setOpen] = useState(false);

    const columns = [
        {
          accessorKey: "payment_identificator",
          name: "ID",
          nombre: "ID",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
          cell: ({ row }) => <div className="capitalize">{row.original.id}</div>,
        },
        {
            accessorKey: "student",
            name: "Rutina/Plan Alumno",
            nombre: "Rutina/Plan Alumno",
            header: ({ column }) => {
              return (
                <Button
                  variant="ghost"
                  onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                  Rutina/Plan Alumno
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              );
            },
            cell: ({ row }) => (
              <div className="lowercase">
                {row.original.routine_name} / {row.original.student.name + ' ' + row.original.student.last_name}
              </div>
            ),
          },
        {
          accessorKey: "amount",
          name: "Monto",
          nombre: "Monto",
          header: () => <div className="text-right">Monto</div>,
          cell: ({ row }) => {
            return (
              <div className="text-right font-medium">
                {row.original.amount}
              </div>
            );
          },
        },
        {
          accessorKey: "tipo_pago",
          name: "Tipo de Pago",
          nombre: "Tipo de Pago",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Tipo de Pago
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            );
          },
          cell: ({ row }) => (
            <div className="capitalize">
              {row.original.payment.payment_type}
            </div>
          ),
        },
        {
          accessorKey: "payment.status",
          name: "Estado",
          nombre: "Estado",
          header: () => <div className="text-right">Estado</div>,
          cell: ({ row }) => {
            return (
              <div className="text-right font-medium">
                {row.original.payment.status}
              </div>
            );
          },
        },
        {
          accessorKey: "fecha",
          name: "Fecha",
          nombre: "Fecha",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
              >
                Fecha
                
              </Button>
            );
          },
          cell: ({ row }) => (
            <div className="capitalize">
              {row.original.payment.updated_at}
            </div>
          ),
        },
        {
            accessorKey: "path_archivo",
            name: "Archivo",
            nombre: "Archivo",
            header: ({ column }) => {
              return (
                <Button
                  variant="ghost"
                >
                    Archivo
                  
                </Button>
              );
            },
            cell: ({ row }) => (
              <div className="capitalize">
                {row.original.payment.path_archivo != '' ? 
                    <ModalImg src={row.original.payment}/>
                :
                    'No hay comprobante'
                }
              </div>
            ),
          },
          {
            accessorKey: "payment.id",
            name: "Cambiar estado",
            nombre: "Cambiar estado",
            header: ({ column }) => {
              return (
                <Button
                  variant="ghost"
                >
                    Cambiar estado
                  
                </Button>
              );
            },
            cell: ({ row }) => (
              <div className="capitalize">
                <Modal payment_id={row.original.payment.id} estado={row.original.payment.status} obtenerPagos={obtenerPagos} />
              </div>
            ),
          }
      ];

    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState({});
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
          sorting,
          columnFilters,
          columnVisibility,
          rowSelection,
        },
      });

    return (
        <section className="flex flex-row flex-1 justify-center">
          <div className="w-full">
            <div className="flex items-center py-4">
              <Input
                placeholder="Filtrar nombres..."
                value={table.getColumn("student")?.getFilterValue() ?? ""}
                onChange={(event) =>
                  table.getColumn("student")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columnas <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.columnDef.name}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
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
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No hemos encontrado resultados.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                {/* {table.getFilteredSelectedRowModel().rows.length} de{" "} */}
                {/* {table.getFilteredRowModel().rows.length} fila(s) seleccionadas. */}
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Siguiente
                </Button>
              </div>
            </div>
          </div>
    
        </section>
    );
}