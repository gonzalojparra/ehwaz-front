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
import ModalEstadoRutina from "./ModalEstadoRutina";
import { Button } from "@/components/ui/button";
import SimpleSpiner from "@/components/ui/simple-spiner";
import { useState } from "react";
import axios from "@/lib/axios";

export default function TablaRutinas({ data, alumnoId, obtener_rutinas, goals, estados, setRutinas }) {
  const [loading, setLoading] = useState(false);
  const borrar = async(id)=>{
    setLoading(true);
    await axios.post('/api/borrar_rutina', {
      routine_id: id
    })
    .then((res)=>{
      obtener_rutinas(alumnoId); setRutinas(null);
    })
  }
  return (
    <div className="flex justify-center flex-col">
      {/* <Label className="text-center pb-3">Listado de Rutinas</Label> */}
      <div className="md:w-[150px]">
        <ModalCrearRutina goals={goals} alumnoId={alumnoId} obtener_rutinas={obtener_rutinas} setRutinas={setRutinas}/>
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
            <TableHead className="text-center">Borrar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="text-center">{r.name}</TableCell>
              <TableCell className="text-center">{r.initial_date}</TableCell>
              <TableCell className="text-center">{r.final_date}</TableCell>
              <TableCell className="text-center">{r.goal.name}</TableCell>
              <TableCell className="text-center">
                <ModalEstadoRutina estado_id={r.status.id} rutinaId={r.id} estados={estados} estado_nombre={r.status.status} obtener_rutinas={obtener_rutinas} alumnoId={alumnoId}/>
              </TableCell>
              <TableCell className="text-center">
                <Button type="button" variant="destructive" onClick={(e)=>borrar(r.id)} disabled={loading}>Borrar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
