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
} from 'recharts';
import { CustomBarLabel } from './CustomBarLabel';
import './MessageColumnsChart.less';
import { ChartMessageData } from './mockColumnsChartMessageData';
import ScreenShareIcon from "../../../../../../../shared/icons/ScreenShare.icon";

const MessageColumnsChart: FC<{ data: ChartMessageData[] }> = ({ data }) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selectedData = data.find((item) => item.id === selectedId);

    const gradients = [
        { start: '#FFC813', end: '#fdf7e0' },
        { start: '#8BCF16', end: '#effbdb' },
        { start: '#02bfed', end: '#e7f9fb' },
        { start: '#FF8B12', end: 'rgb(255,238,219)' },
    ];

    const selectedIndex =
        selectedData !== undefined ? data.findIndex((item) => item.id === selectedData.id) : -1;
    const selectedColor =
        selectedIndex !== -1 ? gradients[selectedIndex % gradients.length].start : '';

    const renderCustomTick = (props: any) => {
        const { x, y, payload, index } = props;
        const gradient = gradients[index % gradients.length];
        const labelText = payload.value;
        const words = labelText.split(' ');
        const bulletSize = 10;
        const spacing = 6;
        const bulletOffset = bulletSize + spacing;
        return (
            <g transform={`translate(${x}, ${y + 10})`}>
                <g textAnchor="middle" alignmentBaseline="middle">
                    <rect
                        x={-bulletOffset * 2}
                        y={-bulletSize}
                        width={bulletSize}
                        height={bulletSize}
                        fill={gradient.start}
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
                        <text x="0" y="0" fill="#CFCFCF" fontSize={16}>
                            {labelText}
                        </text>
                    )}
                </g>
            </g>
        );
    };

    const handleCopy = () => {
        if (selectedData) {
            const textToCopy = `${selectedData.value}/${selectedData.percentile}th`;
            navigator.clipboard.writeText(textToCopy);
        }
    };

    return (
        <div className="column-message-chart">
            <div className="column-message-chart-title">Codeforces Elo / percentile</div>
            <div className="column-chart-container">
                <div className="column-chart">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                            <defs>
                                {data.map((item, index) => {
                                    const g = gradients[index % gradients.length];
                                    return (
                                        <linearGradient key={item.id} id={`gradient-${item.id}`} x1="0" y1="0" x2="0" y2="1">
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
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="label"
                                axisLine={{ stroke: '#CFCFCF', strokeWidth: 1 }}
                                tickLine={false}
                                tick={renderCustomTick}
                            />
                            <YAxis tick={{ fill: '#CFCFCF', fontSize: 16 }} axisLine={false} tickLine={false} />
                            <Bar dataKey="value" radius={[12, 12, 12, 12]}>
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
                                            className={`chart-bar ${isSelected ? 'selected' : ''}`}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                setSelectedId(isSelected ? null : item.id);
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
                        <div className="info-container-selected-data">
                            <h3 className="selected-data">Selected data:</h3>
                            <div className="selected-data-item">
                                <span
                                    style={{
                                        display: "inline-block",
                                        width: "10px",
                                        height: "10px",
                                        background: selectedColor,
                                        borderRadius: "2px",
                                        marginRight: "6px",
                                    }}
                                ></span>
                                <span>{selectedData.label}</span>
                            </div>
                        </div>
                        <span className="line"></span>
                        <div className="value-percentile-container">
                            <span>{selectedData.value}/{selectedData.percentile}th</span>
                            <button className="copy-button" onClick={handleCopy}>
                                <div><ScreenShareIcon /></div>
                                <span>Copy</span>
                            </button>
                        </div>
                        <div className="details">
                            <p className="selected-data">Codeforces Elo:</p>
                            <span className="selected-data-item">{selectedData.value}</span>
                            <span className="line"></span>
                            <p className="selected-data">Percentile:</p>
                            <span className="selected-data-item">{selectedData.percentile}%</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageColumnsChart;
