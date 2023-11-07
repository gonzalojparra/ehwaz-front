'use client'

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/auth';

import axios from '@/lib/axios';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function RamasForm() {
  const [role, setRole] = useState([]);
  const { toast } = useToast();
  const { user } = useAuth({ middleware: 'auth' });
  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      weight: '',
      height: '',
      goal: '',
    },
  });

  useEffect(() => {
    axios
      .get('/api/get-role')
      .then((res) => {
        setRole(res.data.data[0]);
        if (user) {
          if (role.includes('Trainer')) {
            axios
              .get(`/api/get_trainer_data/${user.id}`)
              .then((res) => {
                const { weight, height } = res.data.data;
                form.setValue('weight', weight);
                form.setValue('height', height);
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (role.includes('Alumno')) {
            axios
              .get(`/api/get_student_data/${user.id}`)
              .then((res) => {
                const { weight, height, goal } = res.data.data;
                form.setValue('weight', weight);
                form.setValue('height', height);
                form.setValue('goal', goal);
              })
              .catch((err) => {
                console.log(err);
              });
          } else if (role.includes('Especialista')) {
            axios
              .get(`/api/get_specialist_data/${user.id}`)
              .then((res) => {
                const { weight, height } = res.data.data;
                form.setValue('weight', weight);
                form.setValue('height', height);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  const enviarData = async (data) => {
    await axios
      .post('/api/set_profile_data', {
        weight: data.weight,
        height: data.height,
        goal: data.goal,
      })
      .then((res) => {
        toast({
          title: 'Datos actualizados',
          description: 'Se han actualizado los datos de su ficha técnica.',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(enviarData)} className='space-y-8'>
        <FormField
          control={form.control}
          name='especialidad'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rama</FormLabel>
              <Select {...field}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Seleccione una rama' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='Nutricionista'>
                    Nutricionista
                  </SelectItem>
                  <SelectItem value='Kinesiologo deportologo'>
                    Kinesiologo deportologo
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Puede modificar su rama para que los alumnos puedan contactarlo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Actualizar perfil</Button>
      </form>
    </Form>
  );
}