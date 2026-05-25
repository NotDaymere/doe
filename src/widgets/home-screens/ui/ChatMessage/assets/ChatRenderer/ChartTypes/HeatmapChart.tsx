import React from "react";
import { Heatmap } from "@ant-design/charts";

interface HeatmapChartProps {
    chart: {
        data: any;
    };
}

const HeatmapChart: React.FC<HeatmapChartProps> = ({ chart }) => {
    return (
        <div>
            <Heatmap
                scale={{ color: { range: ["#FF4848", "#FE9202", "#FF704F", "#8CCF18", "#30D6EB", "#008DAF", "#0064C7"] } }}
                mark="cell"
                height={300}
                colorField="value"
                style={{ inset: 0.5 }}
                xField="x"
                yField="y"
                autoFit={false}
                data={chart.data}
            />
        </div>
    );
};

export default HeatmapChart;
