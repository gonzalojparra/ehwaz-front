'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import SimpleSpiner from '@/components/ui/simple-spiner';
import {
  User2,
  UserCheck2,
  Dumbbell,
  Ruler,
  ScrollText,
  Users
} from 'lucide-react';

import { assignSpecialist, isConnectedSpecialist } from '@/modules/students';
import { getSpecialist } from '@/modules/specialists';
import { useToast } from "@/components/ui/use-toast"

export default function SpecialistPage({ params: { id } }) {
  const [specialist, setSpecialist] = useState({});
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const {toast} = useToast()

  useEffect(() => {
    getSpecialist(id).then((specialist) => {
      setSpecialist(specialist);
    });
    isConnectedSpecialist(id)
      .then((isConnected) => {
        setIsConnected(isConnected);
      })
  }, [id]);

  const birthDate = new Date(specialist.day_of_birth);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();

  const handleAssignSpecialist = async () => {
    setLoading(true);
    await assignSpecialist(id);
    setIsConnected(true);
    setLoading(false);
  };

  return (
    <div className='bg-background min-h-[84vh]'>
      <div className='flex flex-col md:flex-row p-8'>
        <div className='flex-none'>
          <Image
            className='rounded-lg'
            src={specialist.profile_picture_url}
            alt={specialist.name}
            width={400}
            height={600}
            quality={100}
            style={{ display: specialist.profile_picture_url ? 'block' : 'none' }}
          />
        </div>
        <div className='flex-grow px-4'>
          <h1 className='text-5xl font-bold mt-4 text-center'>
            {specialist.name}{' '}
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#008080]'>
              {specialist.last_name}
            </span>
            <span className='text-sm font-light'>({age} años)</span>
          </h1>
          <div className='px-4 mx-auto text-center'>
            <p className='text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400'>{specialist.description}</p>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-wrap justify-between p-8 pt-6'>
              <div className='w-full md:w-1/2'>
                <Card className='m-2 hover:scale-105 transition-transform cursor-pointer'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0'>
                    <CardTitle className='text-sm font-medium'>Altura</CardTitle>
                    <Ruler />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>{specialist.height}</div>
                    <p className='text-xs text-muted-foreground'>(basado en centímetros)</p>
                  </CardContent>
                </Card>
              </div>
              <div className='w-full md:w-1/2'>
                <Card className='m-2 hover:scale-105 transition-transform cursor-pointer'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0'>
                    <CardTitle className='text-sm font-medium'>Peso</CardTitle>
                    <Dumbbell />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>{specialist.weight}</div>
                    <p className='text-xs text-muted-foreground'>(basado en kilogramos)</p>
                  </CardContent>
                </Card>
              </div>
              <div className='w-full md:w-1/2'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className='m-2 hover:scale-105 transition-transform cursor-pointer'>
                      <CardHeader className='flex flex-row items-center justify-between space-y-0'>
                        <CardTitle className='text-sm font-medium'>Certificados</CardTitle>
                        <ScrollText />
                      </CardHeader>
                      <CardContent>
                        <div className='text-2xl font-bold'>{specialist.qty_certificates}</div>
                        <p className='text-xs text-muted-foreground'>Títulos de estudio</p>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                      <DialogTitle>Certificados</DialogTitle>
                      <DialogDescription>
                        El especialista posee los siguientes certificados:
                      </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                      {specialist.certificates && Array.isArray(specialist.certificates) && (
                        <div className='grid gap-4 py-4'>
                          {specialist.certificates.map((certificate) => (
                            <div className='grid grid-cols-4 items-center gap-4'>
                              <Input
                                id='name'
                                defaultValue={certificate.name}
                                className='col-span-3'
                                disabled
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className='w-full md:w-1/2'>
                <Card className='m-2 hover:scale-105 transition-transform cursor-pointer'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0'>
                    <CardTitle className='text-sm font-medium'>Cantidad de alumnos</CardTitle>
                    <Users />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>{specialist.qty_students}</div>
                    <p className='text-xs text-muted-foreground'>Alumnos asociados</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className='flex justify-start px-10'>
              <Button onClick={handleAssignSpecialist} disabled={isConnected}>
                {
                  isConnected ? (
                    <>
                      <UserCheck2 className='mr-2 h-4 w-4' /> Conectado
                    </>
                  ) : (
                    <>
                      <User2 className='mr-2 h-4 w-4' /> Conectar {loading && <SimpleSpiner />}
                    </>
                  )
                }
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}