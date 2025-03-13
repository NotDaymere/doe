import React, { FC, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Cell,
    LabelList,
    Tooltip
} from 'recharts';
import { CustomBarLabel } from './CustomBarLabel';
import './MessageColumnsChart.less';

export interface ChartMessageData {
    id: string;
    label: string;
    value: number;
    percentile: number;
}

interface MessageChartProps {
    data: ChartMessageData[];
}

const MessageColumnsChart: FC<MessageChartProps> = ({ data }) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selectedData = data.find((item) => item.id === selectedId);

    const gradients = [
        { start: '#FF8B12', end: '#FFE89D' },
        { start: 'rgba(0,141,175,0.6)', end: 'rgba(48,214,235,0.2)' },
        { start: '#8BCF16', end: 'rgba(139,207,22,0.2)' },
        { start: '#FFC813', end: 'rgba(255,200,19,0.2)' },
        { start: '#FF6B6B', end: 'rgba(255,107,107,0.2)' },
        { start: '#A66CFF', end: 'rgba(166,108,255,0.2)' },
    ];

    return (
        <div className="message-chart">
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                    >
                        <defs>
                            {data.map((item, index) => {
                                const g = gradients[index % gradients.length];
                                return (
                                    <linearGradient
                                        key={item.id}
                                        id={`gradient-${item.id}`}
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop offset="0%" stopColor={g.start} stopOpacity={1} />
                                        <stop offset="100%" stopColor={g.end} stopOpacity={1} />
                                    </linearGradient>
                                );
                            })}
                            <linearGradient id="grayGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ccc" stopOpacity={1} />
                                <stop offset="100%" stopColor="#eee" stopOpacity={1} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis />

                        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
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

                            {data.map((item) => {
                                const isSelected = selectedId === item.id;
                                const isAnySelected = selectedId !== null;

                                let fillColor = `url(#gradient-${item.id})`;
                                if (isAnySelected && !isSelected) {
                                    fillColor = 'url(#grayGradient)';
                                }

                                return (
                                    <Cell
                                        key={item.id}
                                        fill={fillColor}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            if (isSelected) {
                                                setSelectedId(null);
                                            } else {
                                                setSelectedId(item.id);
                                            }
                                        }}
                                    />
                                );
                            })}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {selectedData && (
                <div className="info-container">
                    <h3>Selected data: {selectedData.label}</h3>
                    <p>
                        {selectedData.value}/{selectedData.percentile}th
                    </p>
                    <button className="copy-button">Copy</button>
                    <div className="details">
                        <p>Codeforces Elo: {selectedData.value}</p>
                        <p>Percentile: {selectedData.percentile}%</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessageColumnsChart;
