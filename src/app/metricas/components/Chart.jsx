'use client'

import { useEffect, useState } from 'react';

import { Card, DonutChart, Title } from '@tremor/react';

import axios from '@/lib/axios';

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

  const comosetecanteelculo = (data) => {
    let total = data.length;
    let porcentaje = parseFloat((100 / total).toFixed(2));
    setEventos(data.map((item) => {
      item.porcentaje = porcentaje;
      return item;
    }));
  }

  useEffect(() => {
    try {
      axios.post('/api/eventos_de_rutinas', {
        goal_id: goalId,
      })
        .then((res) => {
          //setEventos(res.data.data);
          comosetecanteelculo(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {eventos != null ? (
        <div>
          <Card className='mx-auto'>
            <Title>Eventos</Title>
            <DonutChart
              className='mt-6'
              data={eventos}
              category='porcentaje'
              index='description'
              colors={['rose', 'yellow', 'orange', 'indigo', 'blue', 'emerald']}
              onValueChange={(v) => setValue(v)}
            />
          </Card>
        </div>
      ) : (
        <></>
        )}
        {value !== null && (
          <div className='pt-4'>
            {JSON.stringify(value)}
          </div>
        )}
    </>
  );
};