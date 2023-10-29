'use client'

import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import SpinerCustom from "@/components/ui/spiner-custom";
import Tabla from "./components/Tabla";

export default function Page(){
    const pathname = usePathname();
    const router = useRouter();
    const [alumnos, setAlumnos] = useState(null);
    const [loadingAlumnos, setLoadingAlumnos] = useState(true);
    const [loading, setLoading] = useState(false);
    const [estados, setEstados] = useState(null);

    const getStados = async()=>{
        await axios.get('/api/status_student')
        .then((res)=>{
            console.log("estados:");
            console.log(res.data.data);
            setEstados(res.data.data);
        })
    }

    const getAlumnos = async()=>{
        await axios.get('/api/specialist_requests_admin')
        .then((res)=>{
            console.log('Alumnos:');
            console.log(res.data.data);
            setAlumnos(res.data.data);
            setLoadingAlumnos(false);
            setLoading(false);
        })
    }

    useEffect(()=>{
        if (pathname != '/login' && pathname != '/registro') {
            axios.post('/api/permissions', { url: pathname })
              .then((res) => {
                if (res.data.data == false) {
                  router.push('/')
                }else{
                    setLoadingAlumnos(true);
                    getStados();
                    getAlumnos();
                }
            });
        }
    }, []);


    return (
        <div className='bg-background py-7 flex flex-col justify-start items-center min-h-[84vh]'>
            <div className="md:w-[1200px] sm:w-full pb-8">
                {alumnos != null ? <Tabla data={alumnos} estados={estados} getAlumnos={getAlumnos} loading={loading} setLoading={setLoading}/> : <></>}
                {loadingAlumnos && <SpinerCustom text={"Cargando Alumnos..."}/>}
            </div>
        </div> 
    )
}