import React, { FC, useState } from 'react';
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    LabelList,
    Cell
} from "recharts";
import './MessageLineChart.less';
import { ChartMessageData } from "./mockLineChartMessageData";
import { CustomBarLabel } from "../MessageColumnsChart/CustomBarLabel";

interface MessageChartProps {
    data: ChartMessageData[];
}

const MessageLineChart: FC<MessageChartProps> = ({ data }) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleDotClick = (payload: ChartMessageData) => {
        setSelectedId(prev => (prev === payload.id ? null : payload.id));
    };

    const CustomDot: FC<any> = (props) => {
        const { cx, cy, payload, onDotClick } = props;
        if (cx === undefined || cy === undefined || !payload) return null;
        const dataPoint = payload as ChartMessageData;
        const isSelected = selectedId === dataPoint.id;
        const isAnySelected = selectedId !== null;
        const strokeColor = isAnySelected && !isSelected ? "#ccc" : dataPoint.color;
        const radius = isSelected ? 8 : 4; // увеличенный размер при выборе

        return (
            <circle
                cx={cx}
                cy={cy}
                r={radius}
                strokeWidth={2}
                stroke={strokeColor}
                fill={dataPoint.color}
                onClick={(e) => {
                    e.stopPropagation();
                    onDotClick?.(dataPoint);
                }}
                style={{ cursor: 'pointer' }}
            />
        );
    };

    const CustomActiveDot: FC<any> = (props) => {
        const { cx, cy, payload } = props;
        if (cx === undefined || cy === undefined || !payload) return null;
        const dataPoint = payload as ChartMessageData;
        return (
            <circle
                cx={cx}
                cy={cy}
                r={8}
                strokeWidth={2}
                stroke={dataPoint.color}
                fill={dataPoint.color}
            />
        );
    };

    const CustomXAxisTick: FC<any> = (props) => {
        const { x, y, payload } = props;
        const dataPoint = data.find(item => item.label === payload.value);
        const dotColor = dataPoint?.color || '#000';
        return (
            <g transform={`translate(${x},${y + 10})`}>
                <circle cx={0} cy={0} r={4} fill={dotColor} />
                <text x={10} y={5} fill="#666" fontSize="12px">
                    {payload.value}
                </text>
            </g>
        );
    };

    return (
        <div className="line-message-chart">
            <div className="line-chart-container">
                <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                        <defs>
                            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                {data.map((item, index) => (
                                    <stop
                                        key={item.id}
                                        offset={`${(index / (data.length - 1)) * 100}%`}
                                        stopColor={item.color}
                                    />
                                ))}
                            </linearGradient>
                            <linearGradient id="grayGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ccc" stopOpacity={1} />
                                <stop offset="100%" stopColor="#eee" stopOpacity={1} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" tick={<CustomXAxisTick />} />
                        <YAxis />
                        <Bar
                            dataKey="value"
                            radius={[8, 8, 0, 0]}
                            barSize={80}
                            fill="url(#grayGradient)"
                        >
                            <LabelList
                                dataKey="value"
                                content={({ x, y, width, height, value, index }) => {
                                    if (index === undefined) return null;
                                    return (
                                        <CustomBarLabel
                                            x={x}
                                            y={y}
                                            width={width}
                                            height={height}
                                            value={value}
                                            payload={{ payload: data[index] }}
                                            selectedId={selectedId}
                                        />
                                    );
                                }}
                            />
                            {data.map((item) => (
                                <Cell
                                    key={item.id}
                                    fill="url(#grayGradient)"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
                                />
                            ))}
                        </Bar>

                        <Line
                            type="linear"
                            dataKey="value"
                            stroke="url(#lineGradient)"
                            strokeWidth={2}
                            dot={<CustomDot onDotClick={handleDotClick} />}
                            activeDot={<CustomActiveDot />}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            <div className="info-container">
                <h3>All data points</h3>
                {data.map((item) => (
                    <div key={item.id} className="details">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span
                                style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: item.color,
                                }}
                            />
                            <span>{item.label}</span>
                        </div>
                        <p>Codeforces Elo: {item.value}</p>
                        <p>Percentile: {item.percentile}%</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessageLineChart;
