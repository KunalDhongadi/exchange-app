import chroma from "chroma-js";
import React, { useContext, useState } from "react";
import { PieChart, Pie, Sector, Cell, Tooltip, Legend } from "recharts";
import UserContext from "../context/userContext";


const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];


const PiechartComponent = ({portfolioValue, tokens}) => {

  const { userData } = useContext(UserContext);

  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = (_, index) => {
    setActiveIndex(null);
  };

  
  let tokenData = tokens.sort((a,b)=>(b.quantity * b.price.inr) - (a.quantity * a.price.inr));
  tokenData.map(t=>{
    t.value=t.quantity*t.price.inr;
  })

  // console.log("tokenData1", tokenData);

  let length = tokenData.length;

  const baseColor = "#ECFCCB"; // The base color
  const numSteps = length; // The number of steps to generate
  let colors = chroma
    .scale([baseColor, chroma(baseColor).saturate(2)])
    .colors(numSteps);
  colors = colors.reverse();

  const renderColorfulLegendText = (value, entry) => {
    return <span className="text-gray-500 ms-3">{value}</span>;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const color = payload[0].payload.fill;
      const total = portfolioValue;
      const value = payload[0].payload.value;
      const percent = ((value / total) * 100).toFixed(1);
      
      return (
        <div className="custom-tooltip bg-zinc-800/60 p-3 border border-zinc-600 backdrop-blur-2xl rounded-md">
          <div className="percentage text-white flex items-center">
            <div
              className="h-3 w-3 rounded-full me-1"
              style={{ backgroundColor: color }}
            ></div>
            <p className="text-sm font-medium">{percent}%</p>
          </div>
          <p className="coin text-sm text-white font-medium">{payload[0].payload.name}<span className="text-gray-400 ms-1">{(payload[0].payload.symbol).toUpperCase()}</span></p>
          <p className="quantity text-sm font-medium text-gray-300">{formatFloat(payload[0].payload.quantity,3)}{(payload[0].payload.symbol).toUpperCase()} / {formatFloat(value)}INR</p>
        </div>
      );
    }

    return null;
  };

  const formatFloat = (number, toFixedN) => {
    return parseFloat(number.toFixed(toFixedN)).toLocaleString("en-IN");
  };


  return (
    <div className="w-full">
      <PieChart width={400} height={400} className="mx-auto">
        <Pie
          data={tokenData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={65}
          startAngle={90}
          endAngle={-360}
          minAngle={2}
          paddingAngle={2}
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          onMouseEnter={onPieEnter}
          onMouseLeave={onPieLeave}
        >
          {tokenData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index]}
              stroke="#27272A"
            />
          ))}
        </Pie>
        <Tooltip
          content={<CustomTooltip />}
          offset={36}
          isAnimationActive={true}
        />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          iconType="circle"
          formatter={renderColorfulLegendText}
        />
      </PieChart>
    </div>
  );
};

export default PiechartComponent;

// import React from 'react'
// import { Pie, PieChart, ResponsiveContainer } from 'recharts';

// const PiechartComponent = () => {
//   const data = [
//     {name: 'Geeksforgeeks', students: 400},
//     {name: 'Technical scripter', students: 700},
//     {name: 'Geek-i-knack', students: 200},
//     {name: 'Geek-o-mania', students: 1000}
//   ];

//   return (
//     <ResponsiveContainer width="100%" height="100%">
// <PieChart width={700} height={700}>
//             <Pie data={data} dataKey="students" outerRadius={250} fill="green" />
//           </PieChart>
//     </ResponsiveContainer>

//   );
// }

// export default PiechartComponent
