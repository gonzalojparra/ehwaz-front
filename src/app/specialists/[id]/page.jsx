'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
  Instagram,
  Users,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';
import { assignSpecialist, isConnectedSpecialist } from '@/modules/students';
import { getSpecialistSocials, getSpecialist } from '@/modules/specialists';
import { useToast } from "@/components/ui/use-toast"
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { Tooltip } from '@/components/ui/tooltip';

export default function SpecialistPage({ params: { id } }) {
  const [specialist, setSpecialist] = useState({});
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [socials, setSocials] = useState({});
  const { toast } = useToast()

  useEffect(() => {
    getSpecialist(id)
      .then((specialist) => {
        setSpecialist(specialist);
      });
    isConnectedSpecialist(id)
      .then((isConnected) => {
        setIsConnected(isConnected);
      });
    getSpecialistSocials(id)
      .then((socials) => {
        setSocials(socials);
      });
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
            <div className='flex flex-col'>
              <div className='flex flex-wrap justify-center p-2 pb-8'>
                {socials.facebook && (
                  <div className='px-2'>
                    <Link href={`${socials.facebook}`} target='blank'>
                      <Facebook />
                    </Link>
                  </div>
                )}
                {socials.instagram && (
                  <div className='px-2'>
                    <Link href={`${socials.instagram}`} target='blank'>
                      <Instagram />
                    </Link>
                  </div>
                )}
                {socials.twitter && (
                  <div className='px-2'>
                    <Link href={`${socials.twitter}`} target='blank'>
                      <Twitter />
                    </Link>
                  </div>
                )}
                {socials.linkedin && (
                  <div className='px-2'>
                    <Link href={`${socials.linkedin}`} target='blank'>
                      <Linkedin />
                    </Link>
                  </div>
                )}
                {socials.whatsapp && (
                  <div className='px-2'>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className='pt-1'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16"> <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" /></svg>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{`${socials.whatsapp}`}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                )}
              </div>
            </div>
            <div className='flex justify-center md:justify-start px-10'>
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