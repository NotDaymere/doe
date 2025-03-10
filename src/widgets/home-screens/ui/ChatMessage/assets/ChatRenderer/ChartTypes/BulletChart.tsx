import React from "react";
import { Bullet } from "@ant-design/charts";

interface BulletChartProps {
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

const BulletChart: React.FC<BulletChartProps> = ({ chart }) => {
    return (
        <div>
            <Bullet
                color={{ target: "#30D6EB", measures: "#FF4848" }}
                scale={{ color: { palette: colorPalette } }}
                data={chart.data}
            />
        </div>
    );
};

export default BulletChart;
