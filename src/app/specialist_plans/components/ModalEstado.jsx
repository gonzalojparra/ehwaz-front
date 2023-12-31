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

export default function ModalEstado({ row, planId, estados, obtener_planes, alumnoId }) {
    const [estadoId, setEstadoId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState([]);
    /* console.log("planId:"+planId);
    console.log("estados:"+estados);
    console.log("alumnoId:"+alumnoId);
    console.log(row); */

    const enviarEstado = async()=>{
        setLoading(true);
        await axios.post('/api/change_plan_status', {
            plan_id: planId,
            estado_id: estadoId
        })
        .then((res)=>{
            setOpen(false); obtener_planes(alumnoId);
        })
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{row.status.status}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Estado</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <Label htmlFor="plan" className="flex ml-1 pb-2">
              Plan
            </Label>
              <Select
                onValueChange={(e) => setEstadoId(e)}
                defaultValue={row.id_plan_status}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione un plan" />
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


