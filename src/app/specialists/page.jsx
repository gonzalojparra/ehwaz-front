'use client'

import { useEffect, useState } from "react";

import { getSpecialists } from '@/modules/specialists';

import Sidebar from './components/Sidebar';
import SpecialistCard from './components/SpecialistCard';
import { Badge } from "@/components/ui/badge";
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import axios from "@/lib/axios";

export default function TrainersPage() {

  const [specialists, setSpecialists] = useState([]);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname != '/login' && pathname != '/registro') {
      axios.post('/api/permissions', { url: pathname })
        .then((res) => {
          if (res.data.data == false) {
            router.push('/')
          } else {
            getSpecialists().then((specialists) => {
              console.log(specialists);
              setSpecialists(specialists);
            });
          }
        });
    }
  }, []);

  return (
    <div className='block'>
      <div className='border-t'>
        <div className='bg-background'>
          <div className='grid lg:grid-cols-6'>
            <Sidebar specialists={specialists} className='hidden lg:block' />
            <div className='col-span-3 lg:col-span-5 lg:border-l'>
              <div className='px-4 py-6 lg:px-8 min-h-[83.9vh]'>
                <Tabs defaultValue='trainers' className='h-full space-y-6'>
                  <div className='flex justify-around '>
                    <TabsList className='flex justify-center'>
                      <TabsTrigger value='trainers' className='relative' aria-current={true}>
                        Listado de Profesionales
                      </TabsTrigger>
                      <TabsTrigger value='topten' className='relative lg:hidden sm:block text-primary'>
                        TopTen
                      </TabsTrigger>
                    </TabsList>
                    <div className='ml-auto mr-4 '>
                      <Input className='w-full' placeholder='Buscar personal...' />
                    </div>
                  </div>
                  <TabsContent value='specialists' className='border-none p-0 outline-none'>
                    <div className='flex items-center justify-between'>
                      <div className='space-y-1'>
                        <h2 className='text-2xl font-semibold tracking-tight'>
                          ¡Todos nuestros Profesionales!
                        </h2>
                        <p className='text-sm text-muted-foreground'>
                          ¡Busca el que se adapte a tus necesidades aquí!
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          {specialists.length} especialistas
                        </p>
                      </div>
                    </div>
                    <Separator className='my-4' />
                    <div className='relative'>
                      <ScrollArea>
                        <div className='flex space-x-4 pb-4'>
                          {Array.isArray(specialists) && specialists.length > 0 && specialists.map((specialist) => (
                            <SpecialistCard
                              key={specialist.name}
                              specialist={specialist}
                              width={160}
                              height={160}
                            />
                          ))}
                        </div>
                        <ScrollBar orientation='horizontal' />
                      </ScrollArea>
                    </div>
                  </TabsContent>
                  {/*Este aparece solo en sm */}
                  <TabsContent value='topten' className='border-none p-0 outline-none'>
                    <div className='flex items-center justify-between'>
                      <div className='space-y-1'>
                        <h2 className='text-2xl font-semibold tracking-tight'>
                          ¡Nuestros <span className='text-primary'>Profesionales</span> mas buscados!
                        </h2>
                        <Badge variant="destructive" className=''>OnFire!</Badge>
                      </div>
                    </div>
                    <Separator className='my-4' />
                    <div className='relative'>
                      <ScrollArea>
                        <div className='flex space-x-4 pb-4'>
                          {Array.isArray(specialists) && specialists.length > 0 && specialists.map((specialist) => (
                            <SpecialistCard
                              key={specialist.name}
                              specialist={specialist}
                              width={160}
                              height={160}
                            />
                          ))}
                        </div>
                        <ScrollBar orientation='horizontal' />
                      </ScrollArea>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}