'use client'

import { useEffect, useState } from 'react';

import {
  Card,
  DonutChart,
  Title,
  BarList,
  Bold,
  Flex,
  Text,
  BarChart,
  Subtitle
} from '@tremor/react';

import { CustomCard } from './CustomCard';
import { DatePicker } from './DatePicker';

export const Chart = ({
  plans,
  fechas,
  setFechas,
  obtenerPlanes,
  loading,
  value,
  setValue
}) => {
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
  
  const [planes, setPlanes] = useState(null);
  const [planesReforged, setPlanesReforged] = useState(null);
  const [second, setSecond] = useState(null);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (value !== null) {
      setShowCard(true);
    }
  }, [value]);

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

  const valueFormatter = (number) => `$ ${new Intl.NumberFormat('es').format(number).toString()}`;

  useEffect(() => {
    validarPlanes(plans);
    reforjarPlanes(plans);
    segundoChart(plans);
  }, []);

  useEffect(() => {
    validarPlanes(plans);
    reforjarPlanes(plans);
    segundoChart(plans);
  }, [obtenerPlanes]);

  const customTooltip = ({ payload, active }) => {
    if (!active || !payload) return null;
    
    return (
      <div className='w-56 rounded-tremor-default text-tremor-default bg-dark-tremor-background-emphasis p-2 shadow-tremor-dropdown border border-tremor-border'>
        {payload.map((item, idx) => (
          <div key={idx} className='flex flex-1 space-x-2.5'>
            <div className={`w-1 flex flex-col bg-blue-400 rounded`} />
            <div className='space-y-1'>
              <p className='text-tremor-content'>{item.payload.name}</p>
              <p className='font-medium text-tremor-content-emphasis'>{item.payload.label}</p>
              <p className='text-tremor-content-emphasis font-bold'>${item.payload.Monto}</p>
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
      <div className='w-80 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border'>
        <div className='flex flex-1 space-x-3'>
          <div className={`w-2 flex flex-col bg-${categoryPayload?.color}-500 rounded`} />
          <div className='w-full'>
            <div className='flex items-center justify-between space-x-8'>
              <p className='text-right text-tremor-content'>
                {categoryPayload.name}
              </p>
              <p className='font-medium text-right whitespace-nowrap text-tremor-content-emphasis'>
                {categoryPayload.payload.porcentajeTooltip}%
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const segundoChart = (plans) => {
    let data = plans.map((pl) => {
      let obj = {
        'name': pl.student.name + ' ' + pl.student.last_name,
        'Monto': parseFloat(pl.amount),
        "label": pl.name
      }
      return obj;
    })
    setSecond(data);
  }

  const barchart = [
    {
      name: 'Amphibians',
      'Number of threatened species': 2488,
    },
    {
      name: 'Birds',
      'Number of threatened species': 1445,
    },
    {
      name: 'Crustaceans',
      'Number of threatened species': 743,
    },
    {
      name: 'Ferns',
      'Number of threatened species': 281,
    },
    {
      name: 'Arachnids',
      'Number of threatened species': 251,
    },
    {
      name: 'Corals',
      'Number of threatened species': 232,
    },
    {
      name: 'Algae',
      'Number of threatened species': 98,
    },
  ];

  return (
    <>
      <div>
        <DatePicker
          fechas={fechas}
          setFechas={setFechas}
          obtenerPlanes={obtenerPlanes}
          loading={loading}
          className={`flex items-center justify-center pb-4`}
        />
        {plans != null ? (
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex flex-col gap-4 md:w-1/2'>
              <Card className='w-full flex flex-row'>
                <div className='flex'>
                  <Title>Planes</Title>
                  <div className='mt-6 md:w-96 pb-3 flex items-center justify-center'>
                    <DonutChart
                      data={plans}
                      category='porcentaje'
                      index='description'
                      customTooltip={customTooltipDonut}
                      colors={['rose', 'yellow', 'orange', 'indigo', 'blue', 'emerald']}
                      onValueChange={(v) => setValue(v)}
                      showAnimation={true}
                      noDataText='No hay datos para mostrar'
                    />
                  </div>
                </div>
              </Card>
              <div className={`transition-opacity duration-500 ${showCard ? 'opacity-100' : 'opacity-0'}`}>
                {value !== null && (
                  <div className='flex justify-center items-center'>
                    <CustomCard className='max-w-md' plan={value} />
                  </div>
                )}
              </div>
            </div>
            <div className='flex flex-col gap-4 md:w-1/2'>
              <Card className='w-full'>
                <Title>Dinero obtenido</Title>
                <Flex className='mt-4'>
                  <Text>
                    <Bold>Motivo</Bold>
                  </Text>
                  <Text>
                    <Bold>Dinero</Bold>
                  </Text>
                </Flex>
                {planesReforged &&
                  <BarList
                    showAnimation={true}
                    data={planesReforged}
                    className='mt-2'
                  />
                }
              </Card>
              <Card className='w-full'>
                <Title>Monto de Planes asignados</Title>
                <Subtitle>Montos de cada Plan asignado</Subtitle>
                <BarChart
                  className='mt-6'
                  data={second}
                  index='name'
                  categories={['Monto']}
                  colors={['blue']}
                  valueFormatter={valueFormatter}
                  yAxisWidth={60}
                  showAnimation={true}
                  noDataText='No hay datos para mostrar'
                  customTooltip={customTooltip}
                />
              </Card>
            </div>
          </div>
        ) : (
          <div className='flex justify-center items-center'>
            <h1 className='text-2xl font-bold flex justify-center'>No hay planes!</h1>
          </div>
        )}
      </div>
    </>
  );
}