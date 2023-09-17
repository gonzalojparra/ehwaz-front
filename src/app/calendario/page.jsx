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

export default function Calendario() {
  const [students, setStudents] = useState([]);
  const [student_id, setStudent_id] = useState('');
  const [recargarEventos, setRecargarEventos] = useState(false);
  const [rutinas, setRutinas] = useState(null);

  const traer_estudiantes = async () => {
    await axios.get('/api/trainer_students/1')
      .then((res) => setStudents(res.data));
  };

  useEffect(() => {
    traer_estudiantes();
  }, []);

  return (
    <div className='bg-background py-7 flex flex-col justify-center items-center'>
      <div className='w-[500px] pb-8'>
        <div className='space-y-2'>
          <Label htmlFor='estudiantes' className='flex ml-1'>
            Estudiantes
          </Label>
          <Select onValueChange={
            (e) => {setStudent_id(e)
          }}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Seleccione un estudiante' />
            </SelectTrigger>
            <SelectContent>
              {students.map((student) => {
                return (
                  <SelectItem key={student.id} value={`${student.id}`}>
                    {student.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Container>
        {student_id ? (
          <CalendarComponent student={student_id} />
        ) : (
          <div className='text-center'>No hay rutinas</div>
        )}
      </Container>
    </div>
  );
}
