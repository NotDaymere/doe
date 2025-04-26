import React, { FC } from "react";

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
    containerWidth?: number;
}

export const CustomBarLabel: FC<CustomBarLabelProps> = ({
    x,
    y,
    width,
    height,
    value,
    payload,
    selectedId,
    containerWidth,
}) => {
    const xNum = typeof x === "number" ? x : Number(x);
    const yNum = typeof y === "number" ? y : Number(y);
    const widthNum = typeof width === "number" ? width : Number(width);
    const containerWidthNum = containerWidth ?? 500;
    const originalData = payload.payload;
    const barCenter = xNum + widthNum / 2;
    const barTop = yNum;
    if (selectedId === null) {
        return (
            <text
                x={barCenter}
                y={barTop - 8}
                textAnchor="middle"
                fill="#B5B5B5"
                fontSize={14}
                fontWeight="bold"
            >
                {value} / {originalData.percentile}th
            </text>
        );
    }
    if (originalData.id !== selectedId) {
        return null;
    }
    return (
        <g>
            <rect
                x={barCenter - 40}
                y={barTop - 35}
                width={80}
                height={28}
                rx={15}
                ry={15}
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
                x1={30 + 50}
                y1={barTop}
                x2={barCenter}
                y2={barTop}
                stroke="var(--var-86)"
                strokeDasharray="3 3"
                strokeWidth={2}
            />
            <text
                x={20 + 50}
                y={barTop}
                textAnchor="end"
                alignmentBaseline="middle"
                fill="var(--var-125)"
                fontSize={16}
                fontWeight="bold"
            >
                {value}
            </text>
            <line
                x1={barCenter}
                y1={barTop}
                x2={30 + 510}
                y2={barTop}
                stroke="var(--var-86)"
                strokeDasharray="3 3"
                strokeWidth={2}
            />
            <circle
                cx={barCenter}
                cy={barTop - 1}
                r={5}
                fill="#000"
                stroke="#fff"
                strokeWidth={2}
            />
        </g>
    );
};
