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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import InputError from "@/components/ui/InputError";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SimpleSpiner from "@/components/ui/simple-spiner";
import axios from "@/lib/axios";

export default function ModalEvento({ open, setOpen, nuevo, data, rutinas }) {
  const [date, setDate] = useState('');
  const [trainerRoutineId, setTrainerRoutineId] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(()=>{
    if(nuevo){
      setDate(data.startStr);
      setTrainerRoutineId('');
      setDescripcion('');
    }else{
      setDate(data.extendedProps.initial_date);
      setTrainerRoutineId(data.defId);
      setDescripcion(data.extendedProps.description);
    }
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Evento</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <Label htmlFor="date" className="flex ml-1">
              Fecha
            </Label>
            <input
              id="date"
              type="date"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={data != null}
            />
            <InputError messages={errors?.date} />
          </div>
          <div className="">
            <Label htmlFor="rutina" className="flex ml-1">
              Rutina
            </Label>
            <Select onValueChange={(e) => setTrainerRoutineId(e)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione una rutina" />
              </SelectTrigger>
              <SelectContent>
                {rutinas.map((rut) => {
                  return (
                    <SelectItem key={rut.id} value={rut.id}>
                      {rut.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <InputError messages={errors?.trainer_routine_id} />
          </div>
          <div className="">
            <Label htmlFor="descripcion" className="flex ml-1">
              Descripcion
            </Label>
            <Textarea
                id="descripcion"
                placeholder="Añada una descripción del evento"
                value={descripcion}
                onChange={(e) => {
                  setDescripcion(e.target.value);
                }}
            />
            <InputError messages={errors?.descripcion} />
          </div>
        </div>
        <DialogFooter>
          {nuevo && <Button type="button">Crear Rutina</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
