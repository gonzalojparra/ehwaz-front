'use client'

import axios from '@/lib/axios';

import { useEffect, useState } from "react";
import SimpleSpiner from '@/components/ui/simple-spiner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export default function Page(){
    const [rutina_id, setRutina_id] = useState(null);
    const [rutinas, setRutinas] = useState(null);

    const getRutinasImpagas = async()=>{
        await axios.get('/api/get_routines_unpayment')
        .then((res) => setRutinas(res.data.data));
    }

    useEffect(()=>{
        getRutinasImpagas();
    },[]);

    return (
        <div className='bg-background py-7 flex flex-col justify-start items-center min-h-[84vh]'>
            <div className='md:w-[500px] sm:w-full pb-8'>
                <div className='space-y-2'>
                    <Label htmlFor='rutinas' className='flex ml-1'>
                        Rutinas sin Pago
                    </Label>

                    {rutinas != null ? <Select 
                        id='rutinas'
                        onValueChange={
                            (e) => {setRutina_id(e)
                        }}
                    >
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Seleccione una rutina' />
                        </SelectTrigger>
                        <SelectContent>
                            {rutinas.map((rutina) => {
                                return (
                                    <SelectItem key={rutina.id} value={`${rutina.id}`}>
                                        {rutina.name}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>: <SimpleSpiner/>}
                </div>
            </div>
        </div>
    )
}