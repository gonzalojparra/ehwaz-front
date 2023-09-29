'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/toast';
import { useAuth } from '@/hooks/auth';

/**
 * Esquema de validación para el formulario de perfil de usuario.
 * @typedef {Object} ProfileFormSchema
 * @property {string} username - Nombre de usuario con longitud entre 2 y 30 caracteres.
 * @property {string} email - Dirección de correo electrónico válida.
 * @property {string} bio - Biografía del usuario con longitud entre 4 y 160 caracteres.
 * @property {Array.<{value: string}>|undefined} urls - Array opcional de objetos con propiedad 'value' que debe ser una URL válida.
 */
const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'El nombre de usuario debe contener al menos 2 caracteres.',
    })
    .max(30, {
      message: 'El nombre de usuario debe contener como máximo 30 caracteres.',
    }),
  email: z
    .string({
      required_error: 'Por favor seleccione un email para mostrar.',
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: 'Por favor ingrese una URL válida.' }),
      })
    )
    .optional(),
});

// Valores por default que se utilizarán para inicializar el formulario.
// Deben venir de la db.
const defaultValues = {
  description: 'Especialista en tonificar los cojone',
  urls: [
    { value: 'https://instagram.com/leomessi' },
    { value: 'http://twitter.com/elonmusk' },
  ],
}

export function ProfileForm() {
  const { user } = useAuth({ middleware: 'auth' });

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

  function onSubmit(data) {
    toast({
      title: 'Ha enviado los siguentes datos:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
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
                Acerca de qué aspectos del entrenamiento te enfocas.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && 'sr-only')}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && 'sr-only')}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='mt-2'
            onClick={() => append({ value: '' })}
          >
            Add URL
          </Button>
        </div>
        <Button type='submit'>Actualizar perfil</Button>
      </form>
    </Form>
  )
}