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
  const [branches, setBranches] = useState([]);
  const { toast } = useToast();
  const { user } = useAuth({ middleware: 'auth' });
  const form = useForm({
    mode: 'onChange',
  });

  const getBranches = async () => {
    await axios.get('/api/get_branches')
      .then((res) => {
        setBranches(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get('/api/get-role')
      .then((res) => {
        setRole(res.data.data[0]);
        getBranches();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  const enviarData = async (data) => {
    console.log(data);
    const { branch } = data;
    try {
      console.log(branch);
      await axios.post('/api/set_branch', { branch });
      toast({
        title: 'Datos actualizados',
        description: 'Se han actualizado los datos de su especialidad.',
      });
    } catch (err) {
      console.log(branch);
      console.log(err);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(enviarData)} className='space-y-8'>
        <FormField
          control={form.control}
          name='branch'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rama</FormLabel>
              <Select
                {...field}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Seleccione una rama' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.name}>
                      {branch.name}
                    </SelectItem>
                  ))}
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