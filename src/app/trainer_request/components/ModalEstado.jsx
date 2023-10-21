'use client'

import { useEffect, useState } from "react";
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

export default function ModalEstado({tupla_id, estado, getRequests}){
    let color = '';
    switch (estado) {
        case "Activo":
          color = "primary"
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


    useEffect(()=>{
        cambiarEstado(tupla_id, estado);
    }, [])

    //const [color, setColor] = useState();
    const [idTupla, setIdTupla] = useState();
    const [estados, setEstados] = useState([
        { id: 1, label: "Activo" },
        { id: 2, label: "Inactivo" },
        { id: 3, label: "Cancelado" },
      ]);
    const [stado, setStado] = useState(null);
    const cambiarEstado = (id_de_tupla, state) => {
        console.log(state);
        console.log(id_de_tupla)
        setIdTupla(id_de_tupla);
        switch (state) {
          case "Activo":
            setStado(1);
            //setColor("primary");
            break;
    
          case "Inactivo":
            setStado(2);
            //setColor("secondary");
            break;
    
          case "Cancelado":
            setStado(3);
            //setColor("destructive");
            break;
    
          default:
            break;
        }
        //console.log(color);
    };
    const [open, setOpen] = useState(false);
    const [sending, setSending] = useState(false);
    const toggleModal = () => {
        if (open) {
          setOpen(false);
        } else {
          setOpen(true);
        }
    }

    const sendInfo = async () => {
        const res = await axios
          .post("/api/change_status", {
            id_tupla: idTupla,
            estado: stado,
          })
          .then((response) => {
            return true;
          })
        return res;
      };

    const enviarInfo = async()=>{
        setSending(true);
        if (await sendInfo()) {
            setSending(false);
            setOpen(false);
            getRequests();
        } else {
          setSending(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={color == "primary" ? "default" : color} className={color} onClick={toggleModal}>{estado}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cambiar Estado</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Select
              onValueChange={(e) => setStado(e)} 
              defaultValue={stado}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione un estado"/>
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
        </div>
        <DialogFooter>
          <Button type="button" onClick={enviarInfo} disabled={sending}>Guardar Nuevo Estado {sending && <SimpleSpiner/>}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )
}