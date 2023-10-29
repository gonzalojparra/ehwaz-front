'use client'

import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import SelectCustom from "./components/SelectCustom";
import Collapsable from "./components/Collapsable";
import SimpleSpiner from "@/components/ui/simple-spiner";
import SpinerCustom from "@/components/ui/spiner-custom";
import Calendario from "./components/Calendario";

export default function Page(){
    const pathname = usePathname();
    const router = useRouter();
    const [alumnos, setAlumnos] = useState(null);
    const [alumnoId, setAlumnoId] = useState(null);
    const [planes, setPlanes] = useState(null);
    const [estados, setEstados] = useState(null);

    const getAlumnos = async()=>{
        await axios.get('/api/specialist_requests')
        .then((res)=>{
            console.log('Alumnos:');
            console.log(res.data.data);
            setAlumnos(res.data.data);
        })
    }

    const obtener_planes = async(e)=>{
        await axios.get('/api/get_estados')
        .then((res)=>{
            setEstados(res.data.data);
            console.log("estados:");
            console.log(res.data.data);
        })

        await axios.post('/api/get_planes_student', {
            student_id: e
        })
        .then((res)=>{
            console.log("planes:");
            console.log(res.data.data);
            setPlanes(res.data.data);
        })
    }

    useEffect(()=>{
        if (pathname != '/login' && pathname != '/registro') {
            axios.post('/api/permissions', { url: pathname })
              .then((res) => {
                if (res.data.data == false) {
                  router.push('/')
                }else{
                  getAlumnos();
                }
            });
        }
    }, [])

    return (
        <div className='bg-background py-7 flex flex-col justify-start items-center min-h-[84vh]'>
            <div className='md:w-[500px] sm:w-full pb-8'>
                <SelectCustom alumnos={alumnos} setAlumnoId={setAlumnoId} alumnoId={alumnoId} obtener_planes={obtener_planes}/>
            </div>
            <div className="md:w-[1200px] sm:w-full pb-8">
                {planes != null && alumnoId != null ? <Collapsable data={planes} alumnoId={alumnoId} obtener_planes={obtener_planes} estados={estados} setPlanes={setPlanes}/> : <></>}
                {planes == null && alumnoId != null ? <SpinerCustom text={"Cargando planes..."}/> : <></>}
            </div>
            <div className="md:w-[1200px] sm:w-full pb-8">
                {planes != null && alumnoId != null ? <Calendario planes={planes}/> : <></>}
            </div>
        </div>
    )
}