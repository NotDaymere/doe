import React from "react";
import { Waterfall } from "@ant-design/charts";

interface WaterfallChartProps {
    chart: {
        data: any;
    };
}

const WaterfallChart: React.FC<WaterfallChartProps> = ({ chart }) => {
    return (
        <div>
            <Waterfall
                width={500}
                linkStyle={{
                    lineDash: [4, 2],
                    stroke: "#ccc",
                }}
                style={{
                    fill: (d: { isTotal: any; value: number }, idx: number) =>
                        idx === 0 || d.isTotal ? "#FF4848" : d.value > 0 ? "#FF704F" : "#FE9202",
                }}
                xField="x"
                yField="value"
                data={chart.data}
            />
        </div>
    );
};

export default WaterfallChart;
