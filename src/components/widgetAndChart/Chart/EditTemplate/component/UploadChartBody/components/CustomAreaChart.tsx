import { useMemo } from "react";
import {
    AreaChart,
    Area,
    XAxis,
   
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,

} from "recharts";


interface InputChartData {

    group: string;
    value: number | null;
    label: string;
    color?: string;

}

interface CustomAreaChartProps {
    data?: InputChartData[];

}


const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[], label?: string }) => {
    if (active && payload && payload.length) {
        const entry = payload[0];
        return (
            <div style={{ background: "#1F1F1F", color: "#fff", padding: "12px", borderRadius: "5px", fontSize: "14px", minWidth: "120px" }}>
                <p style={{ margin: 0, fontWeight: "bold" }}>{label}</p>

                <p style={{ margin: '4px 0 0 0', color: '#ddd' }}>
                    <span>Value: </span>
                    <span style={{ fontWeight: 'bold', color: 'white' }}>{entry.value}</span>
                </p>
            </div>
        );
    }
    return null;
};

const CustomAreaChart = ({ data = [] }: CustomAreaChartProps) => {
   
    const processedData = useMemo(() => {
        return data.filter(item => item.value !== null);
    }, [data]);

  
    const chartColor = processedData.length > 0 && processedData[0].color ? processedData[0].color : '#8884d8';


    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={processedData}
                margin={{ top: 30, right: 30, left: 20, bottom: 30 }}
            >
                <defs>
                  
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">

                        <stop offset="5%" stopColor={chartColor} stopOpacity={0.6}/>
                        <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                    </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0, 0, 0, 0.1)" />
                <XAxis dataKey="group" axisLine={false} tickLine={false} tick={{ fill: "#b0b0b0", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#b0b0b0", fontSize: 12 }} />
                

                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'lightgray', strokeWidth: 1, strokeDasharray: '3 3' }} />

                <Area
                    type="monotone"
                    dataKey="value"
                  
                    stroke="none"
                   
                    fill="url(#areaGradient)"

                   
                    activeDot={{ r: 6, stroke: 'white', fill: chartColor, strokeWidth: 2 }}
                />

              
                 <Area
                    type="monotone"
                    dataKey="value"
                    stroke={chartColor}

                    strokeWidth={2}
                    fill="none"
                    dot={false}
                />

            </AreaChart>
        </ResponsiveContainer>
    );
};

export default CustomAreaChart;