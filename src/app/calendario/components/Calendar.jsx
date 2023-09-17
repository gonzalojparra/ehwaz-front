import { useEffect, useState } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import axios from '@/lib/axios';
import { createEventId } from '../utils/event-utils';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import InputError from '@/components/ui/InputError';

export default function CalendarComponent({ student }) {
  const [open, setOpen] = useState(false);
  const [ver, setVer] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [nombre, setNombre] = useState('');
  const [studentGoals, setStudentGoals] = useState([]);
  const [studentGoalId, setStudentGoalId] = useState('');
  const [studentGoalName, setStudentGoalName] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [calendarApi, setCalendarApi] = useState({});
  const [rutinas, setRutinas] = useState([]);
  const [infoEvento, setInfoEvento] = useState({});
  const [errors, setErrors] = useState([]);

  const getRoutines = async () => {
    await axios.post('/api/student_routines', {
      student_id: student
    })
      .then((response) => {
        setRutinas(
          response.data.data.map((event) => {
            console.log(event)
            return {
              id: event.id,
              title: event.name,
              start: event.initial_date,
              end: event.final_date,
              extendedProps: {
                descripcion: event.descriptions,
                precio: event.amount,
                fecha_inicio: event.initial_date,
                fecha_fin: event.final_date,
                name: event.name,
                id_payment: event.id_payment,
                id_student: event.id_student,
                id_student_goal: event.id_student_goal,
                id_trainer: event.id_trainer,
              }
            };
          })
        );
      });
  };

  const getStudentGoals = async () => {
    await axios
      .post(`/api/student_goals`, {
        student_id: student,
      })
      .then((response) => {
        console.log(response.data.data);
        setStudentGoals(response.data.data);
      });
  }

  useEffect(() => {
    getRoutines();
    getStudentGoals();
  }, [student]);

  const createEvent = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    setOpen(true);
    setErrors([]);
    setCalendarApi(calendarApi);
    setFechaInicio(selectInfo.startStr);
    setFechaFin(selectInfo.startStr);
    setVer('guardar');
  };

  const sendInfo = async () => {
    const res = await axios
      .post('/api/trainerroutinest', {
        initial_date: fechaInicio,
        final_date: fechaFin,
        name: nombre,
        descriptions: [descripcion],
        id_student: student,
        id_student_goal: studentGoalId,
        amount: precio,
      })
      .then((response) => {
        setErrors([]);
        return true;
      })
      .catch((e) => {
        console.log(e);
        setErrors(e.response.data.errors);
        return false;
      });
    return res;
  };

  const createRoutine = async () => {
    // Validar la creación
    if (await sendInfo()) {
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
          fecha_fin: fechaFin,
          id_student_goal: studentGoalId,
        },
      });
      setOpen(false);
      setVer('');
      setInfoEvento({});
      setFechaInicio('');
      setFechaFin('');
      setNombre('');
      setDescripcion('');
      setPrecio('');
    } else {
      console.log('no paso');
    }
  };

  const verEvento = (selectInfo) => {
    setVer('ver');
    setInfoEvento(selectInfo.event);
    setNombre(selectInfo.event.title);
    setDescripcion(selectInfo.event.extendedProps.descripcion);
    setPrecio(selectInfo.event.extendedProps.precio);
    setFechaInicio(selectInfo.event.extendedProps.fecha_inicio);
    setFechaFin(selectInfo.event.extendedProps.fecha_fin);
    setStudentGoalId(selectInfo.event.extendedProps.id_student_goal);
    setStudentGoalName(() => {
      const studentGoal = studentGoals.find((studentGoal) => studentGoal.id === selectInfo.event.extendedProps.id_student_goal);
      return studentGoal.name;
    });
    setOpen(true);
  };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        select={createEvent}
        eventClick={verEvento}
        themeSystem="Pulse"
        events={rutinas}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='flex justify-center mb-4'>
              Agregar Rutina
            </DialogTitle>
            <DialogDescription className='flex flex-1 flex-col gap-4'>
              {/*Voy a poner el componente en el calendar para poder obtener la fecha seleccionada */}
              <Label htmlFor='fechaInicio' className='flex ml-1'>
                Fecha Inicio:
              </Label>
              <input
                id='fechaInicio'
                type='date'
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                disabled={ver === 'ver'}
              />
              <InputError messages={errors.initial_date} />

              <Label htmlFor='fechaFin' className='flex ml-1'>
                Fecha Fin:
              </Label>
              <input
                id='fechaFin'
                type='date'
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                disabled={ver === 'ver'}
              />
              <InputError messages={errors.final_date} />

              <Label htmlFor='nombre' className='flex ml-1'>
                Nombre de Rutina:
              </Label>
              <Input
                required
                id='nombre'
                type='text'
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className='w-full'
                placeholder='Bajar de peso...'
                disabled={ver === 'ver'}
              />
              <InputError messages={errors.name} />

              <div className='space-y-2'>
                <Label htmlFor='estudiantes' className='flex ml-1'>
                  Objetivo del estudiante
                </Label>
                {ver === 'ver' ? <Input disabled value={studentGoalName} /> :
                <Select
                  onValueChange={
                    (e) => setStudentGoalId(e)
                  }
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Seleccione un objetivo' />
                  </SelectTrigger>
                  <SelectContent>
                    {studentGoals.map((studentGoal) => {
                      return (
                        <SelectItem key={studentGoal.id} value={studentGoal.id}>
                          {studentGoal.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                }
              </div>
              <InputError messages={errors.id_student_goal} />

              <Label htmlFor='precio' className='flex ml-1'>
                Precio:
              </Label>
              <Input
                required
                id='precio'
                type='number'
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className='w-full'
                placeholder='$ xxxx'
                disabled={ver === 'ver'}
              />
              <InputError messages={errors.amount} />

              <Label htmlFor='descripcion' className='flex ml-1' >
                Descripción:
              </Label>
              <Textarea
                id='descripcion'
                placeholder='Añada una descripción'
                onChange={(e) => {
                  setDescripcion(e.target.value);
                }}
                disabled={ver === 'ver'}
              />
              <InputError messages={errors.description} />

            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {ver == 'guardar' && (
              <Button type='submit' onClick={createRoutine}>
                Crear Rutina
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}