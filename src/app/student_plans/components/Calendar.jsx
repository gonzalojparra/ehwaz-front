import { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "@/lib/axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import InputError from "@/components/ui/InputError";
import SpinerCustom from "@/components/ui/spiner-custom";
import SimpleSpiner from "@/components/ui/simple-spiner";

export default function Calendar({ specialist_id }) {

/*   const fecha_de_hoy = new Date().toISOString().indexOf('T');
  const fecha_string = new Date().toISOString().substring(0, fecha_de_hoy); */
  const [open, setOpen] = useState(false);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [calendarApi, setCalendarApi] = useState({});
  const [planes, setPlanes] = useState(null);
  const [infoEvento, setInfoEvento] = useState({});
  const [errors, setErrors] = useState([]);
  const [planId, setPlanId] = useState("");
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [id_evento, setId_evento] = useState(null);
  const [payment, setPayment] = useState(null);


  const getPlanes = async () => {
    await axios
      .post("/api/specialist_plans", {
        specialist_id: specialist_id,
      })
      .then((response) => {
        setPlanes(
          response.data.data.map((event) => {
            console.log(event);
            return {
              id: event.id,
              title: event.name,
              start: event.initial_date,
              end: event.final_date,
              allDay: true,
              backgroundColor: event.color,
              borderColor: event.color,
              extendedProps: {
                specialist_plan_id: event.id,
                student_feedback: event.student_feedback,
                description: event.description,
                name: event.name,
                id_plan_status: event.id_routine_status,
                id_payment: event.id_payment,
                amount: event.amount,
                initial_date: event.initial_date,
                final_date: event.final_date,
                payment: event.payment
              },
            };
          })
        );
      });
  };

  useEffect(() => {
    getPlanes();
  }, [specialist_id]);

  const sendInfo = async () => {
    setSending(true);
    const res = await axios
      .post("/api/set_plan_feedback", {
        id_plan: planId,
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
    setPlanId(selectInfo.event.extendedProps.specialist_plan_id);
    setNombre(selectInfo.event.title);
    setPrecio(selectInfo.event.extendedProps.amount);
    setFechaInicio(selectInfo.event.extendedProps.initial_date);
    setFechaFin(selectInfo.event.extendedProps.final_date);
    setDescripcion(selectInfo.event.extendedProps.description);
    setFeedback(selectInfo.event.extendedProps.student_feedback);
    setPayment(selectInfo.event.extendedProps.payment);
    setOpen(true);
  };

  const sendFeedback = async () => {
    console.log("mandando...");
    if (await sendInfo()) {
      getPlanes();
      setOpen(false);
      setInfoEvento({});
      setFechaInicio("");
      setFechaFin("");
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setPlanId("");
      setFeedback("");
    }
  };

  return (
    <>
      {planes != null ? (
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
          select={false}
          eventClick={verEvento}
          themeSystem="Pulse"
          events={planes}
        />
      ) : (
        <SpinerCustom text={"Cargando Planes"} />
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center mb-4">
              Ver Evento
            </DialogTitle>
            {payment != null && payment.status == 'Aceptado' ? 
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
                Nombre de Plan:
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
                placeholder="Añada una descripción de su desempeño con el plan"
                value={feedback ? feedback : null}
                onChange={(e) => {
                  setFeedback(e.target.value);
                }}
              />
            </DialogDescription> : <DialogDescription className="flex flex-1 flex-col gap-4"> El plan se encuentra impago, no podrá ver el contenido del mismo hasta que se encuentre pagado y aceptado.</DialogDescription>}
          </DialogHeader>
          <DialogFooter>
            {payment != null && payment.status == 'Aceptado' ? 
            <Button type="submit" onClick={sendFeedback} disabled={sending}>
              Enviar Feedback {sending && <SimpleSpiner />}
            </Button> : <></>}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
