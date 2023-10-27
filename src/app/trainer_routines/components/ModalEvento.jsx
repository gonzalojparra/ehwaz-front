"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import SimpleSpiner from "@/components/ui/simple-spiner";
import axios from "@/lib/axios";

export default function ModalEvento({ open, setOpen, nuevo, data, rutinas, calendarApi }) {
  const [date, setDate] = useState('');
  const [trainerRoutineId, setTrainerRoutineId] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');

  console.log(calendarApi);

  const actualizar = (data, nuevo)=>{
    setDate('');
    setTrainerRoutineId('');
    setDescripcion('');
    setName('');
    if(data != null){
      if(nuevo){
        setDate(data.startStr);
        console.log(data.startStr);
        setTrainerRoutineId('');
        setDescripcion('');
      }else{
        setDate(data.extendedProps.event_date);
        setTrainerRoutineId(data.extendedProps.trainer_routine_id);
        setDescripcion(data.extendedProps.description);
        setName(data.extendedProps.name_routine);
      }
    }
  }

  useEffect((data, nuevo)=>{
    actualizar(data, nuevo);
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Evento</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <Label htmlFor="date" className="flex ml-1">
              Fecha
            </Label>
            <input
              id="date"
              type="date"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={true}
            />
            <InputError messages={errors?.date} />
          </div>
          <div className="">
            <Label htmlFor="rutina" className="flex ml-1">
              Rutina
            </Label>
            {nuevo ?
            <Select onValueChange={(e) => setTrainerRoutineId(e)} defaultValue={trainerRoutineId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione una rutina" />
              </SelectTrigger>
              <SelectContent>
                {rutinas.map((rut) => {
                  return (
                    <SelectItem key={rut.id} value={rut.id}>
                      {rut.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
             : 
             <input
              id="rutina"
              type="text"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={true}
            />
             }
            <InputError messages={errors?.trainer_routine_id} />
          </div>
          <div className="">
            <Label htmlFor="descripcion" className="flex ml-1">
              Descripcion
            </Label>
            <Textarea
                id="descripcion"
                placeholder="Añada una descripción del evento"
                value={descripcion}
                onChange={(e) => {
                  setDescripcion(e.target.value);
                }}
                disabled={!nuevo}
            />
            <InputError messages={errors?.descripcion} />
          </div>
        </div>
        <DialogFooter>
          {nuevo && <Button type="button">Crear Rutina</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
