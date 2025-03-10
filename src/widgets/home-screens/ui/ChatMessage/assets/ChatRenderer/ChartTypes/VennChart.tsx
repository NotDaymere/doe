import React from "react";
import { Venn } from "@ant-design/charts";

interface VennChartProps {
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

const VennChart: React.FC<VennChartProps> = ({ chart }) => {
    return (
        <div>
            <Venn
                scale={{ color: { palette: colorPalette } }}
                width={500}
                setsField="sets"
                sizeField="size"
                data={chart.data}
            />
        </div>
    );
};

export default VennChart;
