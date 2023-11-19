'use client'

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from '@/lib/axios';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/auth';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SocialsForm() {
  const [role, setRole] = useState([]);
  const { toast } = useToast();
  const { user } = useAuth({ middleware: 'auth' });
  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: '',
      whatsapp: '',
      telephone: '',
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
      .post('/api/set_socials_data', {
        facebook: data.facebook,
        instagram: data.instagram,
        twitter: data.twitter,
        linkedin: data.linkedin,
        whatsapp: data.whatsapp,
        telephone: data.telephone,
      })
      .then((res) => {
        toast({
          title: 'Datos actualizados',
          description: 'Se han actualizado los datos de sus redes sociales.',
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
          name='facebook'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facebook</FormLabel>
              <FormControl>
                <Input placeholder='facebook.com/leomessi' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='instagram'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram</FormLabel>
              <FormControl>
                <Input placeholder='instagram.com/leomessi' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='twitter'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter</FormLabel>
              <FormControl>
                <Input placeholder='twitter.com/leomessi' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='linkedin'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Linkedin</FormLabel>
              <FormControl>
                <Input placeholder='linkedin.com/in/leomessi' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='whatsapp'
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp</FormLabel>
              <FormControl>
                <Input placeholder='+54 299 XXXXXXX' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='telephone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input placeholder='+54 299 XXXXXXX' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Actualizar redes</Button>
      </form>
    </Form>
  );
}