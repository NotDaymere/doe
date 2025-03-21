import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    Cell,
    Rectangle,
} from "recharts";

interface ChartData {
    group: string;
    value: number | null;
    label: string;
    rank?: string;
    color?: string;
}

interface CustomChartBarProps {
    data: ChartData[];
    maxValue?: number;
}

const backgroundBarColor = "#f8f8f8"; // Light gray background for bars

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
                {`${entry.value}${entry.rank ? ` / ${entry.rank}` : ""}`}
            </div>
        );
    }
    return null;
};

const CustomBar = (props: any) => {
    const { fill, x, y, width, height } = props;
    const radius = 10; // Radius for rounded corners

    return (
        <g>
            {/* Render the background bar */}
            <Rectangle
                x={x}
                y={30}
                width={width}
                height={180}
                fill={backgroundBarColor}
                radius={[radius, radius, 0, 0]}
            />
            {/* Render the actual colored bar */}
            <Rectangle
                x={x}
                y={y}
                width={width}
                height={height}
                fill={fill}
                radius={[radius, radius, 0, 0]}
            />
        </g>
    );
};

const CustomChartBar = ({ data, maxValue = 2000 }: CustomChartBarProps) => {
    return (
        <ResponsiveContainer width="100%" height={260}>
            <BarChart
                data={data}
                margin={{ top: 70, right: 30, left: 20, bottom: 20 }}
                barCategoryGap="20%"
            >
                <defs>
                    {data.map((entry, index) => (
                        <linearGradient
                            key={index}
                            id={`gradient-${index}`}
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

                <XAxis
                    dataKey="group"
                    tick={{ fill: "#CFCFCF", fontWeight: "bold", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                />

                <YAxis
                    tick={{ fill: "#CFCFCF", fontWeight: "bold", fontSize: 12 }}
                    domain={[0, maxValue]}
                    axisLine={false}
                    tickLine={false}
                />

                <Tooltip content={<CustomTooltip />} cursor={false} />

                <Bar dataKey="value" shape={<CustomBar />} maxBarSize={50}>
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={`url(#gradient-${index})`}
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
