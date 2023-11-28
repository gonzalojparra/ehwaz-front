'use client'

import { useEffect, useState } from 'react';

import {
  Card,
  DonutChart,
  Title,
  BarList,
  Bold,
  Flex,
  Text
} from '@tremor/react';

import { CustomCard } from './CustomCard';

export const Chart = ({ plans }) => {
  /**
   * Estructura del objeto plans
   * 
    {
      plan: {
        0: {
          amount,
          color,
          description,
          initial_date
          final_date,
          id,
          id_payment,
          id_plan_status,
          name,
          specialist_id,
          student_feedback,
          student_id
        }
      }
      totalAmount,
      totalAmountWithPayment,
    }
   */
  const [value, setValue] = useState(null);
  const [planes, setPlanes] = useState(null);
  const [planesReforged, setPlanesReforged] = useState(null);

  const validarPlanes = (plans) => {
    const total = plans.length;
    if (total === 0) {
      setPlanes(null);
    } else {
      setPlanes(plans.map((item) => {
        item.porcentaje = 1;
        item.porcentajeTooltip = parseFloat(100 / total).toFixed(2);
        return item;
      }));
    }
  };

  const chartAbajo = (plans) => {
    /* console.log(eventos);
    let noSonEventos = eventos.events;
    console.log(noSonEventos); */
    return plans.map((item) => {
      let rta = {};
      let date = item.initial_date;
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

  // name -> tiene que ser por ejemplo 'total de plata' y 'total pagados'
  // value -> tiene que ser el valor de la plata
  const reforjarPlanes = (plans) => {
    let totalAmount = 0;
    let totalAmountWithPayment = 0;
    let totalAmountWithoutPayment = 0;

    totalAmount = plans.reduce((acc, item) => {
      acc += parseFloat(item.amount);
      return acc;
    }, 0);
    totalAmountWithPayment = plans.reduce((acc, item) => {
      if (item.id_payment !== null) {
        acc += parseFloat(item.amount);
      }
      return acc;
    }, 0);

    totalAmountWithoutPayment = totalAmount - totalAmountWithPayment || 0;
    const totalAmountWithoutPaymentPorcentaje = parseFloat(totalAmountWithoutPayment * 100 / totalAmount).toFixed(2);
    const totalAmountWithPaymentPorcentaje = parseFloat(totalAmountWithPayment * 100 / totalAmount).toFixed(2);
    const totalAmountPorcentaje = parseFloat(totalAmount * 100 / totalAmount).toFixed(2);

    const planesReforged = [
      {
        name: 'Total de dinero',
        value: totalAmount.toFixed(2),
        porcentaje: totalAmountPorcentaje,
        porcentajeTooltip: totalAmountPorcentaje,
      },
      {
        name: 'Total pagados',
        value: totalAmountWithPayment.toFixed(2),
        porcentaje: totalAmountWithPaymentPorcentaje,
        porcentajeTooltip: totalAmountWithPaymentPorcentaje,
      },
      {
        name: 'Total sin pagar',
        value: totalAmountWithoutPayment.toFixed(2),
        porcentaje: totalAmountWithoutPaymentPorcentaje,
        porcentajeTooltip: totalAmountWithoutPaymentPorcentaje,
      },
    ];
    setPlanesReforged(planesReforged);
  }

  useEffect(() => {
    validarPlanes(plans);
    reforjarPlanes(plans);
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
      {plans != null ? (
        <div className='flex flex-row gap-4'>
          <Card className='mx-auto'>
            <Title>Planes</Title>
            <DonutChart
              className='mt-6'
              data={plans}
              category='porcentaje'
              index='description'
              colors={['rose', 'yellow', 'orange', 'indigo', 'blue', 'emerald']}
              customTooltip={customTooltipDonut}
              onValueChange={(v) => setValue(v)}
            />
          </Card>
          <Card>
            <Title>Dinero obtenido</Title>
            <Flex className="mt-4">
              <Text>
                <Bold>Motivo</Bold>
              </Text>
              <Text>
                <Bold>Dinero</Bold>
              </Text>
            </Flex>
            {planesReforged && (
              <BarList showAnimation={true} data={planesReforged} className="mt-2" />
            )}
          </Card>
        </div>
      ) : (
        <div className='flex justify-center items-center'>
          <h1 className='text-2xl font-bold flex justify-center'>No hay planes!</h1>
        </div>
      )}
      {value !== null && (
        <div className='flex justify-center items-center pt-8'>
          <CustomCard className='max-w-md' plan={value} />
        </div>
      )}
    </>
  );
};