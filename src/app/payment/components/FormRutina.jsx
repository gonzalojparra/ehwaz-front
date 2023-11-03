import axios from "@/lib/axios";
import axFiles from "@/lib/axfiles";

import { Fragment, useEffect, useState } from "react";
import SpinerCustom from "@/components/ui/spiner-custom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import InputError from "@/components/ui/InputError";
import SimpleSpiner from "@/components/ui/simple-spiner";

export default function FormRutina({ data, getRutinasImpagas, setRutinas }) {
    const [rutinaId, setRutinaId] = useState(null);
    const [rutinaInfo, setRutinaInfo] = useState(null);
    const [reason, setReason] = useState('');
    const [payment_type, setPayment_type] = useState('');
    const [amount, setAmount] = useState('');
    const [loadingRutina, setLoadingRutina] = useState(null);
    const [files, setFiles] = useState('');
    const [sending, setSending] = useState(false);
    const [errors, setErrors] = useState([]);

    const get_rutina_info = async(e)=>{
        setLoadingRutina(true);
        await axios.post('/api/get_routine',{
            trainerroutine_id:e
        }).then((res)=>{setRutinaInfo(res.data.data); setLoadingRutina(false); setAmount(res.data.data.amount)})
    }

    const createPayment = async()=>{
        setSending(true);
        await axFiles.post('/api/payment_store', {
            trainerroutine_id: rutinaId,
            amount: amount,
            reason: reason,
            payment_type: payment_type,
            files: [files] 
        } )
        .then((res)=>{setErrors(null); setRutinaInfo(null); setRutinaId(null); setAmount(''); setReason(''); setPayment_type(''); setFiles(''); setRutinas(null); getRutinasImpagas(); })
        .catch((e) => {setErrors(e.response.data.errors);})
        setSending(false)
    }

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="md:w-[500px] sm:w-full pb-8">
        {data != null ? (
          <div className="space-y-2">
            <Label htmlFor="rutinas" className="flex ml-1">
              Rutinas sin Pago
            </Label>

            <Select
              id="rutinas"
              onValueChange={(e) => {
                setRutinaId(e);
                get_rutina_info(e);
                setRutinaInfo(null);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={"Seleccione una rutina para pagar"} />
              </SelectTrigger>
              <SelectContent>
                {data.map((rutina) => {
                  return (
                    <SelectItem key={rutina.id} value={`${rutina.id}`}>
                      {rutina.name} - {rutina.trainer.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <SpinerCustom text={"Cargando Rutinas no pagadas"} />
        )}
      </div>
      {rutinaInfo != null ? <div className="flex flex-col justify-center">
            {/* Poner form para crear pago */}
                            
                            <div className='md:w-[500px] sm:w-full pb-8'>
                                <Label htmlFor="nombre" className="flex ml-1 pb-3 pt-3">
                                    Nombre Rutina y Trainer:
                                </Label>
                                <input
                                id="nombre"
                                type="text"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={rutinaInfo.name + ' - ' + rutinaInfo.trainer.name}
                                onChange={(e)=>{}}
                                disabled={true}
                                />

                                <Label htmlFor="amount" className="flex ml-1 pb-3 pt-3">
                                    Monto:
                                </Label>
                                <input
                                id="amount"
                                type="number"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={rutinaInfo.amount}
                                onChange={(e)=>{}}
                                disabled={true}
                                />

                                <Label htmlFor="reason" className="flex ml-1 pb-3 pt-3">
                                    Descripción:
                                </Label>
                                <input
                                id="reason"
                                type="text"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={reason}
                                onChange={(e)=>setReason(e.target.value)}
                                placeholder='Ingrese una descripción y/o razón'
                                />
                                <InputError messages={errors?.reason} />

                                <Label htmlFor="payment_type" className="flex ml-1 pb-3 pt-3">
                                    Tipo de pago:
                                </Label>
                                <input
                                id="payment_type"
                                type="text"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={payment_type}
                                onChange={(e)=>setPayment_type(e.target.value)}
                                placeholder='Transferencia, pago en efectivo...'
                                />
                                <InputError messages={errors?.payment_type} />

                                <Label htmlFor="file" className="flex ml-1 pb-3 pt-3">
                                    Comprobante:
                                </Label>
                                <input
                                id="file"
                                type="file"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={files}
                                onChange={(e)=>setFiles(e.target.value)}
                                placeholder='Seleccione archivos'
                                />

                                <div className='flex justify-center'>
                                    <Button type="submit" onClick={createPayment} disabled={sending} className="mt-3">
                                        Enviar Pago {sending && <SimpleSpiner />}
                                    </Button>
                                </div>
                            </div>
            </div>: <>{loadingRutina &&<SpinerCustom text={'Cargando información de rutina elegida'}/> }</>}
    </div>
  );
}
