import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

import TrainerCard from './components/TrainerCard';
import Sidebar from './components/Sidebar';
import { trainers } from './data/trainer';
import { Input } from '@/components/ui/input';
import { Badge } from "@/components/ui/badge"


export default function TrainersPage() {
  return (
    <>
      <div className='block'>
        <div className='border-t'>
          <div className='bg-background'>
            <div className='grid lg:grid-cols-6'>
              <Sidebar trainers={trainers} className='hidden lg:block' />
              <div className='col-span-3 lg:col-span-5 lg:border-l'>
                <div className='h-full px-4 py-6 lg:px-8'>
                  <Tabs defaultValue='trainers' className='h-full space-y-6'>
                    <div className='flex justify-around '>
                      <TabsList className='flex justify-center'>
                        <TabsTrigger value='trainers' className='relative' aria-current={true}>
                          Listado de Entrenadores
                        </TabsTrigger>
                        <TabsTrigger value='topten' className='relative lg:hidden sm:block' >
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
                            {trainers.map((trainer) => (
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
                            {trainers.map((trainer) => (
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
    </>
  )
}