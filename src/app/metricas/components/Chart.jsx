'use client'

import { useEffect, useState } from 'react';

import { Card, DonutChart, Title, LineChart } from '@tremor/react';

import axios from '@/lib/axios';
import { CustomCard } from './CustomCard';

export const Chart = ({ goalId }) => {
  /**
   * Estructura del objeto value
   * 
    {
      id,
      date,
      trainer_routine_id,
      student_feedback,
      description,
      routine: {
        id,
        id_student,
        id_trainer,
        id_student_goal,
        name,
        initial_date,
        final_date,
        description,
        id_payment,
        payment
      }
    }
   */
  const [value, setValue] = useState(null);
  const [eventos, setEventos] = useState(null);

  const validarEventos = (data) => {
    const total = data.length;
    const filteredData = data.filter((item) => new Date(item.date) < new Date());
    const filteredCount = filteredData.length;
    const porcentaje = filteredCount;
    if (porcentaje === 0) {
      setEventos(null);
    } else {
      setEventos(filteredData.map((item) => {
        item.porcentaje = 1;
        item.porcentajeTooltip = parseFloat(100 / filteredCount).toFixed(2);
        return item;
      }));
    }
  };

  const chartAbajo = (eventos) => {
    /* console.log(eventos);
    let noSonEventos = eventos.events;
    console.log(noSonEventos); */
    return eventos.map((item) => {
      let rta = {};
      let date = item.date;
      const [year, month, day] = date.split('-');
      if (item.student_feedback !== null) {
        rta = {
          date: (`${month}/${day}`),
          feedback: 1,
          student_feedback: item.student_feedback,
        };
      } else {
        rta = {
          date: (`${month}/${day}`),
          feedback: 0,
          student_feedback: item.student_feedback,
        };
      }
      return rta;
    });
  }

  useEffect(() => {
    try {
      axios.post('/api/eventos_de_rutinas', {
        goal_id: goalId,
      })
        .then((res) => {
          validarEventos(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const customTooltip = ({ payload, active }) => {
    if (!active || !payload) return null;
    return (
      <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
        {payload.map((category, idx) => (
          <div key={idx} className="flex flex-1 space-x-2.5">
            <div className={`w-1 flex flex-col bg-${category.color}-500 rounded`} />
            <div className="space-y-1">
              <p className="text-tremor-content">{category.dataKey}</p>
              <p className="font-medium text-tremor-content-emphasis">{category.value} feedback</p>
              <p className='text-tremor-content-emphasis font-bold'>{category.payload.student_feedback}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const customTooltipDonut = ({ payload, active }) => {
    if (!active || !payload) return null;
    const categoryPayload = payload?.[0];
    if (!categoryPayload) return null;
    return (
      <div className="w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
        <div className="flex flex-1 space-x-2.5">
          <div className={`w-1.5 flex flex-col bg-${categoryPayload?.color}-500 rounded`} />
          <div className="w-full">
            <div className="flex items-center justify-between space-x-8">
              <p className="text-right text-tremor-content whitespace-nowrap">
                {categoryPayload.name}
              </p>
              <p className="font-medium text-right whitespace-nowrap text-tremor-content-emphasis">
                {categoryPayload.payload.porcentajeTooltip}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const chartdata = [
    {
      date: "2023-10-01",
      feedback: 1,
      student_feedback: 'Hacer el dia 1 pa'
    },
    {
      date: "2023-10-02",
      feedback: 0,
      student_feedback: 'Hacer el dia 1 pa'
    },
    {
      date: "2023-10-03",
      feedback: 1,
      student_feedback: 'Hacer el dia 1 pa'
    },
  ];

  return (
    <>
      {eventos != null ? (
        <div className='flex flex-row gap-4'>
          <Card className='mx-auto'>
            <Title>Eventos</Title>
            <DonutChart
              className='mt-6'
              data={eventos}
              category='porcentaje'
              index='description'
              colors={['rose', 'yellow', 'orange', 'indigo', 'blue', 'emerald']}
              customTooltip={customTooltipDonut}
              onValueChange={(v) => setValue(v)}
            />
          </Card>
          <Card>
            <Title>Feedback de ejercicios</Title>
            <LineChart
              className="h-72 mt-4"
              data={chartAbajo(eventos)}
              index="date"
              categories={["feedback"]}
              colors={["blue"]}
              yAxisWidth={30}
              customTooltip={customTooltip}
            />
          </Card>
        </div>
      ) : (
        <div className='flex justify-center items-center'>
          <h1 className='text-2xl font-bold flex justify-center'>No hay ejercicios, decile a tu trainer que te meta ejercicios</h1>
        </div>
      )}
      {value !== null && (
        <div className='flex justify-center items-center pt-8'>
          <CustomCard className='max-w-md' rutina={value} />
        </div>
      )}
    </>
  );
};