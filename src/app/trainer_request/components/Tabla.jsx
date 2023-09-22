import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Tabla({ data }) {
  return (
    <Table className="w-[800px]">
      <TableHeader>
        <TableRow>
          <TableHead>Nombre y Apellido</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Accion</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? data.map((element) => {
          <TableRow key={element.id}>
            <TableCell>{element.name + " " + element.last_name}</TableCell>
            <TableCell>{element.pivot.date}</TableCell>
            <TableCell>{element.pivot.status}</TableCell>
            <TableCell>Accion</TableCell>
          </TableRow>;
        }) : <TableRow>No hay datos</TableRow>}
      </TableBody>
    </Table>
  );
}
