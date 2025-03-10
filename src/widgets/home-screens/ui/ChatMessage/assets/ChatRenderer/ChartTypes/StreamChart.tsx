import React from "react";
import { Area } from "@ant-design/charts";

interface StreamChartProps {
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

const StreamChart: React.FC<StreamChartProps> = ({ chart }) => {
    return (
        <div>
            <Area
                scale={{ color: { palette: colorPalette } }}
                width={500}
                data={chart.data}
            />
        </div>
    );
};

export default StreamChart;
