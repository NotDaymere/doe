import {
    PieChart,
    Pie,
    ResponsiveContainer,
    Tooltip,
    
    Cell,
} from "recharts";



interface ChartData {
    group: string;
    value: number | null;
    label: string;

    rank?: string;
    color?: string;
}


interface CustomPieChartProps {
    data?: ChartData[]; 
    height?: number;
}


const defaultChartData: ChartData[] = [
    { group: 'Group A', value: 400, label: 'Alpha', color: '#0088FE' },
    { group: 'Group B', value: 300, label: 'Beta', color: '#00C49F' },
    { group: 'Group C', value: 300, label: 'Gamma', color: '#FFBB28' },
    { group: 'Group D', value: 200, label: 'Delta', color: '#FF8042' },
];



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
                    minWidth: "78px",
                }}
            >
                <div>{entry.label}</div>
                <div style={{ fontWeight: "bold", marginTop: '4px' }}>
                    {`${entry.value}${entry.rank ? ` / ${entry.rank}` : ""}`}

                </div>
            </div>
        );
    }
    return null;
};




const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    payload,
}: any) => {
  
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
  
            fill="var(--var-119)"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            style={{ fontSize: 12, fontWeight: 'bold' }}
        >
            {payload.group}
        </text>
    );
};


const CustomDonutChart = ({ data = defaultChartData, height = 350 }: CustomPieChartProps) => {
    
  

    const validData = data.filter(d => d.value !== null && d.value > 0);
    console.log("Valid Data for Pie Chart:", validData);
    return (
        <ResponsiveContainer width="100%" height={height}>
  
            <PieChart>
                <defs>
                    {validData.map((entry, index) => (
                        <linearGradient
  
                        key={`pie-gradient-${index}`}
                            id={`pie-gradient-${index}`}
                            x1="0"
                            y1="0"
  
                            x2="0"
                            y2="1"
                        >
                            <stop
  
  offset="0%"
                                stopColor={entry.color || "#FFDB65"}
                                stopOpacity={1}
                            />
  
                            <stop
                                offset="100%"
                                stopColor={entry.color || "#FFDB65"}
                                stopOpacity={0.4}
                            />
                        </linearGradient>
                    ))}
                </defs>

  
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />

                <Pie
                    data={validData}
                    cx="50%"
                    cy="50%"
                    labelLine={{ stroke: 'var(--var-113)' }}
                    label={renderCustomizedLabel}
                    outerRadius={"70%"}
  
                    innerRadius={"50%"}
                    dataKey="value"
                    nameKey="group"
                    paddingAngle={5}
                >
                    {validData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={`url(#pie-gradient-${index})`}
  
                            stroke="none"
                        />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};
export default CustomDonutChart;