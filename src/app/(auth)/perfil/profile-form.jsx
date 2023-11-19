'use client'

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import axios from '@/lib/axios';

import { cn } from '@/lib/utils';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/auth';

/**
 * Schema del formulario de perfil.
 * @typedef {Object} ProfileFormSchema
 * @property {string} name
 * @property {string} last_name
 * @property {string} description
 */
const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: 'El nombre debe contener al menos 2 caracteres.',
  }),
  last_name: z.string().min(2, {
    message: 'El apellido debe contener al menos 2 caracteres.',
  }),
  description: z.string().max(160).min(4),
});

export function ProfileForm() {
  const [role, setRole] = useState([]);
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useAuth({ middleware: 'auth' });
  const {toast} = useToast()

  const [defaultValues, setDefaultValues] = useState({
    name: '',
    last_name: '',
    description: '',
  });

  useEffect(() => {
    axios.get('/api/get-role')
      .then((res) => {
        setRole(res.data.data);
        if (res.data.data.includes('Trainer')) {
          axios.get(`/api/get_trainer_data/${user.id}`)
            .then((res) => {
              setName(res.data.data.name);
              setLastName(res.data.data.last_name);
              setDescription(res.data.data.description);
              form.reset({ ...setDefaultValues, name: res.data.data.name, last_name: res.data.data.last_name, description: res.data.data.description });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    if (user) {
      if (role.includes('Alumno')) {
        axios.get(`/api/get_student_data/${user.id}`)
          .then((res) => {
            setName(res.data.data.name);
            setLastName(res.data.data.last_name);
            setDescription(res.data.data.description);
            form.reset({ ...setDefaultValues, name: res.data.data.name, last_name: res.data.data.last_name, description: res.data.data.description });
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (role.includes('Trainer')) {
        axios.get(`/api/get_trainer_data/${user.id}`)
          .then((res) => {
            setName(res.data.data.name);
            setLastName(res.data.data.last_name);
            setDescription(res.data.data.description);
            form.reset({ ...setDefaultValues, name: res.data.data.name, last_name: res.data.data.last_name, description: res.data.data.description });
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (role.includes('Especialista')) {
        axios.get(`/api/get_specialist_data/${user.id}`)
          .then((res) => {
            setName(res.data.data.name);
            setLastName(res.data.data.last_name);
            setDescription(res.data.data.description);
            form.reset({ ...setDefaultValues, name: res.data.data.name, last_name: res.data.data.last_name, description: res.data.data.description });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [user]);

  /**
   * Crea un formulario utilizando la librería useForm de React Hook Form.
   * @param {Object} options - Opciones para configurar el formulario.
   * @param {Object} options.resolver - Validador de esquema Zod para validar los datos del formulario.
   * @param {Object} options.defaultValues - Valores por defecto para inicializar el formulario.
   * @param {string} options.mode - Modo de validación del formulario.
   * @returns {Object} - Objeto con los métodos y propiedades necesarios para manejar el formulario.
   */
  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { fields, append } = useFieldArray({
    name: 'urls',
    control: form.control,
  });

  async function onSubmit(data) {
    await axios.post('/api/set_perfil_data', {
      name: data.name,
      last_name: data.last_name,
      description: data.description,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder='Juan' {...field} />
              </FormControl>
              <FormDescription>
                Este será tu nombre que se mostrará públicamente y verán todos en el sitio.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='last_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Input placeholder='Perez' {...field} />
              </FormControl>
              <FormDescription>
                Este será tu apellido que se mostrará públicamente y verán todos en el sitio.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Cuéntanos lo más importante de ti...'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {role == 'Alumno'
                  ? 'Cuéntanos sobre ti, tus metas y objetivos.'
                  : 'Acerca de qué aspectos del entrenamiento te enfocas.'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Actualizar perfil</Button>
      </form>
    </Form>
  )
}