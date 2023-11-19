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
import { useToast } from "@/components/ui/use-toast"

export default function ModalEstado({ row, relationId, estados, getAlumnos }) {
    const [estadoId, setEstadoId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState([]);
    const {toast} = useToast()

    /* console.log("planId:"+planId);
    console.log("estados:"+estados);
    console.log("alumnoId:"+alumnoId);*/


    const enviarEstado = async()=>{
        setLoading(true);
        await axios.post('/api/change_student_trainer', {
            relation_id: relationId,
            estado_id: estadoId
        })
        .then((res)=>{
            setOpen(false); getAlumnos(); setLoading(false);
            toast({
              title: "Estado cambiado correctamente",
              description: "",
              duration: 4000
            })
        })
    }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{row.status_student.status}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Estado</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <Label htmlFor="plan" className="flex ml-1">
              Plan
            </Label>
              <Select
                onValueChange={(e) => setEstadoId(e)}
                defaultValue={row.status_student.id}
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


