import React, { FC, useState } from 'react';
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Cell,
    CartesianGrid
} from 'recharts';
import './MessageLineChart.less';
import { ChartMessageData } from "../ChartDataParser";


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
        const strokeColor = isAnySelected && !isSelected ? '#eae9e9' : dataPoint.color;
        const radius = isSelected ? 8 : 5;
        return (
            <circle
                cx={cx}
                cy={cy}
                r={radius}
                strokeWidth={3}
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
        const bulletSize = 10;
        const spacing = 6;
        const bulletOffset = bulletSize + spacing;
        const dotColor = dataPoint?.color || '#CFCFCF';
        const labelText = payload.value;
        const words = labelText.split(' ');
        return (
            <g transform={`translate(${x}, ${y + 10})`}>
                <g textAnchor="middle" alignmentBaseline="middle">
                    <rect
                        x={-bulletOffset * 2}
                        y={-bulletSize}
                        width={bulletSize}
                        height={bulletSize}
                        fill={dotColor}
                        rx={2}
                        ry={2}
                    />
                    {words.length > 1 ? (
                        <text x="0" y="0" fill="#CFCFCF" fontSize={16}>
                            <tspan x="0" dy="0">
                                {words[0]}
                            </tspan>
                            <tspan x="0" dy="1.2em">
                                {words.slice(1).join(' ')}
                            </tspan>
                        </text>
                    ) : (
                        <text x="3" y="0" fill="#CFCFCF" fontSize={16}>
                            {labelText}
                        </text>
                    )}
                </g>
            </g>
        );
    };

    const selectedData = data.find(item => item.id === selectedId);

    return (
        <div className="line-message-chart">
            <div className="column-message-chart-title">Codeforces Elo / percentile</div>
            <div className="line-chart-container">
                <div className="line-chart">
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
                                    <stop offset="0%" stopColor="#eee" stopOpacity={0.7} />
                                    <stop offset="100%" stopColor="#f9f9f9" stopOpacity={0.7} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} />
                            <XAxis
                                dataKey="label"
                                tick={<CustomXAxisTick />}
                                tickLine={false}
                                padding={{ left: 20, right: 20 }}
                                axisLine={{ stroke: '#ccc', opacity: 1 }}
                            />
                            <YAxis axisLine={false} tickLine={false} />
                            <Bar
                                dataKey="value"
                                radius={[12, 12, 12, 12]}
                                barSize={80}
                                fill="url(#grayGradient)"
                            >
                                {data.map((item) => (
                                    <Cell
                                        key={item.id}
                                        fill="url(#grayGradient)"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() =>
                                            setSelectedId(selectedId === item.id ? null : item.id)
                                        }
                                    />
                                ))}
                            </Bar>
                            <Line
                                type="linear"
                                dataKey="value"
                                stroke="url(#lineGradient)"
                                strokeWidth={4}
                                dot={<CustomDot onDotClick={handleDotClick} />}
                                activeDot={<CustomActiveDot />}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
                <div className="info-container">
                    <h3 className="selected-data">Selected data:</h3>
                    {data.map((item) => (
                        <div key={item.id} className="details">
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <span
                                    style={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: "2px",
                                        backgroundColor: item.color,
                                    }}
                                />
                                <span>{item.label}</span>
                            </div>
                        </div>
                    ))}
                    {selectedData && (
                        <div className="selected-details">
                            <div className="selected-details-item">
                                <span className="selected-data">Codeforces Elo</span>
                                <span>{selectedData.value}</span>
                            </div>
                            <span className="line"></span>
                            <div className="selected-details-item">
                                <span className="selected-data">Percentile</span>
                                <span>{selectedData.percentile}%</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageLineChart;
