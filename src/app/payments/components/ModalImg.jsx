'use client'
import axios from "@/lib/axios"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
 

export default function ModalImg({src}){
    const [base, setBase] = useState(null);

    const obtenerBase = async()=>{
        await axios.get('api/ver_archivo/'+src.id)
        .then((res)=>{
            setBase(res.data.data);
        })
    }

    useEffect(()=>{
        obtenerBase()
    }, [])

    return (
        <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Ver Archivo</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Comprobante</DialogTitle>
          </DialogHeader>
          <Image src={base != null ? base : ''} width={400} height={400} alt="asd"/>
        </DialogContent>
      </Dialog>
    )
}