'use client'

import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import SpinerCustom from '@/components/ui/spiner-custom';
import { useEffect } from 'react';

export default function SelectCustom({alumnos, setAlumnoId, alumnoId, obtener_planes}){

    const reObtener = async(e)=>{
        obtener_planes(e);
    }


    return (
        <div className='space-y-2'>
            {alumnos != null ? 
            <div>
                <Label htmlFor='estudiantes' className='flex ml-1'>
                    Estudiantes
                </Label>
          
                <Select onValueChange={
                    (e) => {setAlumnoId(e); reObtener(e);
                }}>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Seleccione un estudiante' />
                    </SelectTrigger>
                    <SelectContent>
                        {alumnos.map((student) => {
                            return (
                                <SelectItem key={student.id} value={`${student.id}`}>
                                    {student.name}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </div>
            : <SpinerCustom text={"Cargando alumnos..."}/>}
           
        </div>
    )
}