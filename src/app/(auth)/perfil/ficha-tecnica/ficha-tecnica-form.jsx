'use client'

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/auth';

import axios from '@/lib/axios';

const defaultValues = {
  weight: 73.5,
  height: 1.82,
};

export function FichaTecnicaForm() {
  const [role, setRole] = useState([]);
  const { toast } = useToast();
  const { user } = useAuth({ middleware: 'auth' });

  useEffect(() => {
    axios.get('/api/get-role')
      .then((res) => {
        setRole(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const form = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const enviarData = async (data) => {
    await axios.post('/api/set_profile_data', {
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
  }

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
              <FormDescription>
                Peso expresado en kilogramos.
              </FormDescription>
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
              <FormDescription>
                Altura expresada en metros.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {role.includes('Alumno') && (
          <FormField
            control={form.control}
            name="goal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objetivo</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una meta" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Aumentar masa muscular">Aumentar masa muscular</SelectItem>
                    <SelectItem value="Disminuir grasa corporal">Disminuir grasa corporal</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Puede modificar sus objetivos para que su entrenador pueda ayudarlo a alcanzarlos.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type='submit'>Actualizar perfil</Button>
      </form>
    </Form>
  )
}