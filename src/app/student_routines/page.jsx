'use client';

import { useEffect, useState } from 'react';

import axios from '@/lib/axios';

import CalendarComponent from './components/Calendar';
import { Container } from '@/components/ui/container';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SpinerCustom from '@/components/ui/spiner-custom';

export default function Calendario() {
  const [trainers, setTrainers] = useState(null);
  const [trainer_id, setTrainer_id] = useState('');
  const [recargarEventos, setRecargarEventos] = useState(false);
  const [rutinas, setRutinas] = useState(null);

  const getTrainers = async () => {
    await axios.get('/api/student_trainers')
      .then((res) => setTrainers(res.data.data));
  };

  useEffect(() => {
    getTrainers();
  }, []);

  return (
    <div className='bg-background py-7 flex flex-col justify-start items-center min-h-[84vh]'>
      {trainers != null ? <>
      <div className='md:w-[500px] sm:w-full pb-8'>
        <div className='space-y-2'>
          <Label htmlFor='trainers' className='flex ml-1'>
            Trainers
          </Label>
          
          <Select onValueChange={
            (e) => {setTrainer_id(e)
          }}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Seleccione un trainer' />
            </SelectTrigger>
            <SelectContent>
              {trainers.map((trainer) => {
                return (
                  <SelectItem key={trainer.id} value={`${trainer.id}`}>
                    {trainer.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select> 
        </div>
      </div>
      <Container>
        {trainer_id ? (
          <CalendarComponent trainer={trainer_id} />
        ) : (
          <div className='text-center'>No hay rutinas</div>
        )}
      </Container>
      </> : <SpinerCustom text={'Cargando Trainers'}/>}
    </div>
  );
}
