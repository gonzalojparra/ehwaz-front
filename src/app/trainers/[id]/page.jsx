'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

import { getTrainer } from '@/modules/trainers';

export default function TrainerPage({ params: { id } }) {
  const [trainer, setTrainer] = useState({});

  useEffect(() => {
    getTrainer(id).then((trainer) => {
      setTrainer(trainer);
    });
  }, [id]);

  const birthDate = new Date(trainer.day_of_birth);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();

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
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
                    </svg>
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
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                    </svg>
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
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <rect width='20' height='14' x='2' y='5' rx='2' />
                      <path d='M2 10h20' />
                    </svg>
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
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      className='h-4 w-4 text-muted-foreground'
                    >
                      <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                      <circle cx='9' cy='7' r='4' />
                      <path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+573</div>
                    <p className='text-xs text-muted-foreground'>+201 since last hour</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}