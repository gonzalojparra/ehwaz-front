'use client'

import axios from "@/lib/axios";
import { useEffect, useState } from "react";

import { Tabla } from "./components/Tabla";

import SpinerCustom from "@/components/ui/spiner-custom";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Payments(){
    const [pagos, setPagos] = useState(null);
    const [rol, setRol] = useState(null);
    const pathname = usePathname();
    const router = useRouter();

    const obtenerPagos = async()=>{
        await axios.get('/api/payments')
        .then((res)=> {setPagos(res.data.data); })
        .catch((e)=>{
            console.log(e.errors);
        })
    }

    const obtenerRol = async()=>{
        await axios.get('api/get-role')
        .then((res)=>{
            setRol(res.data.data[0]);
            //console.log(res.data.data[0]);
        })
        .catch((e)=>{
            console.log(e.errors);
        })
    }

    useEffect(()=>{
        if (pathname != '/login' && pathname != '/registro') {
            axios.post('/api/permissions', { url: pathname })
              .then((res) => {
                if (res.data.data == false) {
                  router.push('/')
                }else{
                    obtenerPagos();
                    obtenerRol();
                }
              });
          }
        
    }, []);

    return (
        <div className='bg-background py-7 flex flex-col justify-start items-center min-h-[84vh]'>
            <div className='md:w-[1200px] sm:w-full pb-8'>
                {(pagos != null ) ? <Tabla data={pagos} obtenerPagos={obtenerPagos} />:<SpinerCustom text={'Cargando pagos...'} />}
            </div>
        </div>
    )
}