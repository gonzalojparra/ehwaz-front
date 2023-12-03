'use client'

import { useState } from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import SimpleSpiner from '@/components/ui/simple-spiner';

import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

import { addDays, format } from 'date-fns';
import es from 'date-fns/locale/es';

export function DatePicker({ className, fechas, setFechas, obtenerPlanes, loading }) {
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 0),
  });

  const options = { locale: es };

  const setearFechas = (e) => {
    if (e != null && e.from != null && e.to != null) {
      let inicio = new Date();
      inicio = format(e.from, 'Y-MM-dd', options);
      let fin = new Date();
      fin = format(e.to, 'Y-MM-dd', options);
      setFechas({
        'fecha_inicio': inicio,
        'fecha_fin': fin
      })
      console.log(inicio);
      console.log(fin);
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y', options)} -{' '}
                  {format(date.to, 'LLL dd, y', options)}
                </>
              ) : (
                format(date.from, 'LLL dd, y', options)
              )
            ) : (
              <span>Selecciona un rango de fechas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={(e) => { setDate(e); console.log(e); setearFechas(e) }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Button
        onClick={(e) => obtenerPlanes()}
        disabled={loading}
      >
        Buscar por fechas {loading && <SimpleSpiner />}
      </Button>
    </div>
  )
}
