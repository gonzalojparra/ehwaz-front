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


  const obtenerPlanes = () => {
    axios.post('/api/get_specialist_plans')
      .then((res) => {
        console.log(res.data.plans);
        setPlans(res.data);
      });
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

  return (
    <div className='bg-background py-4 flex flex-col justify-start items-center min-h-[84vh]'>
      <div className='md:w-[500px] sm:w-full'>
          
      </div>
      <div className='w-full px-16'>
        { plans && (
          <Chart plans={plans.plans} />
        )
        }
      </div>
    </div>
  );
}
