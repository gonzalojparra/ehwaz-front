"use client";

import React, { PureComponent } from "react";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

const data01 = [
  { name: "Group A", value: 400, fill:"#FFFF20", descripcion:"Hat que hacer algo" },
  { name: "Group B", value: 300, fill:"#FF0020", descripcion:"Hat que hacer algo" },
  { name: "Group C", value: 300, fill:"#FF5020", descripcion:"Hat que hacer algo" },
  { name: "Group D", value: 200, fill:"#55FF20", descripcion:"Hat que hacer algo" },
  { name: "Group E", value: 278, fill:"#00FF20", descripcion:"Hat que hacer algo" },
  { name: "Group F", value: 189, fill:"#FF00AA", descripcion:"Hat que hacer algo" },
];

export default function Chart(){
    return (
        <PieChart width={1000} height={400}>
      <Pie
        dataKey="value"
        isAnimationActive={true}
        data={data01}
        cx={200}
        cy={200}
        outerRadius={120}
        label={"Cantidad de días por rutina"} 
        cursor={"pointer"}
        onSelect={(e)=>console.log(e)}
        onClick={(e)=>console.log(e)}
      />
      <Tooltip />
    </PieChart>
    )
}
