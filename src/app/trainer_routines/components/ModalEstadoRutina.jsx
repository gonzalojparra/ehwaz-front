"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import InputError from "@/components/ui/InputError";
import SimpleSpiner from "@/components/ui/simple-spiner";
import axios from "@/lib/axios";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export default function ModalEstadoRutina({ estado_id, rutinaId, estados, estado_nombre, obtener_rutinas, alumnoId }) {
    const [estadoId, setEstadoId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState([]);
    const enviarEstado = async()=>{
        setLoading(true);
        await axios.post('/api/change_routine_status', {
            rutina_id: rutinaId,
            estado_id: estadoId
        })
        .then((res)=>{
            setOpen(false); obtener_rutinas(alumnoId);
        })
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{estado_nombre}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Estado</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <Label htmlFor="rutina" className="flex ml-1">
              Rutina
            </Label>
              <Select
                onValueChange={(e) => setEstadoId(e)}
                defaultValue={estado_id}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione una rutina" />
                </SelectTrigger>
                <SelectContent>
                  {estados.map((estado) => {
                    return (
                      <SelectItem key={estado.id} value={estado.id}>
                        {estado.status}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            <InputError messages={errors?.estado_id} />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={enviarEstado} disabled={loading}>Guardar Estado {loading && <SimpleSpiner/>}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
