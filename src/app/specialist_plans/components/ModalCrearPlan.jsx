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
import { useState } from "react";
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
import { useToast } from "@/components/ui/use-toast"

export function ModalCrearPlan({ alumnoId, obtener_planes }) {
  const [goalId, setGoalId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaInicial, setFechaInicial] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [amount, setAmount] = useState("");
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [open, setOpen] = useState(false);
  const {toast} = useToast()

  const enviarPlan = async () => {
    await axios
      .post("/api/plan_store", {
        student_id: alumnoId,
        initial_date: fechaInicial,
        final_date: fechaFinal,
        name: nombre,
        descriptions: descripcion,
        amount: amount,
        color: color,
      })
      .then((res) => {
        console.log(res.data);
        obtener_planes(alumnoId);
        setOpen(false);
        setLoading(false);
        toast({
          title: "Plan creado con éxito",
          description: `Se ha creado el plan ${nombre}`,
          duration: 1000
        })
      })
      .catch((e) => {
        setErrors(e.response.data.errors);
        setLoading(false);
      });
  };

  const crearPlan = async () => {
    setLoading(true);
    enviarPlan();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="ml-4">Añadir Plan</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Plan</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <Label htmlFor="nombre" className="flex ml-1">
              Nombre
            </Label>
            <input
              id="nombre"
              type="text"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingrese un nombre"
            />
            <InputError messages={errors?.name} />
          </div>
          <div className="">
            <Label htmlFor="fechaInicio" className="flex ml-1">
              Fecha Inicio
            </Label>
            <input
              id="fechaInicio"
              type="date"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={fechaInicial}
              onChange={(e) => setFechaInicial(e.target.value)}
            />
            <InputError messages={errors?.initial_date} />
          </div>
          <div className="">
            <Label htmlFor="fechaFinal" className="flex ml-1">
              Fecha Final
            </Label>
            <input
              id="fechaFinal"
              type="date"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={fechaFinal}
              onChange={(e) => setFechaFinal(e.target.value)}
            />
            <InputError messages={errors?.final_date} />
          </div>
          <div className="">
            <Label htmlFor="amount" className="flex ml-1">
              Precio
            </Label>
            <input
              id="amount"
              type="number"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ingrese un precio"
            />
            <InputError messages={errors?.amount} />
          </div>
          <div className="">
            <Label htmlFor="descripcion" className="flex ml-1">
              Descripcion
            </Label>
            <Textarea
              id="descripcion"
              placeholder="Añada una descripción la rutina"
              value={descripcion}
              onChange={(e) => {
                setDescripcion(e.target.value);
              }}
            />
            <InputError messages={errors?.descriptions} />
          </div>
          <div className="">
            <Label htmlFor="color" className="flex ml-1">
              Color
            </Label>
            <input
              id="color"
              type="color"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <InputError messages={errors?.color} />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" disabled={loading} onClick={crearPlan}>
            Crear Plan {loading && <SimpleSpiner />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
