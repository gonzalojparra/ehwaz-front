"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Modal } from "./Modal";

function color_boton(status) {
  let string = "";
  switch (status) {
    case "Ingresado":
      string = "mt-3 primary";
      break;

    case "Aceptado":
      string = "mt-3 secondary";
      break;

    case "Cancelado":
      string = "mt-3 destructive";
      break;

    default:
      break;
  }
  return string;
}

const estados = [{id:1,label:"Iniciado"}, {id:2,label:"Aceptado"}, {id:3, label:"Cancelado"}];

/*const obtener_obj_estado = (estado)=>{

} */

export function Tabla({ data, obtenerPagos }) {
  return (
    <div className="flex justify-center flex-col">
      <Label className="text-center pb-3">Listado de Pagos</Label>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Rutina</TableHead>
            <TableHead className="text-center">Tipo de Pago</TableHead>
            <TableHead className="text-center">Monto</TableHead>
            <TableHead className="text-center">
             Alumno
            </TableHead>
            <TableHead className="text-center">Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((payment) => (
            <TableRow key={payment.payment_identificator}>
              <TableCell className="text-center">
                {payment.name}
              </TableCell>
              <TableCell className="text-center">
                {payment.payment.payment_type}
              </TableCell>
              <TableCell className="text-center">{payment.amount}</TableCell>
              <TableCell className="text-center">
                {payment.student.name + ' ' + payment.student.name}
              </TableCell>
              <TableCell className="text-center">
                
                  <Modal payment_id={payment.payment.id} estado={payment.payment.status} obtenerPagos={obtenerPagos} />
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
