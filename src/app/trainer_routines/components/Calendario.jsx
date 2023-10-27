'use client'

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import ModalEvento from "./ModalEvento";

export default function Calendario({ rutinas, alumnoId, obtener_rutinas }){
    const [eventos, setEventos] = useState(null);
    const [open, setOpen] = useState(false);

    const cargar_eventos = ()=>{
      let events = [];
      rutinas.map((rutina)=>{
        rutina.events.map((ev)=>{
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
              payment: rutina.payment
            }
          }
          events.push(eve);
        })
      })
      console.log(events);
      setEventos(events);
    }

    const verEvento = ()=>{
      setOpen(true);
    }

    const crearEvento = (selectInfo)=>{
      setOpen(true);
      console.log(selectInfo);
    }
    
    useEffect(()=>{
      cargar_eventos();
    }, []);

    return(
      <>
      {eventos != null && 
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
        />}
        <ModalEvento open={open} setOpen={setOpen}/>
      </>
    )
}