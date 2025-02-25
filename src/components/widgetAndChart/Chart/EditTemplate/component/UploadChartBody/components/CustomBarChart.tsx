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
    Legend,
    LabelList,
} from "recharts";

interface ChartData {
    group: string;
    value: number | null;
    label: string;
    rank?: string;
}

const data: ChartData[] = [
    { group: "BCM (projected)", value: 2000, label: "2000" },
    { group: "o1", value: 1673, label: "1673", rank: "89th" },
    { group: "o1", value: 1500, label: "1500" },
    { group: "o1-ioi", value: 1000, label: "1000" },
];

const gradientColors = ["#FFDB65", "#BEE380", "#BEE380", "#FFB364"];

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (active && payload && payload.length && payload[0].payload.value !== null) {
        const entry = payload[0].payload;
        return (
            <div
                style={{
                    background: "#1F1F1F",
                    color: "#fff",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    fontSize: "14px",
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

const CustomAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const words = payload.value.split(" ");
    return (
        <g transform={`translate(${x},${y})`}>
            <rect
                x={-20}
                y={10}
                width={14}
                height={14}
                fill={gradientColors[payload.index % gradientColors.length]}
                rx={3}
                ry={3}
            />
            <text
                x={0}
                y={10}
                dy={16}
                textAnchor="start"
                fontSize={12}
                fill="#ddd"
                fontWeight="bold"
            >
                {words.map((word, index) => (
                    <tspan key={index} x={10} dy={index === 10 ? 10 : 14}>
                        {word}
                    </tspan>
                ))}
            </text>
        </g>
    );
};

const CustomChartBar = () => {
    const [activeEntry, setActiveEntry] = useState<ChartData | null>(null);

    return (
        <ResponsiveContainer width="100%" height={280}>
            <BarChart
                data={data}
                margin={{ top: 70, right: 30, left: 20, bottom: 50 }}
                barCategoryGap="20%"
            >
                <defs>
                    {gradientColors.map((color, index) => (
                        <linearGradient
                            key={index}
                            id={`gradient-${index}`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop offset="0%" stopColor={color} stopOpacity={1} />
                            <stop offset="100%" stopColor={color} stopOpacity={0.4} />
                        </linearGradient>
                    ))}
                </defs>

                <XAxis
                    dataKey="group"
                    tick={<CustomAxisTick />}
                    axisLine={false}
                    tickLine={false}
                />

                <YAxis
                    tick={{ fill: "#CFCFCF", fontWeight: "bold", fontSize: 12 }}
                    domain={[0, 2500]}
                    axisLine={false}
                    tickLine={false}
                />

                <Tooltip content={<CustomTooltip />} cursor={false} />

                <Bar
                    dataKey="value"
                    stackId="stack"
                    radius={[10, 10, 0, 0]}
                    onMouseOver={(data: ChartData) => {
                        if (data.value !== null) setActiveEntry(data);
                    }}
                    onMouseLeave={() => setActiveEntry(null)}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={`url(#gradient-${index % gradientColors.length})`}
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
