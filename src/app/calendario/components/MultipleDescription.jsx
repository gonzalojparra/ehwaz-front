'use client'
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function MultipleDescription({fecha_inicio, fecha_fin, classes, descrip}){
    const [mensaje, setMensaje] = useState('No ha seleccionado fechas o es un rango de fecha inválido');
    let inputs = [];
    console.log(descrip);
    
    if(fecha_inicio != '' && fecha_fin != ''){
        const d1 = new Date(fecha_inicio);
        const d2 = new Date(fecha_fin);
        if(d2 >= d1){
            const diffInMs = (d2-d1);
            if(diffInMs >= 0){
                const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)) + 2;
                for (let i= 1; i < diffInDays; i++){
                    let value = null;
                    if(descrip.length > 0){
                        if(descrip[i-1] != null){
                            value = descrip[i-1];
                        }else{
                            value = descrip[0];
                        }
                    }
                    inputs.push(<div key={'input_'+i} className={classes + ' mb-3'}>
                    <Label htmlFor={i} className="flex ml-1">
                    Rutina del día {i}:
                    </Label>
                    <input
                    id={i}
                    type="input"
                    name="description_asd"
                    value={value}
                    placeholder={"Rutina día "+i}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    </div>);
                    
                }
            }else{
                setMensaje('Rango de fechas inválido');
                inputs.push(mensaje);
            }

        }
    }
      
   

    return (
        <div className={classes}>
        {inputs.length > 0 ? 
        <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 gap-2">{inputs}</div>
        : <div>{mensaje}</div>}
        </div>        
    )
}