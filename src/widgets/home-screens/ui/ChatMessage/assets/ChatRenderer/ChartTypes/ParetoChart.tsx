import React from "react";
import { DualAxes } from "@ant-design/charts";

interface DualAxesChartProps {
    data: any;
}

const ParetoChart: React.FC<DualAxesChartProps> = ({ data }) => {
    return (
        <DualAxes
            xField="x"
            children={[
                {
                    type: "interval",
                    yField: "value",
                    scale: { x: { padding: 0.5 }, y: { domainMax: 312, tickCount: 5 } },
                    style: { fill: (d: { percentage: number }) => (d.percentage < 0.1 ? "#FF4848" : "#FE9202") },
                    axis: { x: { title: null }, y: { title: "Defect frequency" } },
                    labels: [
                        {
                            text: (d: { percentage: number }) => `${(d.percentage * 100).toFixed(1)}%`,
                            textBaseline: "bottom",
                        },
                    ],
                },
                {
                    type: "line",
                    yField: "accumulate",
                    scale: { y: { domainMin: 0, tickCount: 5 } },
                    axis: {
                        y: {
                            position: "right",
                            title: "Cumulative Percentage",
                            grid: null,
                            labelFormatter: (d: number) => `${(d * 100).toFixed(0)}%`,
                        },
                    },
                    tooltip: {
                        items: [
                            {
                                channel: "y",
                                valueFormatter: (d: number) => `${(d * 100).toFixed(2)}%`,
                            },
                        ],
                    },
                },
                {
                    type: "point",
                    yField: "accumulate",
                    shapeField: "diamond",
                    scale: { y: { domainMin: 0 } },
                    axis: { y: false },
                    tooltip: false,
                },
            ]}
            width={500}
            data={{
                type: "inline",
                value: data,
                transform: [
                    {
                        type: "custom",
                        callback: (data: any[]) => {
                            const sum = data.reduce((r, curr) => r + curr.value, 0);
                            return data
                                .map((d) => ({
                                    ...d,
                                    percentage: d.value / sum,
                                }))
                                .reduce((r, curr) => {
                                    const v = r.length ? r[r.length - 1].accumulate : 0;
                                    const accumulate = v + curr.percentage;
                                    r.push({
                                        ...curr,
                                        accumulate,
                                    });
                                    return r;
                                }, []);
                        },
                    },
                ],
            }}
        />
    );
};

export default ParetoChart;
