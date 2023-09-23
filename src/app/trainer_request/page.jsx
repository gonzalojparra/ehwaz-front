'use client'

import { useEffect, useState } from "react";

import { getRequests } from "@/modules/trainers";

import SpinerCustom from "@/components/ui/spiner-custom";
import { Tabla } from "./components/Tabla";

export default function TrainerRequestPage() {
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    getRequests().then((requests) => {
      console.log(requests);
      setRequests(requests);
    });
  }, [])

  return (
    <div className='bg-background py-7 flex flex-col justify-center min-h-[84vh]'>
      {
        requests != null 
        ? <Tabla data={requests}/>
        : <SpinerCustom text={'Cargando Tabla'} />
      }
    </div>
  )
}