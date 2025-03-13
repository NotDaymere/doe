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
import { ChartMessageData } from "./mockColumnsChartMessageData";

interface MessageChartProps {
    data: ChartMessageData[];
}

const MessageColumnsChart: FC<MessageChartProps> = ({ data }) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selectedData = data.find((item) => item.id === selectedId);

    const gradients = [
        { start: '#FFC813', end: '#FFC81333' },
        { start: '#8BCF16', end: '#8BCF1633' },
        { start: '#008DAF99', end: '#30D6EB33' },
        { start: '#FF8B12', end: 'rgba(255,139,18,0.27)' },
    ];

    return (
        <div className="column-message-chart">
            <div className="column-chart-container">
                <div className="column-message-chart-title">Codeforces Elo / percentile</div>
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

                        <CartesianGrid strokeDasharray="3 3" vertical={false}/>

                        <XAxis
                            dataKey="label"
                            tick={{ fill: '#CFCFCF', fontSize: 16 }}
                            axisLine={{ stroke: '#CFCFCF', strokeWidth: 1 }}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: '#CFCFCF', fontSize: 16 }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Bar dataKey="value" radius={[12, 12, 12, 12]} >
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
                                    fillColor = "url(#grayGradient)";
                                }

                                return (
                                    <Cell
                                        key={item.id}
                                        fill={fillColor}
                                        className={`chart-bar ${isSelected ? "selected" : ""}`}
                                        style={{ cursor: "pointer" }}
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
