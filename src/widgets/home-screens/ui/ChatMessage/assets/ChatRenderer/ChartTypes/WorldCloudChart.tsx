import React from "react";
import { WordCloud } from "@ant-design/charts";

interface WordCloudChartProps {
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

const WordCloudChart: React.FC<WordCloudChartProps> = ({ chart }) => {
    return (
        <div>
            <WordCloud
                colorField="text"
                scale={{ color: { palette: colorPalette } }}
                data={chart.data}
            />
        </div>
    );
};

export default WordCloudChart;
