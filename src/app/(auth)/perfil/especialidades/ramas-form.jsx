'use client'

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from '@/lib/axios';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/auth';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
          name='weight'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peso</FormLabel>
              <FormControl>
                <Input placeholder='73.5' {...field} />
              </FormControl>
              <FormDescription>Peso expresado en kilogramos.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='height'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Altura</FormLabel>
              <FormControl>
                <Input placeholder='1.82' {...field} />
              </FormControl>
              <FormDescription>Altura expresada en metros.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {role.includes('Alumno') && (
          <FormField
            control={form.control}
            name='goal'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objetivo</FormLabel>
                <Select {...field}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Seleccione una meta' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='Aumentar masa muscular'>
                      Aumentar masa muscular
                    </SelectItem>
                    <SelectItem value='Disminuir grasa corporal'>
                      Disminuir grasa corporal
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Puede modificar sus objetivos para que su entrenador pueda
                  ayudarlo a alcanzarlos.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type='submit'>Actualizar perfil</Button>
      </form>
    </Form>
  );
}