'use client'

import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Page() {
    const [codigo, setCodigo] = useState('');
    const [rta, setRta] = useState(null);

    const consulta = async()=>{
        await axios.post('api/consume-soap-service', {param_country:codigo})
        .then((res)=>{
            setRta(res.data);
            console.log(res.data);
        })
        .catch((e)=>{
            console.log(e.response.data.error);
        })
    }

    return (
        <div className='bg-background py-7 flex flex-col justify-start items-center min-h-[84vh]'>
            <div className='md:w-[1200px] sm:w-full pb-8'>
                <Label >Ingrese el número de codigo a buscar:</Label>
                <Input
                    value={codigo}
                    onChange={(e) => { setCodigo(e.target.value) }}
                    type={"text"} />
                <Button onClick={()=>consulta()}>Buscar</Button>
                {rta != null ?
                    <Image src={rta.FullCountryInfoResult.sCountryFlag} alt="imagen" width={400} height={400}/>                    
                : <></>}
            </div>
        </div>
    )

}