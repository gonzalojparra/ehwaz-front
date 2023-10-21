import { useEffect, useState } from "react";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
//import InputError from "@/components/ui/InputError";
import SimpleSpiner from "@/components/ui/simple-spiner";
import axios from "@/lib/axios";
import { getRequests } from "@/modules/trainers";
import { useRouter } from "next/navigation";



export function Tabla({data}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const columns = [
    {
      accessorKey: "status",
      nombre: "Estado",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Estado
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("status")}</div>
      ),
    },
    {
      accessorKey: "name",
      nombre: "Nombre",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nombre
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "date",
      nombre: "Fecha",
      header: () => <div className="text-right">Fecha</div>,
      cell: ({ row }) => {
        const date = new Date(row.getValue("date"));

        // Formatear el valor de la celda a moneda local
        const formatted = `${date.getDate().toString().padStart(2, "0")}/${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}/${date.getFullYear().toString()}`;

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      nombre: "Acciones",
      enableHiding: false,
      cell: ({ row }) => {
        const id_de_tupla = row.original.pivot_id;
        const state = row.original.status;

        // Custom Dropdown Menu para cada fila
        return (

          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => cambiarEstado(id_de_tupla, state)}
              >
                Cambiar Estado
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        );
      },
    },
  ];

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [estados, setEstados] = useState([
    { id: 1, label: "Activo" },
    { id: 2, label: "Inactivo" },
    { id: 3, label: "Cancelado" },
  ]);
  const [estado, setEstado] = useState('');
  const [errors, setErrors] = useState([]);
  const [id_tupla, setId_tupla] = useState("");

  //const [data, setData] = useState(datos);

  //setData(getRequests)

  const cambiarEstado = (id_de_tupla, state) => {
    console.log(state);
    console.log(id_de_tupla)
    setOpen(true);
    setId_tupla(id_de_tupla);
    switch (state) {
      case "Activo":
        setEstado(1);
        break;

      case "Inactivo":
        setEstado(2);
        break;

      case "Cancelado":
        setEstado(3);
        break;

      default:
        break;
    }
  };

  const enviarEstado = async () => {
    setSending(true);
    if (await sendInfo()) {
      setSending(false);
      setOpen(false);
      setId_tupla("");
      //table.data = await getRequests();
    } else {
      setSending(false);
    }
  };

  const sendInfo = async () => {
    const res = await axios
      .post("/api/change_status", {
        id_tupla: id_tupla,
        estado: estado,
      })
      .then((response) => {
        setErrors([]);
        return true;
      })
      .catch((e) => {
        console.log(e);
        setErrors(e.response.data.errors);
        return false;
      });
    return res;
  };

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
      <div className="w-[800px]">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filtrar nombres..."
            value={table.getColumn("name")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
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
                      {column.id}
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
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
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
      {/*Inicio del modal */}
      {/* <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center mb-4">
              Cambiar Estado
            </DialogTitle>
            <DialogDescription className="flex flex-1 flex-col gap-4">
              <div className="space-y-2">
                <Label htmlFor="estado" className="flex ml-1">
                  Seleccione un estado
                </Label>
                <Select onValueChange={(e) => setEstado(e)} defaultValue={estado != '' ? estado : ''}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {estados.map((estad) => {
                      return (
                        <SelectItem key={estad.id} value={estad.id}>
                          {estad.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" onClick={enviarEstado} disabled={sending}>
              Guardar Estado {sending && <SimpleSpiner />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </section>
  );
}
