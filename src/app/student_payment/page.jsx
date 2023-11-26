"use client";

import axios from "@/lib/axios";
import { useEffect, useState } from "react";

import SpinerCustom from "@/components/ui/spiner-custom";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import TablaRutinas from "./components/TablaRutinas";
import TablaPlanes from "./components/TablaPlanes";

export default function Page() {
  const pathname = usePathname();
  const router = useRouter();
  const [pagosRutinas, setPagosRutinas] = useState(null);
  const [pagosPlanes, setPagosPlanes] = useState(null);

  const obtenerPagosRutinas = async()=>{
    await axios.get('/api/pagos_rutinas_student')
    .then((res)=>{
        setPagosRutinas(res.data.data);
        console.log(res.data.data);
    })
  }

  const obtenerPagosPlanes = async()=>{
    await axios.get('/api/pagos_planes_student')
    .then((res)=>{
        setPagosPlanes(res.data.data);
        console.log(res.data.data);
    })
  }

  useEffect(() => {
    if (pathname != "/login" && pathname != "/registro") {
      axios.post("/api/permissions", { url: pathname }).then((res) => {
        if (res.data.data == false) {
          router.push("/");
        } else {
          obtenerPagosRutinas();
          obtenerPagosPlanes();
        }
      });
    }
  }, []);

  return (
    <div className='bg-background py-7 flex flex-col justify-start items-center min-h-[84vh]'>
            <div className='md:w-[1200px] sm:w-full pb-8'>
                <Tabs defaultValue="rutinas" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="rutinas">Pagos de Rutinas</TabsTrigger>
                        <TabsTrigger value="planes">Pagos de Planes</TabsTrigger>
                    </TabsList>
                    <TabsContent value="rutinas">
                        {pagosRutinas != null ?
                        <TablaRutinas data={pagosRutinas} />
                         : <SpinerCustom text={"Cargando pagos..."}/>}
                    </TabsContent>
                    <TabsContent value="planes">
                        {pagosPlanes != null ?
                        <TablaPlanes data={pagosPlanes} />
                         : <SpinerCustom text={"Cargando pagos..."}/>}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
  )
}
