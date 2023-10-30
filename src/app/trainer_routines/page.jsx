'use client'

import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import SelectCustom from "./components/SelectCustom";
import Collapsable from "./components/Collapsable";
import SpinerCustom from "@/components/ui/spiner-custom";
import Calendario from "./components/Calendario";


export default function Page(){
    const pathname = usePathname();
    const router = useRouter();
    const [alumnos, setAlumnos] = useState(null);
    const [alumnoId, setAlumnoId] = useState(null);
    const [rutinas, setRutinas] = useState(null);
    const [goals, setGoals] = useState(null);
    const [estados, setEstados] = useState(null);


    useEffect(()=>{
        if (pathname != '/login' && pathname != '/registro') {
            axios.post('/api/permissions', { url: pathname })
              .then((res) => {
                if (res.data.data == false) {
                  router.push('/')
                }else{
                  obtener_alumnos();
                }
              });
          }
    }, [])

    const obtener_alumnos = async()=>{
        await axios.get('/api/trainer_students')
        .then((res)=>{
            setAlumnos(res.data.data);
            console.log('estudiantes:');
            console.log(res.data.data);
        })
    }

    const obtener_rutinas = async(e)=>{
        await axios.post("api/student_goals", {
            student_id: e
        })
        .then((res)=>{
            setGoals(res.data.data);
            console.log("goals:");
            console.log(res.data.data);
        })

        await axios.get('/api/get_estados')
        .then((res)=>{
            setEstados(res.data.data);
            console.log("estados:");
            console.log(res.data.data);
        })

        await axios
        .post("/api/student_routines", {
          student_id: e,
        })
        .then((response) => {
            setRutinas(response.data.data);
            console.log("rutinas:");
            console.log(response.data.data);
        })
    }

    return (
        <div className='bg-background py-7 flex flex-col justify-start items-center min-h-[84vh]'>
            <div className='md:w-[500px] sm:w-full pb-8'>
                {alumnos != null && <SelectCustom alumnos={alumnos} setAlumnoId={setAlumnoId} alumnoId={alumnoId} obtener_rutinas={obtener_rutinas}/>}

            </div>
            <div className="md:w-[1200px] sm:w-full pb-8">
                {(rutinas != null && alumnoId != null) ? <Collapsable data={rutinas} setRutinas={setRutinas} alumnoId={alumnoId} obtener_rutinas={obtener_rutinas} goals={goals} estados={estados}/> : <></>}
                {(rutinas == null && alumnoId != null) ? <SpinerCustom text={"Obteniendo rutinas..."}/> : <></>}
            </div>
            <div className="md:w-[1200px] sm:w-full pb-8">
                {(rutinas != null && alumnoId != null) ? <Calendario rutinas={rutinas} setRutinas={setRutinas} alumnoId={alumnoId} obtener_rutinas={obtener_rutinas}/> : <></>}
            </div>
        </div>
    )
}