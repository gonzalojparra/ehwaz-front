"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ModalEstado from "./ModalEstado";

export default function TablaMejorada({data, getRequests}){
    return (
        <div className="flex justify-center flex-col">
          <Label className="text-center pb-3">Listado de Alumnos</Label>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Nombre</TableHead>
                <TableHead className="text-center">Fecha</TableHead>
                <TableHead className="text-center">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((dat) => (
                <TableRow key={dat.id}>
                  <TableCell className="text-center">{dat.name}</TableCell>
                  <TableCell className="text-center">
                    {dat.pivot.date}
                  </TableCell>
                  <TableCell className="text-center">
                      <ModalEstado tupla_id={dat.pivot.id} estado={dat.pivot.status} getRequests={getRequests} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      );
}