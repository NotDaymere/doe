import React from "react";
import { Funnel } from "@ant-design/charts";

interface FunnelChartProps {
    chart: {
        data: any;
    };
}

const colorPalette = [
    "#FF4848",
    "#FF704F",
    "#FE9202",
    "#FEC812",
    "#8CCF18",
    "#30D6EB",
    "#008DAF",
    "#0064C7",
    "#FFFFFF",
    "#000000",
];

const FunnelChart: React.FC<FunnelChartProps> = ({ chart }) => {
    return (
        <div>
            <Funnel
                scale={{ color: { palette: colorPalette } }}
                xField="stage"
                yField="number"
                data={chart.data}
            />
        </div>
    );
};

export default FunnelChart;
