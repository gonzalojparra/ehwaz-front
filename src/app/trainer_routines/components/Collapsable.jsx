"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TablaRutinas from "./TablaRutinas";

export default function Collapsable({ data, alumnoId, obtener_rutinas }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="tabla">
        <AccordionTrigger>Ver Rutinas</AccordionTrigger>
        <AccordionContent>
          <TablaRutinas data={data} alumnoId={alumnoId} obtener_rutinas={obtener_rutinas}/>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
