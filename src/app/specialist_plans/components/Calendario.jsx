'use client'

import { useEffect, useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Calendario({ planes }) {
  const [eventos, setEventos] = useState(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  const cargar_eventos = () => {
    let events = [];
    planes.map((pl) => {
        let eve = {
          id: pl.id,
          title: pl.name,
          start: pl.initial_date,
          end: pl.nueva_fecha_final,
          allDay: true,
          backgroundColor: pl.color,
          borderColor: pl.color,
          extendedProps: {
            event_id: pl.id,
            feedback: pl.student_feedback,
            description: pl.description,
            id_plan_status: pl.id_plan_status,
            id_payment: pl.id_payment,
            amount: pl.amount,
            payment: pl.payment,
            initial_date: pl.initial_date,
            final_date: pl.final_date,
            branches: pl.specialist.branches[0].name
          },
        };
        events.push(eve);
    });
    setEventos(events);
  };

  const verEvento = (selectInfo) => {
    console.log(selectInfo.event);
    setData(selectInfo.event._def);
    setOpen(true);
  };

  useEffect(() => {
    cargar_eventos();
  }, []);

  return (
    <>
      {eventos != null && (
        <>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth'
          }}
          buttonText={{
            today: 'Hoy',
            dayGridMonth: 'Mes',
          }}
          locale={'es'}
          initialView='dayGridMonth'
          editable={false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          eventClick={verEvento}
          themeSystem='Pulse'
          events={eventos}
        />
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Plan</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className=''>
              <Label htmlFor='initial_date' className='flex ml-1'>
                Fecha Inicio
              </Label>
              <input
                id='initial_date'
                type='date'
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                value={data != null ? data.extendedProps.initial_date : ''}
                onChange={(e) => {}}
                disabled={true}
              />
            </div>
            <div className=''>
              <Label htmlFor='final_date' className='flex ml-1'>
                Fecha Final
              </Label>
              <input
                id='final_date'
                type='date'
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                value={data != null ? data.extendedProps.final_date : ''}
                onChange={(e) => {}}
                disabled={true}
              />
            </div>
            <div className=''>
              <Label htmlFor='descripcion' className='flex ml-1'>
                Descripcion
              </Label>
              <Textarea
                id='descripcion'
                value={data != null ? data.extendedProps.description : ''}
                onChange={(e) => {
                }}
                disabled={true}
              />
            </div>
            <div className=''>
              <Label htmlFor='branch' className='flex ml-1'>
                Branch
              </Label>
              <Textarea
                id='branch'
                value={data != null ? data.extendedProps.branches : ''}
                onChange={(e) => {
                }}
                disabled={true}
              />
            </div>
            <div className=''>
              <Label htmlFor='feedback' className='flex ml-1'>
                Feedback del Alumno
              </Label>
              <Textarea
                id='feedback'
                placeholder=''
                value={data != null ? data.extendedProps.feedback : ''}
                onChange={(e) => {
                }}
                disabled={true}
              />
            </div>
            <div className=''>
              <Label htmlFor='amount' className='flex ml-1'>
                Monto
              </Label>
              <input
                id='amount'
                type='number'
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                value={data != null ? data.extendedProps.amount : ''}
                onChange={(e) => {}}
                disabled={true}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
      </>)}
    </>
  );
}
