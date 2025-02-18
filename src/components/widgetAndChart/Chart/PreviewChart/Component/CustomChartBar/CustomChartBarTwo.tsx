import React from "react";
<<<<<<< HEAD
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, defs, linearGradient, stop } from "recharts";

const maxValue = 2000; // Maximum scale for bars

const data = [
  { name: "BCM (projected)", value: 300, background: maxValue },
  { name: "o1 preview", value: 300, background: maxValue },
  { name: "o1", value: 500, background: maxValue },
  { name: "o1-ioi", value: 300, background: maxValue },
];

const colors = {
  value: "#FFC75F", // Foreground color (yellow)
  background: "url(#gray-gradient)", // Gray background gradient
};

// Custom bar shape for rounded corners
const CustomRoundedBar = (props) => {
  const { x, y, width, height, fill } = props;
  const radius = 20; // Adjust roundness
=======
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const maxValue = 2000;

const data = [
  { name: "BCM (projected)", value: 300, color: "#FFC75F" },
  { name: "o1 preview", value: 300, color: "#8BC34A" },
  { name: "o1", value: 300, color: "#64B5F6" },
  { name: "o1-ioi", value: 300, color: "#FFA07A" },
];

interface CustomBarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
}

const CustomBar = (props: any) => {
  const { x, y, width, height, fill } = props;
  const radius = 20;
>>>>>>> db107e2a880650fa4964ebdfc9b538db0385250b

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={radius}
      ry={radius}
      fill={fill}
    />
  );
};

const CustomBarChartTwo = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} barSize={100} barGap={5} barCategoryGap="10%">
        <defs>
          {/* Improved Gray Gradient for the Background */}
          <linearGradient id="gray-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C0C0C0" stopOpacity={0.8} /> {/* Darker Gray */}
            <stop offset="100%" stopColor="#E0E0E0" stopOpacity={0} /> {/* Fully Transparent */}
          </linearGradient>

          {/* Gradient for foreground bars */}
          <linearGradient id="color-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFC75F" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#FFC75F" stopOpacity={0.3} />
          </linearGradient>
        </defs>

        <XAxis dataKey="name" tick={{ fontSize: 14 }} />
        <YAxis domain={[0, maxValue]} tick={{ fontSize: 12 }} />
        <Tooltip />

<<<<<<< HEAD
        {/* Foreground Bar (Rounded and Colored) */}
        <Bar dataKey="value" fill="url(#color-gradient)" barSize={50} stackId="stack" minPointSize={5} shape={<CustomRoundedBar />} />

        {/* Background Bar (Rounded Gray Fade from Top) */}
        <Bar dataKey="background" fill="url(#gray-gradient)" barSize={50} stackId="stack" shape={<CustomRoundedBar />} />
=======
        <Bar
          dataKey={() => maxValue}
          fill="#E0E0E0"
          barSize={50}
          shape={<CustomBar />}
        />

        {data.map((entry, index) => (
          <Bar
            key={index}
            dataKey="value"
            fill={entry.color}
            barSize={50}
            shape={<CustomBar />}
          />
        ))}
>>>>>>> db107e2a880650fa4964ebdfc9b538db0385250b
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChartTwo;
