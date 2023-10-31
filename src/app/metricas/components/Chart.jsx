'use client'

import { useState } from 'react';

import { Card, DonutChart, Title } from "@tremor/react";

const cities = [
  {
    name: "New York",
    sales: 9800,
  },
  // ...
  {
    name: "Zurich",
    sales: 1398,
  },
];

const valueFormatter = (number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

export const Chart = () => {
  const [value, setValue] = useState(null);
  return (
    <>
      <Card className="mx-auto">
        <Title>Sales</Title>
        <DonutChart
          className="mt-6"
          data={cities}
          category="sales"
          index="name"
          colors={["rose", "yellow", "orange", "indigo", "blue", "emerald"]}
          onValueChange={(v) => setValue(v)}
        />
      </Card>
      <pre>{JSON.stringify(value)}</pre>
    </>
  );
};