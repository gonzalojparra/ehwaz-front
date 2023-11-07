'use client'

import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import SimpleSpiner from "@/components/ui/simple-spiner";

export default function Page() {
    const [codigo, setCodigo] = useState('');
    const [rta, setRta] = useState(null);
    const [loading, setLoading] = useState(false);

    const consulta = async()=>{
        setLoading(true)
        await axios.post('api/consume-soap-service', {param_country:codigo})
        .then((res)=>{
            setRta(res.data);
            console.log(res.data);
            setLoading(false);
        })
        .catch((e)=>{
            console.log(e.response.data.error);
            setLoading(false);
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
                <Button onClick={()=>consulta()}>Buscar {loading && <SimpleSpiner/>}</Button>
                {rta != null && rta.FullCountryInfoResult.sName != "Country not found in the database"?
                    <Image src={rta.FullCountryInfoResult.sCountryFlag} alt="imagen" width={400} height={400}/>                    
                : <></>}
                {rta != null && rta.FullCountryInfoResult.sName == "Country not found in the database" && !loading? <div>No se ha encontrado información del país</div> : <></>}
            </div>
        </div>
    )

}