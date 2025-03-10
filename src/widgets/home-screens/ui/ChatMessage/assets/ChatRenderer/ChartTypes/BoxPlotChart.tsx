import React from "react";
import { Box } from "@ant-design/charts";

interface BoxPlotChartProps {
    chart: {
        data: any;
    };
}

const BoxPlotChart: React.FC<BoxPlotChartProps> = ({ chart }) => {
    return (
        <div>
            <Box
                style={{
                    stroke: "#545454",
                    fill: "#1890FF",
                    fillOpacity: 0.3,
                }}
                xField="x"
                yField="y"
                data={chart.data}
            />
        </div>
    );
};

export default BoxPlotChart;
