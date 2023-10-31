'use client'

import { useEffect, useState } from 'react';
import { Chart } from './components/Chart';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axios';
import SpinerCustom from '@/components/ui/spiner-custom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Metricas() {
  const pathname = usePathname();
  const router = useRouter();
  const [objetivos, setObjetivos] = useState(null);
  const [objetivoId, setObjetivoId] = useState();
  const [dataObj, setDataObj] = useState(null);

  const obtenerObjetivos = async () => {
    await axios.get('/api/get_student_goals').then((res) => {
      console.log(res.data.data);
      setObjetivos(res.data.data);
    });
  };

  const obtenerInfoObjetivo = async (e) => {
    await axios.get('/api/goal/' + e).then((res) => {
      setDataObj(res.data.data);
      console.log(res.data.data);
    });
  };

  useEffect(() => {
    if (pathname != '/login' && pathname != '/registro') {
      axios.post('/api/permissions', { url: pathname })
        .then((res) => {
          if (res.data.data == false) {
            router.push('/');
          } else {
            obtenerObjetivos();
          }
        });
    }
  }, []);

  return (
    <div className='bg-background py-7 flex flex-col justify-start items-center min-h-[84vh]'>
      <div className='md:w-[500px] sm:w-full pb-8'>
        {objetivos != null ? (
          <div>
            <Select
              onValueChange={(e) => {
                setObjetivoId(e);
                obtenerInfoObjetivo(e);
              }}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Seleccione uno de sus objetivos' />
              </SelectTrigger>
              <SelectContent>
                {objetivos.map((obj) => {
                  return (
                    <SelectItem key={obj.id} value={`${obj.id}`}>
                      {obj.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <SpinerCustom text={'Cargando objetivos...'} />
        )}
        {dataObj != null ? <Chart info={dataObj.events} /> : <></>}
      </div>
    </div>
  );
}
