'use client'

import { Container } from '@/components/ui/container';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

export default function TrainerPage({ params: { id } }) {
  const [trainer, setTrainer] = useState({});

  useEffect(() => {
    const obtener = async () => {
      const data = await fetch(`http://localhost:8000/api/trainers/${id}`);
      const trainerData = await data.json()
      setTrainer(trainerData.trainer);
    };

    obtener();
  }, [id]);

  console.log(trainer);

  return (
    <div className='bg-background'>
      <Container>
        <div className='flex flex-1 flex-col md:flex-row p-8'>
          <Image
            className='rounded-lg'
            src={trainer.profile_picture_url}
            alt={trainer.name}
            width={400}
            height={900}
            quality={100}
          />
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
