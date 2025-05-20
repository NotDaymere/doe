import React, { useMemo } from "react";
import { Chart as GoogleChart, GoogleChartWrapperChartType } from "react-google-charts";
import ParetoChart from "./ChartTypes/ParetoChart";
import ViolinChart from "./ChartTypes/ViolinChart";
import FunnelChart from "./ChartTypes/FunnelChart";
import RadarChart from "./ChartTypes/RadarChart";
import BulletChart from "./ChartTypes/BulletChart";
import WordCloudChart from "./ChartTypes/WorldCloudChart";
import BoxPlotChart from "./ChartTypes/BoxPlotChart";
import WaterfallChart from "./ChartTypes/WaterfallChart";
import HeatmapChart from "./ChartTypes/HeatmapChart";
import DensityChart from "./ChartTypes/DensityChart";
import VennChart from "./ChartTypes/VennChart";
import StreamChart from "./ChartTypes/StreamChart";
import {
    parseAreaChartData,
    parseBarColumnAreaData,
    parseBoxplotData,
    parseBubbleChartData,
    parseBulletChartData,
    parseCandlestickData,
    parseCircularPackingData,
    parseDensityData,
    parseFunnelChartData,
    parseGanttChartData,
    parseHeatmapData,
    parseLayout,
    parseLineChartData,
    parseParetoData,
    parsePieChartData,
    parseRadarChartData,
    parseSankeyChartData,
    parseStepChartData,
    parseStyle,
    parseSunburstChartData,
    parseTreeMapData,
    parseVennData,
    parseViolinChartData,
    parseWaterfallData,
    parseWordCloudData,
} from "./Utils/ChartParsers";

import MessageColumnsChart from "../MessageCharts/MessageColumnsChart/MessageColumnsChart";
import MessageLineChart from "../MessageCharts/MessageLineChart/MessageLineChart";
import { parseColumnBarMessageChartData, parseLineMessageChartData } from "../MessageCharts/ChartDataParser";

export interface ChartData {
    type: GoogleChartWrapperChartType | string;
    data: any;
    layout: { hAxis?: { title: string }; vAxis?: { title: string } };
    style: { [key: string]: any };
}

type ChartType =
    | "bar"
    | "line"
    | "pie"
    | "donut"
    | "area"
    | "scatter"
    | "bubble"
    | "column"
    | "histogram"
    | "boxplot"
    | "waterfall"
    | "table"
    | "gantt"
    | "treemap"
    | "sankey"
    | "step"
    | "candlestick"
    | "violin"
    | "funnel"
    | "radar"
    | "sunburst"
    | "bullet"
    | "wordcloud"
    | "heatmap"
    | "density"
    | "venn"
    | "stream"
    | "circularpacking"
    | "pareto";

const getChartType = (type: ChartType, orientation: string, stacked: boolean) => {
    if (type === "bar") {
        if (orientation === "horizontal") {
            return "BarChart";
        } else if (orientation === "vertical") {
            return "ColumnChart";
        }
    }
    return getBaseChartType(type);
};

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

const getBaseChartType = (type: ChartType) => {
    switch (type) {
        case "line":
            return "LineChart";
        case "pie":
        case "donut":
            return "PieChart";
        case "scatter":
            return "ScatterChart";
        case "bubble":
            return "BubbleChart";
        case "area":
            return "AreaChart";
        case "histogram":
            return "Histogram";
        case "boxplot":
            return "BoxPlot";
        case "candlestick":
            return "CandlestickChart";
        case "gantt":
            return "Gantt";
        case "treemap":
            return "TreeMap";
        case "sankey":
            return "Sankey";
        case "step":
            return "SteppedAreaChart";
        case "violin":
            return "Violin";
        case "funnel":
            return "Funnel";
        case "radar":
            return "Radar";
        case "sunburst":
            return "Sunburst";
        case "bullet":
            return "Bullet";
        case "wordcloud":
            return "WordCloud";
        case "waterfall":
            return "Waterfall";
        case "heatmap":
            return "Heatmap";
        case "density":
            return "Density";
        case "venn":
            return "Venn";
        case "stream":
            return "Stream";
        case "circularpacking":
            return "Circularpacking";
        case "pareto":
            return "Pareto";
        case "table":
            return "Table";
        default:
            console.log(`Error ${type}`);
            return "ColumnChart";
    }
};

