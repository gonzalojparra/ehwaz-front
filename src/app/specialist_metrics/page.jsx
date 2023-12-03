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
  const [plans, setPlans] = useState(null);
  const [objetivoId, setObjetivoId] = useState();
  const [dataObj, setDataObj] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);


  const obtenerPlanes = () => {
    setLoading(true);
    setValue(null);
    if (fechas != null) {
      axios.post('/api/get_specialist_plans', {
        'fecha_inicio': fechas.fecha_inicio,
        'fecha_fin': fechas.fecha_fin
      })
        .then((res) => {
          console.log(res.data.plans);
          setPlans(res.data);
          setLoading(false);
        });
    } else {
      axios.post('/api/get_specialist_plans')
        .then((res) => {
          console.log(res.data.plans);
          setPlans(res.data);
          setLoading(false)
        });
    }
  }

  useEffect(() => {
    if (pathname != '/login' && pathname != '/registro') {
      axios.post('/api/permissions', { url: pathname })
        .then((res) => {
          if (res.data.data == false) {
            router.push('/');
          } else {
            obtenerPlanes();
          }
        });
    }
  }, []);

  const [fechas, setFechas] = useState(null);

  return (
    <div className='bg-background py-4 flex flex-col justify-start items-center min-h-[84vh]'>
      <div className='w-full px-16'>
        {plans && (
          <Chart
            plans={plans.plans}
            fechas={fechas}
            setFechas={setFechas}
            obtenerPlanes={obtenerPlanes}
            loading={loading}
            value={value}
            setValue={setValue}
          />
        )}
      </div>
    </div>
  );
}
