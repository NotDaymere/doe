import React from "react";
import { Radar } from "@ant-design/charts";

interface RadarChartProps {
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

const RadarChart: React.FC<RadarChartProps> = ({ chart }) => {
    return (
        <div>
            <Radar
                scale={{ color: { palette: colorPalette } }}
                xField="name"
                yField="star"
                data={chart.data}
            />
        </div>
    );
};

export default RadarChart;
