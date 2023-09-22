'use client'
import { useEffect, useState } from "react"
import SpinerCustom from "@/components/ui/spiner-custom"
import { getRequests } from "@/modules/trainers"
import Tabla from "./components/Tabla"


export default function TableDemo() {
    const [requests, setRequests] = useState([])
    console.log(requests);
    useEffect(()=>{
        getRequests().then((requests) => {
            setRequests(requests);
            console.log(requests);
          });
    }, [])

    return (
        <div className='bg-background py-7 flex flex-col justify-center min-h-[84vh]'>
        
      {requests.length > 0 ? <Tabla data={requests}/> : <SpinerCustom text={'Cargando Tabla'}/>}
      </div>
    )
  }