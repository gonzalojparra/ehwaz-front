'use client'

import { useEffect, useState } from "react";

import { getTrainers } from '@/modules/trainers';

import Sidebar from './components/Sidebar';
import TrainerCard from './components/TrainerCard';
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

export default function TrainersPage() {

  const [trainers, setTrainers] = useState([]);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname != '/login' && pathname != '/registro') {
      axios.post('/api/permissions', { url: pathname })
        .then((res) => {
          if (res.data.data == false) {
            router.push('/')
          }else{
            getTrainers().then((trainers) => {
              console.log(trainers);
              setTrainers(trainers);
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
            <Sidebar trainers={trainers} className='hidden lg:block' />
            <div className='col-span-3 lg:col-span-5 lg:border-l'>
              <div className='px-4 py-6 lg:px-8 min-h-[83.9vh]'>
                <Tabs defaultValue='trainers' className='h-full space-y-6'>
                  <div className='flex justify-around '>
                    <TabsList className='flex justify-center'>
                      <TabsTrigger value='trainers' className='relative' aria-current={true}>
                        Listado de Entrenadores
                      </TabsTrigger>
                      <TabsTrigger value='topten' className='relative lg:hidden sm:block text-primary'>
                        TopTen
                      </TabsTrigger>
                    </TabsList>
                    <div className='ml-auto mr-4 '>
                      <Input className='w-full' placeholder='Buscar personal...' />
                    </div>
                  </div>
                  <TabsContent value='trainers' className='border-none p-0 outline-none'>
                    <div className='flex items-center justify-between'>
                      <div className='space-y-1'>
                        <h2 className='text-2xl font-semibold tracking-tight'>
                          ¡Todos nuestros Entrenadores!
                        </h2>
                        <p className='text-sm text-muted-foreground'>
                          ¡Busca el que se adapte a tus necesidades aquí!
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          {trainers.length} trainers
                        </p>
                      </div>
                    </div>
                    <Separator className='my-4' />
                    <div className='relative'>
                      <ScrollArea>
                        <div className='flex space-x-4 pb-4'>
                          {Array.isArray(trainers) && trainers.length > 0 && trainers.map((trainer) => (
                            <TrainerCard
                              key={trainer.name}
                              trainer={trainer}
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
                          ¡Nuestros <span className='text-primary'>Entrenadores</span> mas buscados!
                        </h2>
                        <Badge variant="destructive" className=''>OnFire!</Badge>
                      </div>
                    </div>
                    <Separator className='my-4' />
                    <div className='relative'>
                      <ScrollArea>
                        <div className='flex space-x-4 pb-4'>
                          {Array.isArray(trainers) && trainers.length > 0 && trainers.map((trainer) => (
                            <TrainerCard
                              key={trainer.name}
                              trainer={trainer}
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