const parseXML = (xmlString: string): ChartData[] => {
    const charts: ChartData[] = [];
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");

    const chartElements = xmlDoc.getElementsByTagName("chart");
    for (let i = 0; i < chartElements.length; i++) {
        const chartElement = chartElements[i];
        const chartType = chartElement.getAttribute("type") as ChartType;
        const orientation = chartElement.getAttribute("orientation") || "horizontal";
        const stacked = chartElement.getAttribute("stacked") === "true";
        const mappedChartType = getChartType(chartType, orientation, stacked);

        const layout = parseLayout(chartElement);
        const data = parseData(chartElement, mappedChartType, layout);
        const style = parseStyle(chartElement, colorPalette);

        charts.push({
            type: mappedChartType,
            data,
            layout,
            style: { ...style, orientation },
        });
    }

    return charts;
};

const parseData = (
    chartElement: Element,
    chartType: GoogleChartWrapperChartType | string,
    layout: { hAxis?: { title: string }; vAxis?: { title: string } }
) => {
    const dataElement = chartElement.getElementsByTagName("data")[0];
    if (!dataElement) return [[]];

    switch (chartType) {
        case "LineChart":
            return parseLineChartData(dataElement);
        case "BarChart":
        case "ColumnChart":
            return parseBarColumnAreaData(dataElement, colorPalette);
        case "AreaChart":
            return parseAreaChartData(dataElement, layout);
        case "ScatterChart":
            return parseAreaChartData(dataElement, layout);
        case "Histogram":
            return parseBarColumnAreaData(dataElement, colorPalette);
        case "PieChart":
            return parsePieChartData(dataElement);
        case "BubbleChart":
            return parseBubbleChartData(dataElement, layout);
        case "CandlestickChart":
            return parseCandlestickData(dataElement);
        case "Gantt":
            return parseGanttChartData(dataElement);
        case "TreeMap":
            return parseTreeMapData(dataElement);
        case "Sankey":
            return parseSankeyChartData(dataElement);
        case "SteppedAreaChart":
            return parseStepChartData(dataElement);
        case "Violin":
            return parseViolinChartData(dataElement, layout);
        case "Funnel":
            return parseFunnelChartData(dataElement);
        case "Radar":
            return parseRadarChartData(dataElement);
        case "Sunburst":
            return parseSunburstChartData(dataElement);
        case "Bullet":
            return parseBulletChartData(dataElement);
        case "WordCloud":
            return parseWordCloudData(dataElement);
        case "BoxPlot":
            return parseBoxplotData(dataElement);
        case "Waterfall":
            return parseWaterfallData(dataElement);
        case "Heatmap":
            return parseHeatmapData(dataElement);
        case "Density":
            return parseDensityData(dataElement);
        case "Venn":
            return parseVennData(dataElement);
        case "Circularpacking":
            return parseCircularPackingData(dataElement);
        case "Pareto":
            return parseParetoData(dataElement);
        default:
            return [[]];
    }
};

interface ChartRendererProps {
    input: string | any;
}

type ChartComponentMap = {
    [key: string]: React.ComponentType<any>;
};

