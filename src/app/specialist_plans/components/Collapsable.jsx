"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabla } from "./Tabla";

export default function Collapsable({ data, alumnoId, obtener_planes, estados, setPlanes }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="tabla">
        <AccordionTrigger>Ver Planes</AccordionTrigger>
        <AccordionContent>
          <Tabla data={data} setPlanes={setPlanes} obtener_planes={obtener_planes} alumnoId={alumnoId} estados={estados}/>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
