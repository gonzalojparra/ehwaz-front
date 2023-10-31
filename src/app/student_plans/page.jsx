'use client';

import { useEffect, useState } from 'react';

import axios from '@/lib/axios';

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
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Calendar from './components/Calendar';

export default function Calendario() {
  const [especialistas, setEspecialistas] = useState(null);
  const [especialistaId, setEspecialistaId] = useState('');
  const [planes, setPlanes] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const getEspecialistas = async () => {
    await axios.get('/api/student_specialists')
      .then((res) => setEspecialistas(res.data.data));
  };

  useEffect(() => {
    if (pathname != '/login' && pathname != '/registro') {
      axios.post('/api/permissions', { url: pathname })
        .then((res) => {
          if (res.data.data == false) {
            router.push('/')
          }else{
            getEspecialistas();
          }
        });
    }
    
  }, []);

  return (
    <div className='bg-background py-7 flex flex-col justify-start items-center min-h-[84vh]'>
      {especialistas != null ? <>
      <div className='md:w-[500px] sm:w-full pb-8'>
        <div className='space-y-2'>
          <Label htmlFor='especialistas' className='flex ml-1'>
            Especialistas
          </Label>
          
          <Select onValueChange={
            (e) => {setEspecialistaId(e)
          }}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Seleccione un especialista' />
            </SelectTrigger>
            <SelectContent>
              {especialistas.map((especialista) => {
                return (
                  <SelectItem key={especialista.specialist.id} value={`${especialista.specialist.id}`}>
                    {especialista.specialist.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select> 
        </div>
      </div>
      <Container>
        {especialistaId ? (
          <Calendar specialist_id={especialistaId} />
        ) : (
          <div className='text-center'>No hay planes</div>
        )}
      </Container>
      </> : <SpinerCustom text={'Cargando Especialistas...'}/>}
    </div>
  );
}
