"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TablaRutinas from "./TablaRutinas";

export default function Collapsable({ data, alumnoId, obtener_rutinas, goals, estados, setRutinas }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="tabla">
        <AccordionTrigger>Ver Rutinas</AccordionTrigger>
        <AccordionContent>
          <TablaRutinas data={data} setRutinas={setRutinas} alumnoId={alumnoId} obtener_rutinas={obtener_rutinas} goals={goals} estados={estados}/>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
