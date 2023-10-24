'use client'

import axios from '@/lib/axios';

import { useEffect, useState } from "react";
import SpinerCustom from '@/components/ui/spiner-custom';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import InputError from "@/components/ui/InputError";
import SimpleSpiner from "@/components/ui/simple-spiner";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Page(){
    const [rutina_id, setRutina_id] = useState(null);
    const [rutinas, setRutinas] = useState(null);
    const [rutinaInfo, setRutinaInfo] = useState(null);
    const [loadingRutina, setLoadingRutina] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    /* campos formulario */
    const [amount, setAmount] = useState('');
    const [reason, setReason] = useState('');
    const [payment_type, setPayment_type] = useState('');
    const [sending, setSending] = useState(false);
    const [errors, setErrors] = useState(null);

    const getRutinasImpagas = async()=>{
        await axios.get('/api/get_routines_unpayment')
        .then((res) => setRutinas(res.data.data));
    }

    useEffect(()=>{
        if (pathname != '/login' && pathname != '/registro') {
            axios.post('/api/permissions', { url: pathname })
              .then((res) => {
                if (res.data.data == false) {
                  router.push('/')
                }else{
                    getRutinasImpagas();
                }
              });
          }
       
    },[]);

    const get_rutina_info = async(e)=>{
        setLoadingRutina(true);
        await axios.post('/api/get_routine',{
            trainerroutine_id:e
        }).then((res)=>{setRutinaInfo(res.data.data); setLoadingRutina(false); setAmount(res.data.data.amount)})
    }

    const createPayment = async()=>{
        setSending(true);
        await axios.post('/api/payment_store', {
            trainerroutine_id: rutina_id,
            amount: amount,
            reason: reason,
            payment_type: payment_type 
        })
        .then((res)=>{setErrors(null); setRutinaInfo(null); setRutina_id(null); setAmount(''); setReason(''); setPayment_type(''); setRutinas(null); getRutinasImpagas(); })
        .catch((e) => {setErrors(e.response.data.errors);})
        setSending(false)
    }

    return (
        <div className='bg-background py-7 flex flex-col justify-start items-center min-h-[84vh]'>
            <div className='md:w-[500px] sm:w-full pb-8'>
                {rutinas != null ? <div className='space-y-2'>
                    <Label htmlFor='rutinas' className='flex ml-1'>
                        Rutinas sin Pago
                    </Label>

                    <Select 
                        id='rutinas'
                        onValueChange={
                            (e) => {setRutina_id(e); get_rutina_info(e); setRutinaInfo(null)}
                        }
                    >
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder={'Seleccione una rutina para pagar'} />
                        </SelectTrigger> 
                        <SelectContent>
                             {rutinas.map((rutina) => {
                                return (
                                    <SelectItem key={rutina.id} value={`${rutina.id}`}>
                                        {rutina.name} - {rutina.trainer.name}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                        
                    </Select>
                </div>: <SpinerCustom text={'Cargando Rutinas no pagadas'}/>}
            </div>
            {rutinaInfo != null ? <div className="flex">
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

                                <div className='flex justify-center'>
                                    <Button type="submit" onClick={createPayment} disabled={sending} className="mt-3">
                                        Enviar Pago {sending && <SimpleSpiner />}
                                    </Button>
                                </div>
                            </div>
            </div>: <>{loadingRutina &&<SpinerCustom text={'Cargando información de rutina elegida'}/> }</>}
        </div>
    )
}