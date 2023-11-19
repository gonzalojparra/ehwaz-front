"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "@/lib/axios";
import SimpleSpiner from "@/components/ui/simple-spiner";
import { useToast } from "@/components/ui/use-toast"

const estados = [
  {
    id: 0,
    label: "Iniciado",
  },
  {
    id: 1,
    label: "Aceptado",
  },
  {
    id: 2,
    label: "Cancelado",
  },
];

function conocer_id_estado(estado) {
  let current = null;
  estados.forEach((element) => {
    if (element.label == estado) {
      current = element.id;
    }
  });
  return current;
  /* let esta = estados.filter((est)=>{
      if(est.label == estado){
          //console.log(est.id);
          return est
      }
  });
  //console.log(est);
  return esta; */
}

export function Modal({ payment_id, estado, obtenerPagos }) {
  let color = "";
  switch (estado) {
    case "Activo":
      color = "primary";
      break;

    case "Inactivo":
      color = "secondary";
      break;

    case "Cancelado":
      color = "destructive";
      break;

    default:
      break;
  }
  const [nuevoEstado, setNuevoEstado] = useState(conocer_id_estado(estado));
  const [sending, setSending] = useState(false);
  const [open, setOpen] = useState(false);
  const {toast} = useToast()

  const toggleModal = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const enviarInfo = async () => {
    console.log(nuevoEstado);
    setSending(true);
    await axios
      .post("/api/set_payment_status", {
        payment_id: payment_id,
        payment_status: nuevoEstado,
      })
      .then((res) => {
        setOpen(false);
        obtenerPagos();
        toast({
          title: "Información del pago modificada",
          description: "Se ha modificado el estado del pago",
          duration: 4000
        })
      });
    setSending(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={color == "primary" ? "default" : color}
          className={color}
          onClick={toggleModal}
        >
          {estado}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cambiar Estado</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Select
              onValueChange={(e) => {
                setNuevoEstado(e);
              }}
              defaultValue={nuevoEstado}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder="Seleccione un estado" /* defaultValue={nuevoEstado} */
                />
              </SelectTrigger>
              <SelectContent>
                {estados.map((estad) => {
                  return (
                    <SelectItem key={estad.id} value={`${estad.id}`}>
                      {estad.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" disabled={sending} onClick={enviarInfo}>
            Guardar Estado {sending && <SimpleSpiner/>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
