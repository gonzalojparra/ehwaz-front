"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import ModalEvento from "./ModalEvento";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import InputError from "@/components/ui/InputError";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SimpleSpiner from "@/components/ui/simple-spiner";

export default function Calendario({ rutinas, alumnoId, obtener_rutinas }) {
  const [eventos, setEventos] = useState(null);
  const [open, setOpen] = useState(false);
  const [nuevo, setNuevo] = useState(false);
  const [data, setData] = useState(null);
  const [calendarApi, setCalendarApi] = useState({});

  //use state del modal
  const [date, setDate] = useState("");
  const [trainerRoutineId, setTrainerRoutineId] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const cargar_eventos = () => {
    let events = [];
    rutinas.map((rutina) => {
      rutina.events.map((ev) => {
        let eve = {
          id: ev.id,
          title: rutina.name,
          start: ev.date,
          end: ev.date,
          allDay: true,
          backgroundColor: rutina.color,
          borderColor: rutina.color,
          extendedProps: {
            trainer_routine_id: rutina.id,
            student_feedback: ev.student_feedback,
            description: ev.description,
            id_student_goal: rutina.id_student_goal,
            name_routine: rutina.name,
            event_date: ev.date,
            id_routine_status: rutina.id_routine_status,
            id_payment: rutina.id_payment,
            amount: rutina.amount,
            initial_date: rutina.initial_date,
            final_date: rutina.final_date,
            payment: rutina.payment,
          },
        };
        events.push(eve);
      });
    });
    console.log(events);
    setEventos(events);
  };

  const verEvento = (selectInfo) => {
    //console.log(selectInfo.event._def);
    setData(selectInfo.event._def);
    setDate(selectInfo.event._def.extendedProps.event_date);
    setTrainerRoutineId(selectInfo.event._def.extendedProps.trainer_routine_id);
    setDescripcion(selectInfo.event._def.extendedProps.description);
    setName(selectInfo.event._def.extendedProps.name_routine);
    setNuevo(false);
    setOpen(true);
  };

  const crearEvento = (selectInfo) => {
    setData(selectInfo);
    setDate(selectInfo.startStr);
    setTrainerRoutineId("");
    setDescripcion("");
    setNuevo(true);
    setOpen(true);
    //console.log(selectInfo);
  };

  const enviarEvento = async()=>{
    setLoading(true);
    await axios.post('/api/routine_event_store', {
      event_date: date,
      trainer_routine_id: trainer_routine_id,
      description: descripcion
    })
    .then((res)=>{
      obtener_rutinas(alumnoId); setOpen(false);
    })
    .catch((e)=>{
      setErrors(e.response.data.errors); 
    })
  }

  useEffect(() => {
    cargar_eventos();
  }, []);

  return (
    <>
      {eventos != null && (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth",
          }}
          locale={"es"}
          initialView="dayGridMonth"
          editable={false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          select={crearEvento}
          eventClick={verEvento}
          themeSystem="Pulse"
          events={eventos}
        />
      )}
      {/* <ModalEvento open={open} setOpen={setOpen} nuevo={nuevo} data={data} rutinas={rutinas} calendarApi={calendarApi}/> */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Evento</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="">
              <Label htmlFor="date" className="flex ml-1">
                Fecha
              </Label>
              <input
                id="date"
                type="date"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={true}
              />
              <InputError messages={errors?.date} />
            </div>
            <div className="">
              <Label htmlFor="rutina" className="flex ml-1">
                Rutina
              </Label>
              {/* {name == '' ? ( */}
                <Select
                  onValueChange={(e) => setTrainerRoutineId(e)}
                  defaultValue={trainerRoutineId}
                  disabled={!nuevo}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione una rutina" />
                  </SelectTrigger>
                  <SelectContent>
                    {rutinas.map((rut) => {
                      return (
                        <SelectItem key={rut.id} value={rut.id}>
                          {rut.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              <InputError messages={errors?.trainer_routine_id} />
            </div>
            <div className="">
              <Label htmlFor="descripcion" className="flex ml-1">
                Descripcion
              </Label>
              <Textarea
                id="descripcion"
                placeholder="Añada una descripción del evento"
                value={descripcion}
                onChange={(e) => {
                  setDescripcion(e.target.value);
                }}
                disabled={!nuevo}
              />
              <InputError messages={errors?.descripcion} />
            </div>
          </div>
          <DialogFooter>
            {nuevo && <Button type="button" onClick={enviarEvento} disabled={loading}>Crear Rutina {loading && <SimpleSpiner/>}</Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
