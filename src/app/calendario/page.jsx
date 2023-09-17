"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { createEventId } from "./event-utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import axios from "@/lib/axios";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* interface AppState {
  weekendsVisible: boolean
  currentEvents: EventApi[]
}; */

export default function Calendario() {
  const [open, setOpen] = useState(false);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [infoEvento, setInfoEvento] = useState({});
  const [ver, setVer] = useState("");
  const [calendarApi, setCalendarApi] = useState({});

  const [students, setStudents] = useState([]);
  const [student_id, setStudent_id] = useState("");
  const [rutinas, setRutinas] = useState([{'id':1,'title':'asd', 'start':'2023-09-19', 'end':'2023-09-21'}]);

  const [recargarEventos, setRecargarEventos] = useState(false);

  const traer_estudiantes = async ()=>{
    await axios.get('/api/trainer_students/1').then((response)=>{setStudents(response.data)});
  }

  useEffect(()=>{
    traer_estudiantes();
  }, [])

  const traer_rutinas = async()=>{
    await axios.post('/api/student_routines', {
      student_id: student_id
    }).then((response)=>console.log(response)).then((response)=>{calendarApi.refetchEvents();setRecargarEventos(true)});
  }

  useEffect(()=>{
    traer_rutinas();
  }, [student_id])

  const cargarEventos = ()=>{
    let array = [];
    array = rutinas.map(event=>{
      return {
        'id':event.id,
        'title': event.name,
        'start': event.initial_date,
        'end': event.final_date
      }
    })
    setRecargarEventos(false)
    return array;
  }



  const crearEvento = (selectInfo) => {
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    setOpen(true);
    setCalendarApi(calendarApi);
    setFechaInicio(selectInfo.startStr);
    setFechaFin(selectInfo.startStr);
    setVer("guardar");
  };

  const enviarInfo = async () => {
    const res = await axios
      .post("/api/trainerroutinest", {
        initial_date: fechaInicio,
        final_date: fechaFin,
        name: nombre,
        descriptions: [descripcion],
        id_student: 1,
        id_student_goal: 1,
        amount: precio,
      })
      .then((response) => {
        return true;
      })
      .catch((e) => {
        console.log(e);
        return false;
      });
    return res;
  };

  const crearRutina = async () => {
    //validar la creación
    if (await enviarInfo()) {
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
        },
      });
      setOpen(false);
      setVer("");
      setInfoEvento({});
      setFechaInicio("");
      setFechaFin("");
      setNombre("");
      setDescripcion("");
      setPrecio("");
    } else {
      console.log("no paso");
    }
  };

  const verEvento = (selectInfo) => {
    setVer("ver");
    setInfoEvento(selectInfo.event);
    setNombre(selectInfo.event.title);
    setDescripcion(selectInfo.event.extendedProps.descripcion);
    setPrecio(selectInfo.event.extendedProps.precio);
    setFechaInicio(selectInfo.event.extendedProps.fecha_inicio);
    setFechaFin(selectInfo.event.extendedProps.fecha_fin);
    setOpen(true);
  };

  return (
    <div className="bg-background py-7 flex flex-col justify-center items-center">
      <div className="w-[500px] pb-8">
        <div className="space-y-2">
          <Label htmlFor="estudiantes" className="flex ml-1">
            Estudiantes
          </Label>
          <Select onValueChange={(e) => {setStudent_id(e); console.log(e)}}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione un estudiante" />
            </SelectTrigger>
            <SelectContent>
              {students.map((student) => {
                return (
                  <SelectItem key={student.id} value={`${student.id}`}>
                    {student.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Container>
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
          select={crearEvento}
          eventClick={verEvento}
          themeSystem="Pulse"
          events={cargarEventos}
          reloadEvents={recargarEventos}
        />

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex justify-center mb-4">
                Agregar Rutina
              </DialogTitle>
              <DialogDescription className="flex flex-1 flex-col gap-4">
                {/*Voy a poner el componente en el calendar para poder obtener la fecha seleccionada */}
                <Label htmlFor="fechaInicio" className="flex ml-1">
                  Fecha Inicio:
                </Label>
                <input
                  id="fechaInicio"
                  type="date"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                />
                <Label htmlFor="fechaFin" className="flex ml-1">
                  Fecha Fin:
                </Label>
                <input
                  id="fechaFin"
                  type="date"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                />
                <Label htmlFor="nombre" className="flex ml-1">
                  Nombre de Rutina:
                </Label>
                <Input
                  required
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full"
                  placeholder="Bajar de peso..."
                  disabled={ver === "ver"}
                />
                <Label htmlFor="precio" className="flex ml-1">
                  Precio:
                </Label>
                <Input
                  required
                  id="precio"
                  type="number"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  className="w-full"
                  placeholder="$ xxxx"
                  disabled={ver === "ver"}
                />
                <Label htmlFor="descripcion" className="flex ml-1">
                  Descripción:
                </Label>
                <Textarea
                  id="descripcion"
                  placeholder="Añada una descripción"
                  onChange={(e) => {
                    setDescripcion(e.target.value);
                  }}
                />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              {ver == "guardar" && (
                <Button type="submit" onClick={crearRutina}>
                  Crear Rutina
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
}
