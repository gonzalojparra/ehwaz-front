'use client'

import { useEffect, useState } from 'react';
import { getTrainer } from '@/modules/trainers';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

export default function TrainerPage({ params: { id } }) {
  const [trainer, setTrainer] = useState({});

  useEffect(() => {
    getTrainer(id).then((trainer) => {
      console.log(trainer);
      setTrainer(trainer);
    });
  }, [id]);

  return (
    <div className='bg-background min-h-[84vh]'>
      <Container>
        <div className='flex flex-col md:flex-row p-8'>
          <div className='flex-none'>
            <Image
              className='rounded-lg'
              src={trainer.profile_picture_url}
              alt={trainer.name}
              width={400}
              height={900}
              quality={100}
              style={{ display: trainer.profile_picture_url ? 'block' : 'none' }}
            />
            {!trainer.profile_picture_url && <Skeleton width={400} height={900} />}
          </div>
          <div className='flex-grow px-4'>
            <h1 className='text-5xl font-bold mt-4 text-center'>
              {trainer.name}{' '}
              <span className='bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#008080]'>
                {trainer.last_name} 
              </span>
              <span className='text-sm font-light'>(27 años)</span>
            </h1>
            <div className='flex flex-col'>
              <div className='flex flex-wrap justify-between p-8 pt-6'>
                <div className='w-full md:w-1/2'>
                  <Card className='m-2 hover:scale-105 transition-transform cursor-pointer'>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0'>
                      <CardTitle className='text-sm font-medium'>Edad</CardTitle>
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
                      <div className='text-2xl font-bold'>$45,231.89</div>
                      <p className='text-xs text-muted-foreground'>+20.1% from last month</p>
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
                      <div className='text-2xl font-bold'>+2350</div>
                      <p className='text-xs text-muted-foreground'>+180.1% from last month</p>
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
                      <CardTitle className='text-sm font-medium'>Active Now</CardTitle>
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
                      <div className='text-2xl font-bold'>+573</div>
                      <p className='text-xs text-muted-foreground'>+201 since last hour</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}