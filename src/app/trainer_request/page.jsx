'use client'

import { useEffect, useState } from "react";

import { getRequests } from "@/modules/trainers";
import axios from "@/lib/axios";

import SpinerCustom from "@/components/ui/spiner-custom";
import TablaMejorada from "./components/TablaMejorada";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Tabla from "./components/Tabla";

export default function TrainerRequestPage() {
  const [requests, setRequests] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  const [estados, setEstados] = useState(null);
  const [loading, setLoading] = useState(null);

  const getEstados = async()=>{
    await axios.get('/api/status_student')
    .then((res)=>{
      setEstados(res.data.data);
    })
  }

  const obtenerInfo = async()=>{
    await axios.get('/api/trainer_students')
    .then((res)=>{
      setRequests(res.data.data)
    })
  }

  useEffect(() => {
    if (pathname != '/login' && pathname != '/registro') {
      axios.post('/api/permissions', { url: pathname })
        .then((res) => {
          if (res.data.data == false) {
            router.push('/')
          }else{
            getEstados();
            obtenerInfo();
          }
        });
    }
    
  }, [])

  return (
    <div className='bg-background py-7 flex flex-col justify-start items-center min-h-[84vh]'>
       <div className='md:w-[1200px] sm:w-full pb-8'>
       {
        requests != null 
        ?  <Tabla data={requests} estados={estados} getAlumnos={obtenerInfo} loading={loading} setLoading={setLoading}/>
        : <SpinerCustom text={'Cargando Tabla'} />
      }
       </div>
    </div>
  )
}