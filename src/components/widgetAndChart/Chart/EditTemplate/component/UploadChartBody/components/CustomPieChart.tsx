import { useMemo } from "react";
import {
    PieChart,
    Pie,
    ResponsiveContainer,
   
    Tooltip,
    Cell,
} from "recharts";



interface InputChartData {
    group: string;
    value: number | null;

    label: string;
    color?: string;
}


interface CustomPieChartProps {
    data?: InputChartData[];
}



const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div style={{ background: "#1F1F1F", color: "#fff", padding: "12px", borderRadius: "5px", fontSize: "14px", minWidth: "120px" }}>
                <p style={{ margin: 0, fontWeight: "bold" }}>{data.group}</p>
                <p style={{ margin: '4px 0 0 0', color: '#ddd' }}>
                    <span>Value: </span>

                    <span style={{ fontWeight: 'bold', color: 'white' }}>{data.value}</span>
                </p>
            </div>
        );
    }
    return null;
};



const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, payload }: any) => {
  
    const radius = outerRadius * 1.35;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text

        x={x}
            y={y}
            fill="#555" 
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            fontSize={12}
            fontWeight="500"
        >
            {`${payload.group} (${(percent * 100).toFixed(0)}%)`}

        </text>
    );
};


const CustomPieChart = ({ data = [] }: CustomPieChartProps) => {
    const processedData = useMemo(() => {
        return data.filter(item => item.value !== null && item.value > 0).map(item => ({
            ...item,

            color: item.color || '#cccccc'
        }));
    }, [data]);

    return (
        <ResponsiveContainer width="100%" height="100%">
          
            <PieChart margin={{ top: 33, right: 33, bottom: 33, left: 33 }}>
                <defs>

                    {processedData.map((entry, index) => (
                        <linearGradient key={`pie-gradient-${index}`} id={`pie-gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={entry.color} stopOpacity={0.9} />
                            <stop offset="100%" stopColor={entry.color} stopOpacity={0.5} />
                        </linearGradient>
                    ))}
                </defs>

                <Tooltip content={<CustomTooltip />} />

                <Pie
                    data={processedData}
                    dataKey="value"
                    nameKey="group"
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={"80%"}
                    paddingAngle={0}

                   
                    labelLine={{ stroke: 'rgba(0, 0, 0, 0.3)' }}
                    label={renderCustomizedLabel}
                >

                    {processedData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={`url(#pie-gradient-${index})`}

                            stroke={"#fff"}
                            strokeWidth={2}
                        />
                    ))}

                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );

};

export default CustomPieChart;