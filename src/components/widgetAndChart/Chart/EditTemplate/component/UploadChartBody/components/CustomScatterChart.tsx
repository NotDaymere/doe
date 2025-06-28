import { useMemo } from "react";
import {
    ScatterChart,
    Scatter,
    XAxis,
   
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
   
    Cell,
} from "recharts";



interface InputChartData {
    group: string;
    value: number | null;
    label: string;

    color?: string;
}

interface ProcessedScatterData {

    label: string;
    x: number;
    y: number;
    color: string;
}

interface CustomScatterChartProps {
    data?: InputChartData[];
  

}


const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div style={{ background: "#1F1F1F", color: "#fff", padding: "12px", borderRadius: "5px", fontSize: "14px", minWidth: "120px" }}>
                <p style={{ margin: "0 0 8px 0", fontWeight: "bold", borderBottom: '1px solid #444', paddingBottom: '8px' }}>{data.label}</p>

                <p style={{ margin: '4px 0', color: '#ddd' }}>
                    <span>Value: </span>
                    <span style={{ fontWeight: 'bold', color: 'white' }}>{data.y}</span>
                </p>
            </div>
        );
    }
    return null;
};

const CustomScatterChart = ({ data = [] }: CustomScatterChartProps) => {
    const processedData: ProcessedScatterData[] = useMemo(() => {
        if (!data || data.length === 0) return [];
        const validData = data.filter(item => item.value !== null && typeof item.value === 'number');
        return validData.map((item, index) => ({
            label: item.group,
            x: index,
            y: item.value as number,
            color: item.color || "#cccccc",

        }));
    }, [data]);

    return (
       
        <ResponsiveContainer width="100%" height="100%">
           
            <ScatterChart margin={{ top: 50, right: 30, bottom: 50, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0, 0, 0, 0.1)" />

                <XAxis type="number" dataKey="x" tick={false} axisLine={false} height={1} />
                <YAxis
                    type="number"
                    dataKey="y"
                    name="Value"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#b0b0b0", fontSize: 12 }}
                    tickCount={6}

                    domain={['dataMin', 'dataMax']}
                    allowDataOverflow={false}
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<CustomTooltip />} />
                <Scatter name="Data" data={processedData}>
                    {processedData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Scatter>

            </ScatterChart>
        </ResponsiveContainer>
    );
};

export default CustomScatterChart;