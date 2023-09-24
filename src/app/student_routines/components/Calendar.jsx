import { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import axios from "@/lib/axios";
import { createEventId } from "../utils/event-utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import InputError from "@/components/ui/InputError";
import SpinerCustom from "@/components/ui/spiner-custom";
import SimpleSpiner from "@/components/ui/simple-spiner";

export default function CalendarComponent({ trainer }) {
  const [open, setOpen] = useState(false);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [nombre, setNombre] = useState("");
  const [studentGoals, setStudentGoals] = useState([]);
  const [studentGoalId, setStudentGoalId] = useState("");
  const [studentGoalName, setStudentGoalName] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [calendarApi, setCalendarApi] = useState({});
  const [rutinas, setRutinas] = useState(null);
  const [infoEvento, setInfoEvento] = useState({});
  const [errors, setErrors] = useState([]);
  const [rutinaId, setRutinaId] = useState("");
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [id_evento, setId_evento] = useState(null);

  const getRoutines = async () => {
    await axios
      .post("/api/trainer_routines", {
        trainer_id: trainer,
      })
      .then((response) => {
        setRutinas(
          response.data.data.map((event) => {
            console.log(event);
            return {
              id: event.id,
              title: event.routine.name,
              start: event.date,
              end: event.date,
              allDay: true,
              backgroundColor: event.routine.color,
              borderColor: event.routine.color,
              extendedProps: {
                trainer_routine_id: event.trainer_routine_id,
                student_feedback: event.student_feedback,
                description: event.description,
                id_student_goal: event.routine.id_student_goal,
                name_routine: event.routine.name,
                event_date: event.date,
                id_routine_status: event.routine.id_routine_status,
                id_payment: event.routine.id_payment,
                amount: event.routine.amount,
                initial_date: event.routine.initial_date,
                final_date: event.routine.final_date,
              },
            };
          })
        );
      });
  };

  const getStudentGoals = async () => {
    await axios.get(`/api/get_student_goals`).then((response) => {
      console.log(response.data.data);
      setStudentGoals(response.data.data);
    });
  };

  useEffect(() => {
    getRoutines();
    getStudentGoals();
  }, [trainer]);

  const sendInfo = async () => {
    setSending(true);
    const res = await axios
      .post("/api/set_feedback", {
        id_evento: id_evento,
        feedback: feedback,
      })
      .then((response) => {
        setErrors([]);
        setSending(false);
        return true;
      })
      .catch((e) => {
        console.log(e);
        setErrors(e.response.data.errors);
        setSending(false);
        return false;
      });
    return res;
  };

  const verEvento = (selectInfo) => {
    console.log(selectInfo.event);
    setInfoEvento(selectInfo.event);
    setId_evento(selectInfo.event.id);
    setRutinaId(selectInfo.event.extendedProps.rutina_id);
    setNombre(selectInfo.event.title);
    setPrecio(selectInfo.event.extendedProps.amount);
    setFechaInicio(selectInfo.event.extendedProps.initial_date);
    setFechaFin(selectInfo.event.extendedProps.final_date);
    setStudentGoalId(selectInfo.event.extendedProps.id_student_goal);
    setDescripcion(selectInfo.event.extendedProps.description);
    setFeedback(selectInfo.event.extendedProps.student_feedback);
    setStudentGoalName(() => {
      const studentGoal = studentGoals.find(
        (studentGoal) =>
          studentGoal.id === selectInfo.event.extendedProps.id_student_goal
      );
      return studentGoal.name;
    });
    setOpen(true);
  };

  const sendFeedback = async () => {
    console.log("mandando...");
    if (await sendInfo()) {
      getRoutines();
      setOpen(false);
      setInfoEvento({});
      setFechaInicio("");
      setFechaFin("");
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setRutinaId("");
      setStudentGoalId("");
      setFeedback("");
    }
  };

  return (
    <>
      {rutinas != null ? (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth",
          }}
          initialView="dayGridMonth"
          editable={false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          select={false}
          eventClick={verEvento}
          themeSystem="Pulse"
          events={rutinas}
        />
      ) : (
        <SpinerCustom text={"Cargando Rutinas"} />
      )}

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
                disabled={true}
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
                disabled={true}
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
                disabled={true}
              />

              <div className="space-y-2">
                <Label htmlFor="estudiantes" className="flex ml-1">
                  Objetivo del estudiante
                </Label>
                <Input disabled value={studentGoalName} />
              </div>

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
                disabled={true}
              />

              <Label htmlFor="descripcion" className="flex ml-1">
                Descripción:
              </Label>
              <Textarea
                id="descripcion"
                placeholder='Añada una descripción, puede añadir descripciones para diferentes días separandolos con "|"'
                value={descripcion ? descripcion : null}
                onChange={(e) => {
                  setDescripcion(e.target.value);
                }}
                disabled={true}
              />

              <Label htmlFor="feedback" className="flex ml-1">
                Feedback:
              </Label>
              <Textarea
                id="feedback"
                placeholder="Añada una descripción de su desempeño con la rutina"
                value={feedback ? feedback : null}
                onChange={(e) => {
                  setFeedback(e.target.value);
                }}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" onClick={sendFeedback} disabled={sending}>
              Enviar Feedback {sending && <SimpleSpiner />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
