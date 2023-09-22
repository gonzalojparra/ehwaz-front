'use client'

import { useEffect, useState } from 'react';

import { getTrainer } from '@/modules/trainers';

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
        <div className='flex flex-1 flex-col md:flex-row p-8'>
          <Image
            className='rounded-lg'
            src={trainer.profile_picture_url}
            alt={trainer.name}
            width={400}
            height={900}
            quality={100}
            style={{ display: trainer.profile_picture_url ? 'block' : 'none' }}
          />
          {!trainer.profile_picture_url && (
            <Skeleton width={400} height={900} />
          )}
          <div className='px-4'>
            <h1 className='text-5xl font-bold mt-4 text-center'>{trainer.name} <span className='bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#008080]'>{trainer.last_name}</span></h1>
            edad
            peso
            altura
            certificaciones
            cantidad de alumnos
            descripcion con ¿frase?
          </div>
        </div>
      </Container>
    </div>
  );
}
