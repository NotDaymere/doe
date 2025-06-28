import { useMemo } from "react";
import {
    ScatterChart,
    Scatter,
    XAxis,
 
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
 
    ResponsiveContainer,
    Cell,
} from "recharts";


// Interfaces remain the same
interface InputChartData {
    group: string;
    value: number | null;

    label: string;
    color?: string;
}


interface ProcessedBubbleData {
    label:string;
    x: number;
    y: number;
    z: number;
    color: string;
}

interface CustomBubbleChartProps {

    data?: InputChartData[];
}


const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div style={{

                background: "#1F1F1F",
                color: "#fff",
                padding: "12px",
                borderRadius: "5px",
                fontSize: "14px",
                textAlign: 'left', 
            }}>
                <p style={{ margin: 0, paddingBottom: '8px', fontWeight: "bold", borderBottom: '1px solid #444' }}>
                    {data.label}

                </p>
                <p style={{ margin: 0, paddingTop: '8px' }}>
                    <span>Value: </span>
                    <span style={{ fontWeight: 'bold' }}>{data.y}</span>
                </p>
            </div>
        );
    }
    return null;

};

const CustomBubbleChart = ({ data = [] }: CustomBubbleChartProps) => {
    const processedData: ProcessedBubbleData[] = useMemo(() => {
        if (!data || data.length === 0) return [];
        const validData = data.filter(item => item.value !== null && typeof item.value === 'number');
        return validData.map((item, index) => ({
            label: item.group,
            x: index,

            y: item.value as number,
            z: item.value as number,
            color: item.color || "#cccccc",
        }));
    }, [data]);

  
  
    const xAxisDomain = useMemo(() => {

        if (processedData.length <= 1) {
            return [-0.5, 0.5];
        }
       
        return [-0.5, processedData.length - 0.5];
    }, [processedData]);

    const bubbleSizeRange = [200, 3000];


    return (
        <ResponsiveContainer width="100%" height="100%">
           
            <ScatterChart margin={{ top: 50, right: 17, bottom: 50, left: 17 }}>
                <defs>
                    {processedData.map((entry, index) => (
                        <radialGradient key={`bubble-gradient-${index}`} id={`bubble-gradient-${index}`} cx="40%" cy="40%" r="60%" fx="30%" fy="30%">
                            <stop offset="0%" stopColor="white" stopOpacity={0.7} />
                            <stop offset="100%" stopColor={entry.color} stopOpacity={0.9} />

                        </radialGradient>
                    ))}
                </defs>


                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0, 0, 0, 0.1)" />
                <XAxis
                    type="number"
                    dataKey="x"

                   
                    domain={xAxisDomain}
                    tick={false}
                    axisLine={false}

                    height={1}
                />
                <YAxis
                    type="number"

                    dataKey="y"
                    name="Value"
                    tickFormatter={(value) => `${value}`} 
                    tick={{ fill: "#b0b0b0", fontSize: 14, fontWeight: '500' }}
                    axisLine={false}
                    tickLine={false}
                    domain={['dataMin', 'dataMax']}
                    tickCount={6} 
                    allowDataOverflow={false}

/>
                <ZAxis type="number" dataKey="z" name="Size" range={bubbleSizeRange} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<CustomTooltip />} />
                <Scatter name="Data" data={processedData}>
                    {processedData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`url(#bubble-gradient-${index})`} stroke="none" />
                    ))}
                </Scatter>
            </ScatterChart>

        </ResponsiveContainer>
    );
};

export default CustomBubbleChart;