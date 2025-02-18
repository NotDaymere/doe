import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
  Tooltip,
} from "recharts";

interface ChartData {
  group: string;
  value: number | null;
  label: string;
  rank?: string;
}

const data: ChartData[] = [
  { group: "Widgets", value: 2000, label: "2000" },
  { group: "Widgets", value: 1673, label: "1673", rank: "89th" },
  { group: "Widgets", value: 1500, label: "1500" },
  { group: "Total / 80th", value: 1000, label: "1000" },
];

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any[];
}) => {
  if (
    active &&
    payload &&
    payload.length &&
    payload[0].payload.value !== null
  ) {
    const entry = payload[0].payload;
    return (
      <div
        style={{
          background: "#1F1F1F",
          color: "#fff",
          padding: "8px 12px",
          borderRadius: "100px",
          fontSize: "14px",
          top: "-70px",
          left: "0%",
          transform: "translateX(-50%)",

          textAlign: "center",
          position: "relative",
          zIndex: 100,
          minWidth: "78px",
        }}
      >
        {`${entry.value}${entry.rank ? ` / ${entry.rank}` : ""}`}
      </div>
    );
  }
  return null;
};

const CustomChartBar = () => {
  const [activeEntry, setActiveEntry] = useState<ChartData | null>(null);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 70, right: 30, left: 20, bottom: 5 }}
        barCategoryGap="20%"
      >
        <defs>
          <linearGradient id="active" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7fdaff" />
            <stop offset="100%" stopColor="#7fdaff" stopOpacity={0.4} />
          </linearGradient>
          <linearGradient id="default" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#cccccc" />
            <stop offset="100%" stopColor="#cccccc" stopOpacity={0.4} />
          </linearGradient>
        </defs>

        <XAxis
          dataKey="group"
          tick={{ fill: "#ddd", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          tick={{ fill: "#CFCFCF", fontWeight: "bold", fontSize: 12 }}
          domain={[0, 2500]}
          axisLine={false}
          tickLine={false}
        />

        <ReferenceLine
          y={activeEntry?.value || 0}
          stroke={activeEntry ? "#7fdaff" : "transparent"}
          strokeWidth={2}
          strokeDasharray="5 5"
          label={{
            value: activeEntry
              ? `${activeEntry.value}${
                  activeEntry.rank ? ` / ${activeEntry.rank}` : ""
                }`
              : "",
            position: "left",
            fill: "#222",
            fontSize: 12,
            fontWeight: "bold",
            offset: 10,
          }}
        />

        <Tooltip
          content={<CustomTooltip />}
          cursor={false}
          allowEscapeViewBox={{ x: false, y: false }}
        />

        <Bar
          dataKey="value"
          radius={[10, 10, 0, 0]}
          onMouseOver={(data: ChartData) => {
            if (data.value !== null) setActiveEntry(data);
          }}
          onMouseLeave={() => setActiveEntry(null)}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                entry.value === null
                  ? "transparent"
                  : activeEntry?.value === entry.value
                  ? "url(#active)"
                  : "url(#default)"
              }
              stroke={entry.value === null ? "#ccc" : "none"}
              strokeDasharray={entry.value === null ? "5 5" : "0"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomChartBar;
