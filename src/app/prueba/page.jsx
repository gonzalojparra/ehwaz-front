'use client'
import { useEffect, useState } from "react";
import MultipleDescription from "./components/MultipleDescription";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Prueba(){
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [descrip, setDescrip] = useState(null);

    const set_descriptions = ()=>{
        //console.log(document.getElementsByName('description'));
        let descripciones = [];
        let inputs = document.getElementsByName('description_asd');
        console.log(inputs);
        if(inputs.length > 0){
            inputs.forEach((input)=>{
                descripciones.push(input.value);
            });
        }
        console.log(descripciones);
    }

    const dropInfo = ()=>{
        set_descriptions();
    }

    const cargarInfo= ()=>{
        setDescrip(['ASD', 'DSA']);
    }

    return (
        <div className='bg-background py-7 flex flex-col justify-start items-center min-h-[84vh]'>
            <div className='md:w-[500px] sm:w-full pb-8 flex flex-1 flex-col gap-4'>
                <Label htmlFor="fechaInicio" className="flex ml-1">
                Fecha Inicio:
                </Label>
                <input
                id="fechaInicio"
                type="date"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                />

                <Label htmlFor="fechaFin" className="flex ml-1">
                Fecha Fin:
                </Label>
                <input
                id="fechaFin"
                type="date"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                />

                <MultipleDescription fecha_inicio={fechaInicio} fecha_fin={fechaFin} classes={'flex flex-1 flex-col gap-4'} descrip={descrip}/>

                <Button
                type="button"
                onClick={dropInfo}
                >
                    Enviar
                </Button>

                <Button
                type="button"
                onClick={cargarInfo}
                >
                    Cargar Rutina
                </Button>

            </div>

        </div>
    )
}

