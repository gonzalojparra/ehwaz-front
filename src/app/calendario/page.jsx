'use client'

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { createEventId } from './event-utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Container } from '@/components/ui/container';
import { DatePicker } from '@/components/ui/DatePicker';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

/* interface AppState {
  weekendsVisible: boolean
  currentEvents: EventApi[]
}; */

export default function Calendario() {
  const [open, setOpen] = useState(false);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [infoEvento, setInfoEvento] = useState({});
  const [ver, setVer] = useState('');
  const [calendarApi, setCalendarApi] = useState({});

  const crearEvento = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    setOpen(true);
    setCalendarApi(calendarApi);
    setFechaInicio(selectInfo.startStr);
    setFechaFin(selectInfo.endStr);
    setVer('guardar');
  };

  const crearRutina = () => {
    const nuevaRutina = calendarApi;
    nuevaRutina.addEvent({
      id: createEventId(),
      title: nombre,
      start: fechaInicio,
      end: fechaFin,
      allDay: true,
      extendedProps: {
        descripcion: descripcion,
        precio: precio,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin
      }
    });
    setOpen(false);
    setVer('')
    setInfoEvento({});
    setFechaInicio('');
    setFechaFin('');
    setNombre('');
    setDescripcion('');
    setPrecio('');
  }

  const verEvento = (selectInfo) => {
    setVer('ver');
    setInfoEvento(selectInfo.event);
    setNombre(selectInfo.event.title);
    setDescripcion(selectInfo.event.extendedProps.descripcion);
    setPrecio(selectInfo.event.extendedProps.precio);
    setFechaInicio(selectInfo.event.extendedProps.fecha_inicio);
    setFechaFin(selectInfo.event.extendedProps.fecha_fin);
    setOpen(true);
  }

  return (
    <div className='bg-background py-7'>
      <Container>
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
          ]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          select={crearEvento}
          eventClick={verEvento}
          themeSystem='Pulse'
        />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='flex justify-center mb-4'>Agregar Rutina</DialogTitle>
              <DialogDescription className='flex flex-1 flex-col gap-4'>
                <DatePicker fechaIni={fechaInicio} />
                <DatePicker />
                <Input
                  required
                  type='text'
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className='w-full'
                  placeholder='Nombre de rutina'
                  disabled={ver === 'ver'}
                />
                <Input
                  required
                  type='number'
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  className='w-full'
                  placeholder='Precio'
                  disabled={ver === 'ver'}
                />
                <Textarea placeholder='Añada una descripción' />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              {ver == 'guardar' &&
                <Button type='submit' onClick={crearRutina}>Crear Rutina</Button>
              }
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  )
}