import React from "react";
import { Violin } from "@ant-design/charts";

interface ViolinChartProps {
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

const ViolinChart: React.FC<ViolinChartProps> = ({ chart }) => {
    return (
        <div>
            <Violin
                scale={{ color: { palette: colorPalette } }}
                colorField="y"
                xField="x"
                yField="y"
                violinType="normal"
                data={chart.data}
                seriesField="species"
            />
        </div>
    );
};

export default ViolinChart;
