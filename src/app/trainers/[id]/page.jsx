'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import SimpleSpiner from '@/components/ui/simple-spiner';
import {
  User2,
  UserCheck2,
  Dumbbell,
  Ruler,
  ScrollText,
  Users
} from 'lucide-react';

import { assignTrainer, isConnectedTrainer } from '@/modules/students';
import { getTrainer } from '@/modules/trainers';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function TrainerPage({ params: { id } }) {
  const [trainer, setTrainer] = useState({});
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname != '/login' && pathname != '/registro') {
      axios.post('/api/permissions', { url: pathname })
        .then((res) => {
          if (res.data.data == false) {
            router.push('/')
          }else{
            getTrainer(id).then((trainer) => {
              setTrainer(trainer);
            });
          }
        });
    }
    
    
  }, [id]);

  useEffect(() => {
    isConnectedTrainer(id).then((isConnected) => {
      console.log(isConnected);
      setIsConnected(isConnected);
    })
  }, []);

  const birthDate = new Date(trainer.day_of_birth);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();

  const handleAssignTrainer = async () => {
    setLoading(true);
    await assignTrainer(id);
    setIsConnected(true);
    setLoading(false);
  };

  return (
    <div className='bg-background min-h-[84vh]'>
      <div className='flex flex-col md:flex-row p-8'>
        <div className='flex-none'>
          <Image
            className='rounded-lg'
            src={trainer.profile_picture_url}
            alt={trainer.name}
            width={400}
            height={600}
            quality={100}
            style={{ display: trainer.profile_picture_url ? 'block' : 'none' }}
          />
        </div>
        <div className='flex-grow px-4'>
          <h1 className='text-5xl font-bold mt-4 text-center'>
            {trainer.name}{' '}
            <span className='bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#008080]'>
              {trainer.last_name}
            </span>
            <span className='text-sm font-light'>({age} años)</span>
          </h1>
          <div className="px-4 mx-auto text-center">
            <p className="text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">{trainer.description}</p>
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
                    <div className='text-2xl font-bold'>{trainer.height}</div>
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
                    <div className='text-2xl font-bold'>{trainer.weight}</div>
                    <p className='text-xs text-muted-foreground'>(basado en kilogramos)</p>
                  </CardContent>
                </Card>
              </div>
              <div className='w-full md:w-1/2'>
                <Card className='m-2 hover:scale-105 transition-transform cursor-pointer'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0'>
                    <CardTitle className='text-sm font-medium'>Certificados</CardTitle>
                    <ScrollText />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+12,234</div>
                    <p className='text-xs text-muted-foreground'>+19% from last month</p>
                  </CardContent>
                </Card>
              </div>
              <div className='w-full md:w-1/2'>
                <Card className='m-2 hover:scale-105 transition-transform cursor-pointer'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0'>
                    <CardTitle className='text-sm font-medium'>Cantidad de alumnos</CardTitle>
                    <Users />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+573</div>
                    <p className='text-xs text-muted-foreground'>+201 since last hour</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className='flex justify-start px-10'>
              <Button onClick={handleAssignTrainer} disabled={isConnected}>
                {
                  isConnected ? (
                    <>
                      <UserCheck2 className="mr-2 h-4 w-4" /> Conectado
                    </>
                  ) : (
                    <>
                      <User2 className="mr-2 h-4 w-4" /> Conectar {loading && <SimpleSpiner />}
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