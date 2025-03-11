import React, { FC } from 'react';

interface PayloadData {
    id: string;
    percentile: number;
}

interface CustomBarLabelPayload {
    payload: PayloadData;
}

interface CustomBarLabelProps {
    x?: number | string;
    y?: number | string;
    width?: number | string;
    height?: number | string;
    value?: number | string;
    payload: CustomBarLabelPayload;
    selectedId: string | null;
}

export const CustomBarLabel: FC<CustomBarLabelProps> = ({
                                                            x,
                                                            y,
                                                            width,
                                                            height,
                                                            value,
                                                            payload,
                                                            selectedId,
                                                        }) => {
    const xNum = typeof x === 'number' ? x : Number(x);
    const yNum = typeof y === 'number' ? y : Number(y);
    const widthNum = typeof width === 'number' ? width : Number(width);
    const heightNum = typeof height === 'number' ? height : Number(height);

    const originalData = payload.payload;

    if (!originalData || originalData.id !== selectedId) {
        return null;
    }

    const barCenter = xNum + widthNum / 2;

    const barTop = yNum;

    const yAxisX = 20;

    return (
        <g>

            <circle
                cx={barCenter}
                cy={barTop - 6}
                r={6}
                fill="#000"
            />

            <rect
                x={barCenter - 50}
                y={barTop - 34}
                width={100}
                height={28}
                rx={4}
                fill="#000"
            />
            <text
                x={barCenter}
                y={barTop - 16}
                textAnchor="middle"
                fill="#fff"
                fontSize={12}
                fontWeight="bold"
            >
                {value} / {originalData.percentile}%
            </text>

            <line
                x1={yAxisX + 50}
                y1={barTop}
                x2={barCenter}
                y2={barTop}
                stroke="#000"
                strokeDasharray="3 3"
                strokeWidth={2}
            />

            <text
                x={yAxisX + 50}
                y={barTop}
                textAnchor="end"
                alignmentBaseline="middle"
                fill="#000"
                fontSize={16}
                fontWeight="bold"
            >
                {value}
            </text>
        </g>
    );
};
