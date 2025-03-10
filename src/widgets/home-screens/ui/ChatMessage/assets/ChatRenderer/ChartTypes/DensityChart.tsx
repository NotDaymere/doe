import React from "react";
import { Violin } from "@ant-design/charts";

interface DensityChartProps {
    chart: {
        data: any;
    };
}

const DensityChart: React.FC<DensityChartProps> = ({ chart }) => {
    return (
        <div>
            <Violin
                height={300}
                violinType="density"
                seriesField="x"
                xField="x"
                yField="y"
                data={chart.data}
            />
        </div>
    );
};

export default DensityChart;
