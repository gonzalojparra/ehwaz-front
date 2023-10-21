import { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import axios from "@/lib/axios";
import { createEventId } from "../utils/event-utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
import MultipleDescription from "./MultipleDescription";

export default function CalendarComponent({ student }) {
  const [open, setOpen] = useState(false);
  const [ver, setVer] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [nombre, setNombre] = useState("");
  const [studentGoals, setStudentGoals] = useState([]);
  const [studentGoalId, setStudentGoalId] = useState("");
  const [studentGoalName, setStudentGoalName] = useState("");
  const [descripcion, setDescripcion] = useState([]);
  const [precio, setPrecio] = useState("");
  const [calendarApi, setCalendarApi] = useState({});
  const [rutinas, setRutinas] = useState(null);
  const [infoEvento, setInfoEvento] = useState({});
  const [errors, setErrors] = useState([]);
  const [rutinaId, setRutinaId] = useState("");
  const [sending, setSending] = useState(false);
  const [color, setColor] = useState("");
  const [descrip, setDescrip] = useState(null);

  const set_descriptions = () => {
    //console.log(document.getElementsByName('description'));
    let descripciones = [];
    let inputs = document.getElementsByName("description_asd");
    console.log(inputs);
    if (inputs.length > 0) {
      inputs.forEach((input) => {
        descripciones.push(input.value);
      });
    }
    console.log(descripciones);
    return descripciones;
  };

  const getRoutines = async () => {
    await axios
      .post("/api/student_routines", {
        student_id: student,
      })
      .then((response) => {
        setRutinas(
          response.data.data.map((event) => {
            console.log(event);

            let fecha_fin = new Date(event.final_date);
            fecha_fin = fecha_fin.setDate(fecha_fin.getDate() + 2);
            console.log("fecha_fin: " + fecha_fin);
            let nueva_fecha_fin = new Date(fecha_fin);
            nueva_fecha_fin = `${nueva_fecha_fin.getFullYear()}-${String(
              nueva_fecha_fin.getMonth() + 1
            ).padStart(2, "0")}-${String(nueva_fecha_fin.getDate()).padStart(
              2,
              "0"
            )}`;
            fecha_fin = nueva_fecha_fin;

            console.log(nueva_fecha_fin);
            return {
              id: event.id,
              title: event.name,
              start: event.initial_date,
              end: nueva_fecha_fin,
              allDay: true,
              backgroundColor: event.color,
              borderColor: event.color,
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
                rutina_id: event.id,
                description: event.description,
              },
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
  };

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
    setVer("guardar");
    setDescripcion([]);
    setPrecio('');
  };

  const sendInfo = async () => {
    setSending(true);
    const res = await axios
      .post("/api/trainerroutinest", {
        initial_date: fechaInicio,
        final_date: fechaFin,
        name: nombre,
        descriptions: set_descriptions(),
        id_student: student,
        id_student_goal: studentGoalId,
        amount: precio,
        color: color,
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

  const createRoutine = async () => {
    set_descriptions();
    // Validar la creación
    if (await sendInfo()) {
      const nuevaRutina = calendarApi;
      getRoutines();
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
    console.log(selectInfo.event);
    setVer("ver");
    setInfoEvento(selectInfo.event);
    setRutinaId(selectInfo.event.extendedProps.rutina_id);
    setNombre(selectInfo.event.title);
    setDescripcion(selectInfo.event.extendedProps.descripcion);
    setPrecio(selectInfo.event.extendedProps.precio);
    setFechaInicio(selectInfo.event.extendedProps.fecha_inicio);
    setFechaFin(selectInfo.event.extendedProps.fecha_fin);
    setStudentGoalId(selectInfo.event.extendedProps.id_student_goal);
    setDescripcion(selectInfo.event.extendedProps.description);
    setColor(selectInfo.event.backgroundColor);
    setStudentGoalName(() => {
      const studentGoal = studentGoals.find(
        (studentGoal) =>
          studentGoal.id === selectInfo.event.extendedProps.id_student_goal
      );
      return studentGoal.name;
    });
    setOpen(true);
  };

  const deleteRoutine = async () => {
    setSending(true);
    const res = await axios
      .post("/api/trainerroutinedl", {
        rutina_id: rutinaId,
      })
      .then((response) => {
        setErrors([]);
        setOpen(false);
        setVer("");
        setInfoEvento({});
        setFechaInicio("");
        setFechaFin("");
        setNombre("");
        setDescripcion("");
        setPrecio("");
        getRoutines();
      })
      .catch((e) => {
        console.log(e);
        setErrors(e.response.data.errors);
      });
    setSending(false);
  };

  return (
    <div className="w-full">
      {rutinas != null ? (
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
          select={createEvent}
          eventClick={verEvento}
          themeSystem="Pulse"
          events={rutinas}
        />
      ) : (
        <SpinerCustom text={"Cargando Rutinas"} />
      )}
      <Dialog open={open} onOpenChange={setOpen} className="max-w-[1500px]">
        <DialogContent className="md:max-w-[1200px] lg:max-w-[1200px]">
          <DialogHeader>
            <DialogTitle className="flex justify-center mb-4">
              {ver === "ver" ? "Ver Rutina" : "Agregar Rutina"}
            </DialogTitle>
            <DialogDescription className="flex flex-2 flex-col gap-4">
              <div className="flex flex-row gap-2">
                <div className="w-full">
                  {/*Voy a poner el componente en el calendar para poder obtener la fecha seleccionada */}
                  <Label htmlFor="color" className="flex ml-1">
                    Color:
                  </Label>
                  <input
                    id="color"
                    type="color"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    disabled={ver === "ver"}
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="fechaInicio" className="flex ml-1">
                    Fecha Inicio:
                  </Label>
                  <input
                    id="fechaInicio"
                    type="date"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                    disabled={ver === "ver"}
                  />
                  <InputError messages={errors?.initial_date} />
                </div>
                <div className="w-full">
                  <Label htmlFor="fechaFin" className="flex ml-1">
                    Fecha Fin:
                  </Label>
                  <input
                    id="fechaFin"
                    type="date"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                    disabled={ver === "ver"}
                  />
                  <InputError messages={errors?.final_date} />
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="w-full">
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
                  <InputError messages={errors?.name} />
                </div>

                <div className="w-full">
                  <Label htmlFor="estudiantes" className="flex ml-1">
                    Objetivo del estudiante
                  </Label>
                  {ver === "ver" ? (
                    <Input disabled value={studentGoalName} />
                  ) : (
                    <Select onValueChange={(e) => setStudentGoalId(e)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione un objetivo" />
                      </SelectTrigger>
                      <SelectContent>
                        {studentGoals.map((studentGoal) => {
                          return (
                            <SelectItem
                              key={studentGoal.id}
                              value={studentGoal.id}
                            >
                              {studentGoal.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  )}
                  <InputError messages={errors?.id_student_goal} />
                </div>
                <div className="w-full">
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
                  <InputError messages={errors?.amount} />
                </div>
              </div>

              {/* <Label htmlFor="descripcion" className="flex ml-1">
                Descripción:
              </Label> */}
              {/* <Textarea
                id="descripcion"
                placeholder='Añada una descripción, puede añadir descripciones para diferentes días separandolos con "|"'
                value={descripcion ? descripcion : null}
                onChange={(e) => {
                  setDescripcion(e.target.value);
                }}
                disabled={ver === "ver"}
              />
              <InputError messages={errors?.description} /> */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Descripciones</AccordionTrigger>
                  <AccordionContent>
                    <MultipleDescription
                      fecha_inicio={fechaInicio}
                      fecha_fin={fechaFin}
                      classes={"flex flex-1 flex-col gap-4"}
                      descrip={descripcion}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {ver == "guardar" ? (
              <Button type="submit" onClick={createRoutine} disabled={sending}>
                Crear Rutina {sending && <SimpleSpiner />}
              </Button>
            ) : (
              <Button
                variant="destructive"
                type="submit"
                onClick={deleteRoutine}
                disabled={sending}
              >
                Borrar Rutina {sending && <SimpleSpiner />}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
