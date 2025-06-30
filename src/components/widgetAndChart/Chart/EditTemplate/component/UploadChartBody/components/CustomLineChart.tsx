import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
} from "recharts";


interface ChartData {
    group: string;
    value: number | null;

    label: string;
    rank?: string;
    color?: string;
}

interface CustomLineChartProps {
    data?: ChartData[];
    color?: string;
    height?: number;

}


const defaultColor = "#FFDB65";


const defaultChartData: ChartData[] = [
    { group: 'Jan', value: 400, label: 'January', color: defaultColor },
    { group: 'Feb', value: 300, label: 'February', color: defaultColor },
  
    { group: 'Mar', value: 600, label: 'March', color: defaultColor },
    { group: 'Apr', value: 450, label: 'April', color: defaultColor },
    { group: 'May', value: 700, label: 'May', color: defaultColor },
    { group: 'Jun', value: 550, label: 'June', color: defaultColor },
];


const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[], label?: string }) => {
    if (active && payload && payload.length) {
  
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
                    minWidth: "78px",
                }}
            >
                <div>{label}</div>
                <div style={{ fontWeight: 'bold', marginTop: '4px' }}>
                    {`${entry.value}${entry.rank ? ` / ${entry.rank}` : ""}`}
                </div>
            </div>

);
    }
    return null;
};



const CustomLineChart = ({ data = defaultChartData, color = defaultColor, height = 300 }: CustomLineChartProps) => {
    return (

<ResponsiveContainer width="100%" height={height}>
            <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
                <defs>
                  
                    <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.9} />

                        <stop offset="95%" stopColor={color} stopOpacity={0.2} />
                    </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(220, 220, 220, 0.5)" />

                <XAxis
                    dataKey="group"
                    tick={{ fill: "var(--var-119)", fontWeight: "bold", fontSize: 12 }}

                    axisLine={false}
                    tickLine={false}
                />
                
                <YAxis
                    tick={{ fill: "var(--var-113)", fontWeight: "bold", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${value}`}

/>

                <Tooltip
                    content={<CustomTooltip />}

                    cursor={{ stroke: 'lightgray', strokeWidth: 1, strokeDasharray: '3 3' }}
                />

                <Area

type="monotone"
                    dataKey="value"
                    stroke="none"
                    fillOpacity={1}

                    fill="url(#line-gradient)"
                />

                <Line

type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 8, stroke: 'white', strokeWidth: 2, fill: color }}
                />

            </LineChart>

        </ResponsiveContainer>
    );
};

export default CustomLineChart;