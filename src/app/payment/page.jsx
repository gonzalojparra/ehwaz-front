'use client'

import axios from '@/lib/axios';

import { useEffect, useState } from "react";
import SpinerCustom from '@/components/ui/spiner-custom';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import InputError from "@/components/ui/InputError";
import SimpleSpiner from "@/components/ui/simple-spiner";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import FormRutina from './components/FormRutina';
import FormPlan from './components/FormPlan';

export default function Page(){
    const [rutina_id, setRutina_id] = useState(null);
    const [rutinas, setRutinas] = useState(null);
    const [planes, setPlanes] = useState(null);
    const [rutinaInfo, setRutinaInfo] = useState(null);
    const pathname = usePathname();
    const router = useRouter();

    const getRutinasImpagas = async()=>{
        await axios.get('/api/get_routines_unpayment')
        .then((res) => setRutinas(res.data.data));
    }

    const getPlanesImpagos = async()=>{
        await axios.get('/api/get_plans_unpayment')
        .then((res) => setPlanes(res.data.data));
    }

    useEffect(()=>{
        if (pathname != '/login' && pathname != '/registro') {
            axios.post('/api/permissions', { url: pathname })
              .then((res) => {
                if (res.data.data == false) {
                  router.push('/')
                }else{
                    getRutinasImpagas();
                    getPlanesImpagos();
                }
              });
          }
       
    },[]);


    return (
        <div className='bg-background py-7 flex flex-col justify-start items-center min-h-[84vh]'>
            <Tabs defaultValue="rutinas" className="w-[1200px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="rutinas">Rutinas</TabsTrigger>
                    <TabsTrigger value="planes">Planes</TabsTrigger>
                </TabsList>
                <TabsContent value="rutinas">
                    <FormRutina data={rutinas} getRutinasImpagas={getRutinasImpagas} setRutinas={setRutinas}/>
                </TabsContent>
                <TabsContent value="planes">
                    <FormPlan data={planes} getRutinasImpagas={getPlanesImpagos} setRutinas={setPlanes}/>
                </TabsContent>
            </Tabs>
        </div>
    )
}