const ChartRenderer: React.FC<ChartRendererProps> = ({ input }) => {
    const charts = useMemo(() => parseXML(input), [input]);
    const chartComponentMap: ChartComponentMap = {
        PieChart: GoogleChart,
        ScatterChart: GoogleChart,
        BubbleChart: GoogleChart,
        AreaChart: GoogleChart,
        Histogram: GoogleChart,
        CandlestickChart: GoogleChart,
        Gantt: GoogleChart,
        TreeMap: GoogleChart,
        Sankey: GoogleChart,
        SteppedAreaChart: GoogleChart,
    };

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                justifyContent: "center",
                padding: "20px",
                backgroundColor: "#fafafa",
            }}
        >
            {charts.map((chart, index) => {
                const ChartComponent = chartComponentMap[chart.type];

                if (ChartComponent) {
                    return (
                        <div
                            key={index}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "6px",
                                backgroundColor: "#fff",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                padding: "10px",
                            }}
                        >
                            <ChartComponent
                                chartType={chart.type}
                                data={chart.data}
                                width={"600px"}
                                height={"200px"}
                                options={chart.style}
                            />
                        </div>
                    );
                } else {
                    switch (chart.type) {
                        case "BarChart":
                            return (
                               <MessageColumnsChart data={parseColumnBarMessageChartData(chart)} />
                            );
                        case "ColumnChart":
                            return (
                                <MessageColumnsChart data={parseColumnBarMessageChartData(chart)} />
                            );
                        case "LineChart":
                            return (
                                <MessageLineChart data={parseLineMessageChartData(chart)}/>
                            );
                        case "Violin":
                            return (
                                <div
                                    key={index}
                                    style={{
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        backgroundColor: "#fff",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        padding: "10px",
                                    }}
                                >
                                    <ViolinChart chart={chart} />
                                </div>
                            );
                        case "Funnel":
                            return (
                                <div
                                    key={index}
                                    style={{
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        backgroundColor: "#fff",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        padding: "10px",
                                    }}
                                >
                                    <FunnelChart chart={chart} />
                                </div>
                            );
                        case "Radar":
                            return (
                                <div
                                    key={index}
                                    style={{
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        backgroundColor: "#fff",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        padding: "10px",
                                    }}
                                >
                                    <RadarChart chart={chart} />
                                </div>
                            );
                        case "Bullet":
                            return (
                                <div
                                    key={index}
                                    style={{
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        backgroundColor: "#fff",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        padding: "10px",
                                    }}
                                >
                                    <BulletChart chart={chart} />
                                </div>
                            );
                        case "WordCloud":
                            return (
                                <div
                                    key={index}
                                    style={{
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        backgroundColor: "#fff",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        padding: "10px",
                                    }}
                                >
                                    <WordCloudChart chart={chart} />
                                </div>
                            );
                        case "BoxPlot":
                            return (
                                <div
                                    key={index}
                                    style={{
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        backgroundColor: "#fff",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        padding: "10px",
                                    }}
                                >
                                    <BoxPlotChart chart={chart} />
                                </div>
                            );
                        case "Waterfall":
                            return (
                                <div
                                    key={index}
                                    style={{
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        backgroundColor: "#fff",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        padding: "10px",
                                    }}
                                >
                                    <WaterfallChart chart={chart} />
                                </div>
                            );
                        case "Heatmap":
                            return (
                                <div
                                    key={index}
                                    style={{
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        backgroundColor: "#fff",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        padding: "10px",
                                    }}
                                >
                                    <HeatmapChart chart={chart} />
                                </div>
                            );
                        case "Density":
                            return (
                                <div
                                    key={index}
                                    style={{
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        backgroundColor: "#fff",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        padding: "10px",
                                    }}
                                >
                                    <DensityChart chart={chart} />
                                </div>
                            );
                        case "Venn":
                            return (
                                <div
                                    key={index}
                                    style={{
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        backgroundColor: "#fff",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        padding: "10px",
                                    }}
                                >
                                    <VennChart chart={chart} />
                                </div>
                            );
                        case "Stream":
                            return (
                                <div
                                    key={index}
                                    style={{
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        backgroundColor: "#fff",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        padding: "10px",
                                    }}
                                >
                                    <StreamChart chart={chart} />
                                </div>
                            );
                        case "Pareto":
                            return (
                                <div
                                    key={index}
                                    style={{
                                        border: "1px solid #ddd",
                                        borderRadius: "6px",
                                        backgroundColor: "#fff",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        padding: "10px",
                                    }}
                                >
                                    <ParetoChart data={chart.data} />
                                </div>
                            );
                        default:
                            return null;
                    }
                }
            })}
        </div>
    );
};

export default ChartRenderer;
