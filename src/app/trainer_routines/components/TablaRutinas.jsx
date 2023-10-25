"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { ModalCrearRutina } from "./ModalCrearRutina";

export default function TablaRutinas({ data, alumnoId, obtener_rutinas }) {
  return (
    <div className="flex justify-center flex-col">
      {/* <Label className="text-center pb-3">Listado de Rutinas</Label> */}
      <div className="md:w-[150px]">
        <ModalCrearRutina />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Nombre</TableHead>
            <TableHead className="text-center">Fecha Inicio</TableHead>
            <TableHead className="text-center">Fecha Fin</TableHead>
            <TableHead className="text-center">
              Objetivo del Estudiante
            </TableHead>
            <TableHead className="text-center">Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="text-center">{r.name}</TableCell>
              <TableCell className="text-center">{r.initial_date}</TableCell>
              <TableCell className="text-center">{r.final_date}</TableCell>
              <TableCell className="text-center">{r.goal.name}</TableCell>
              <TableCell className="text-center">{r.status.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
