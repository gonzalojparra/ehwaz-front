'use client'

import { useEffect, useState } from 'react';
import { format, parse } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function DatePicker({ fechaIni }) {
  const [date, setDate] = useState(fechaIni);
  console.log(date);
  const [parsedDate, setParsedDate] = useState();

  useEffect(() => {
    const sqlDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    //console.log(sqlDateRegex.test(data));
    if(date != undefined){
      if (sqlDateRegex.test(date)) {
        console.log(date);
        let parseada = parse(date, 'yyyy-MM-dd', new Date());
        parseada = format(parseada, 'PPP');
        setParsedDate(parseada);
      } else {
        console.log(date);
        let parseada = format(date, "PPP");
        setParsedDate(parseada);
      };
    }
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {parsedDate ? parsedDate : <span>Seleccione una fecha</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
