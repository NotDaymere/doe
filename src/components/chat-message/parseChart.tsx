import {
Area,
Box,
Bullet,
CirclePacking,
DualAxes,
Funnel,
Heatmap,
Radar,
Sunburst,
Venn,
Violin,
Waterfall,
WordCloud,
} from "@ant-design/charts";
import { interpolateHcl } from 'd3-interpolate';
import React,{ useEffect,useMemo } from "react";
import { Chart as GoogleChart,GoogleChartWrapperChartType } from "react-google-charts";

interface ChartData {
  type: GoogleChartWrapperChartType | string;
  data: any
  layout: { hAxis?: { title: string }; vAxis?: { title: string } }
  style: { [key: string]: any }
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
]

type ChartType = "bar" | "line" | "pie" | "donut" | "area" | "scatter" | "bubble" | "column" | "histogram" | "boxplot" | "waterfall" | "table" | "gantt" | "treemap" | "sankey" | "step" | "candlestick" | "violin" | "funnel" | "radar" | "sunburst" | "bullet" | "wordcloud" | "heatmap" | "density" | "venn" | "stream" | "circularpacking" | "pareto"

const getChartType = (type: ChartType, orientation: string, stacked: boolean) => {
  if (type === "bar") {
    if (orientation === "horizontal") {
      return "BarChart"
    } else if (orientation === "vertical") {
      return "ColumnChart"
    }
  }
  return getBaseChartType(type)
}

const getBaseChartType = (type: ChartType) => {
  switch (type) {
    case "line":
      return "LineChart"
    case "pie":
    case "donut":
      return "PieChart"
    case "scatter":
      return "ScatterChart"
    case "bubble":
      return "BubbleChart"
    case "area":
      return "AreaChart"
    case "histogram":
      return "Histogram"
    case "boxplot":
      return "BoxPlot"
    case "candlestick":
      return "CandlestickChart"
    case "gantt":
      return "Gantt"
    case "treemap":
      return "TreeMap"
    case "sankey":
      return "Sankey"
    case "step":
      return "SteppedAreaChart"
    case "violin":
      return "Violin"
    case "funnel":
      return "Funnel"
    case "radar":
      return "Radar"
    case "sunburst":
      return "Sunburst"
    case "bullet":
      return "Bullet"
    case "wordcloud":
      return "WordCloud"
    case "waterfall":
      return "Waterfall"
    case "heatmap":
      return "Heatmap"
    case "density":
      return "Density"
    case "venn":
      return "Venn"
    case "stream":
      return "Stream"
    case "circularpacking":
      return "Circularpacking"
    case "pareto":
      return "Pareto"
    case "table":
      return "Table"
    default:
      console.log(`Error ${type}`)
      return "ColumnChart"
  }
}

const parseXML = (xmlString: string): ChartData[] => {
  const charts: ChartData[] = []
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xmlString, "application/xml")

  const chartElements = xmlDoc.getElementsByTagName("chart")
  for (let i = 0; i < chartElements.length; i++) {
    const chartElement = chartElements[i]
    const chartType = chartElement.getAttribute("type") as ChartType
    const orientation = chartElement.getAttribute("orientation") || "horizontal"
    const stacked = chartElement.getAttribute("stacked") === "true"
    console.log('orientation', orientation)
    const mappedChartType = getChartType(chartType, orientation, stacked)

    const layout = parseLayout(chartElement)
    const data = parseData(chartElement, mappedChartType, layout)
    const style = parseStyle(chartElement)

    charts.push({
      type: mappedChartType,
      data,
      layout,
      style: { ...style, orientation },
    })
  }

  return charts
}

const parseData = (
  chartElement: Element,
  chartType: GoogleChartWrapperChartType | string,
  layout: { hAxis?: { title: string }; vAxis?: { title: string } }
) => {
  const dataElement = chartElement.getElementsByTagName("data")[0]
  if (!dataElement) return [[]]

  switch (chartType) {
    case "LineChart":
      return parseLineChartData(dataElement)
    case "BarChart":
    case "ColumnChart":
      return parseBarColumnAreaData(dataElement)
    case "AreaChart":
      return parseAreaChartData(dataElement, layout)
    case "ScatterChart":
      return parseAreaChartData(dataElement, layout)
    case "Histogram":
      return parseBarColumnAreaData(dataElement)
    case "PieChart":
      return parsePieChartData(dataElement)
    case "BubbleChart":
      return parseBubbleChartData(dataElement, layout)
    case "CandlestickChart":
      return parseCandlestickData(dataElement)
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
      return [[]]
  }
}

const parseLayout = (chartElement: Element): { hAxis?: { title: string }; vAxis?: { title: string } } => {
  const layoutElement = chartElement.getElementsByTagName("layout")[0]
  const xAxisLabel = layoutElement?.getElementsByTagName("xaxis")[0]?.getAttribute("label") || ""
  const yAxisLabel = layoutElement?.getElementsByTagName("yaxis")[0]?.getAttribute("label") || ""

  return {
    hAxis: { title: xAxisLabel },
    vAxis: { title: yAxisLabel },
  }
}

const parseStyle = (chartElement: Element): { [key: string]: any } => {

  const styleElement = chartElement.getElementsByTagName("style")[0]
  const barWidth = styleElement?.getElementsByTagName("barwidth")[0]?.textContent || "100%"
  const colors = JSON.parse(styleElement?.getElementsByTagName("colors")[0]?.textContent || "[]")
  const innerRadius = styleElement?.getElementsByTagName("innerRadius")[0]?.textContent
  const candlestickOptions = colors.length === 2 ? {
    bar: { groupWidth: "50%" },
    candlestick: {
      fallingColor: { strokeWidth: 0, fill: colors[0] },
      risingColor: { strokeWidth: 0, fill: colors[1] },
    },
  } : {};

  const donutOptions = innerRadius ? {
    pieHole: innerRadius.includes('%')
      ? parseFloat(innerRadius) / 100
      : innerRadius,
  } : {};



  return { bar: { groupWidth: barWidth }, colors: colors.length ? colors : colorPalette, ...candlestickOptions, ...donutOptions }
}

const parseLineChartData = (dataElement: Element): Array<Array<string | number>> => {
  const xValues = JSON.parse(dataElement.getElementsByTagName("xvalues")[0]?.textContent || "[]")
  const yValues = JSON.parse(dataElement.getElementsByTagName("yvalues")[0]?.textContent || "[]")

  return [["Time", "Value"], ...xValues.map((x: number, index: number) => [x, yValues[index]])]
}

const parseBarColumnAreaData = (dataElement: Element): Array<Array<string | number>> => {
  const categories = JSON.parse(dataElement.getElementsByTagName("categories")[0]?.textContent || "[]")
  const values = JSON.parse(dataElement.getElementsByTagName("values")[0]?.textContent || "[]")

  return [
    ["Category", "Value", { role: "style" }],
    ...categories.map((category: string, index: number) => [
      category,
      values[index],
      colorPalette[index % colorPalette.length],
    ]),
  ]
}

const parsePieChartData = (dataElement: Element): Array<Array<string | number>> => {
  const labels = JSON.parse(dataElement.getElementsByTagName("labels")[0]?.textContent || "[]")
  const values = JSON.parse(dataElement.getElementsByTagName("values")[0]?.textContent || "[]")
  return [["", ""], ...labels.map((label: string, index: number) => [label, values[index]])]
}

const parseAreaChartData = (dataElement: Element, layout: { hAxis?: { title: string }; vAxis?: { title: string } }): Array<Array<string | number>> => {
  const xvalues = JSON.parse(dataElement.getElementsByTagName("xvalues")[0]?.textContent || "[]")
  const yvalues = JSON.parse(dataElement.getElementsByTagName("yvalues")[0]?.textContent || "[]")

  const xAxisLabel = layout.hAxis?.title || " "
  const yAxisLabel = layout.vAxis?.title || " "

  return [
    [xAxisLabel, yAxisLabel],
    ...xvalues.map((x: number, index: number) => [x, yvalues[index]]),
  ]
}

const parseBubbleChartData = (
  dataElement: Element,
  layout: { hAxis?: { title: string }; vAxis?: { title: string } }
): Array<Array<string | number>> => {
  const xvaluesElement = dataElement.querySelector("xvalues");
  const yvaluesElement = dataElement.querySelector("yvalues");
  const sizevaluesElement = dataElement.querySelector("sizevalues");

  const xvalues = xvaluesElement ? JSON.parse(xvaluesElement.textContent || "[]") : [];
  const yvalues = yvaluesElement ? JSON.parse(yvaluesElement.textContent || "[]") : [];
  const sizevalues = sizevaluesElement ? JSON.parse(sizevaluesElement.textContent || "[]") : [];

  const xAxisLabel = layout.hAxis?.title || "X Axis";
  const yAxisLabel = layout.vAxis?.title || "Y Axis";

  return [
    ['ID', xAxisLabel, yAxisLabel, 'Series/Color', 'Size'],
    ...xvalues.map((x: number, index: number) => [
      '',
      x,
      yvalues[index],
      '',
      sizevalues[index],
    ]),
  ];
};


const parseGanttChartData = (dataElement: Element): [Array<{ type: string, label: string }>, ...Array<Array<string | number | Date>>] => {
  const tasks = Array.from(dataElement.querySelectorAll("task"));
  const colorsData = dataElement.querySelector("colors")?.textContent || "[]";

  const colors: string[] = JSON.parse(colorsData);
  const columns: Array<{ type: string, label: string }> = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration (days)" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];

  const rows: Array<Array<string | number | Date>> = [];

  tasks.forEach((task: Element, index: number) => {
    const taskName = task.getAttribute("name") || `Task ${index + 1}`;
    const startAttr = task.getAttribute("start");
    const endAttr = task.getAttribute("end");
    const startDate = startAttr ? new Date(startAttr) : null;
    const endDate = endAttr ? new Date(endAttr) : null;

    if (!startDate || isNaN(startDate.getTime()) || !endDate || isNaN(endDate.getTime())) {
      console.warn(`Invalid start or end date for task: ${taskName}`);
      return;
    }

    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    rows.push([
      `Task-${index + 1}`,
      taskName,
      startDate,
      endDate,
      duration,
      100,
      "",
    ]);
  });

  return [columns, ...rows] as [Array<{ type: string, label: string }>, ...Array<Array<string | number | Date>>];
};

const parseTreeMapData = (dataElement: Element): Array<Array<string | number | null>> => {
  const categories = Array.from(dataElement.getElementsByTagName("category"));

  const rows: Array<Array<string | number | null>> = [];

  rows.push([
    "Location",
    "Parent",
    "Market trade volume (size)",
    "Market increase/decrease (color)",
  ]);

  rows.push(["Global", null, 0, 0]);

  categories.forEach((category: Element) => {
    const name = category.getAttribute("name") || "Unnamed Category";
    const valueAttr = category.getAttribute("value");
    const value = valueAttr ? parseFloat(valueAttr) : 0;
    const parent = "Global";
    const colorValue = 0;

    rows.push([name, parent, value, colorValue]);
  });

  return rows;
};

const parseSankeyChartData = (dataElement: Element): Array<Array<string | number>> => {
  const nodes = Array.from(dataElement.getElementsByTagName("node"));
  const links = Array.from(dataElement.getElementsByTagName("link"));

  const rows: Array<Array<string | number>> = [];

  rows.push(["From", "To", "Weight"]);

  const nodeNames = nodes.map((node: Element) => node.getAttribute("name") || "");

  links.forEach((link: Element) => {
    const source = link.getAttribute("source") || "";
    const target = link.getAttribute("target") || "";
    const value = parseInt(link.getAttribute("value") || "0", 10);

    if (source && target) {
      rows.push([source, target, value]);
    }
  });

  return rows;
};

const parseStepChartData = (dataElement: Element): Array<Array<string | number>> => {
  const xValues = JSON.parse(dataElement.querySelector("xvalues")?.textContent || "[]");
  const yValues = JSON.parse(dataElement.querySelector("yvalues")?.textContent || "[]");

  const rows: Array<Array<string | number>> = [];

  rows.push(["X", "Y"]);

  for (let i = 0; i < xValues.length; i++) {
    if (i === 0) {
      rows.push([xValues[i], yValues[i]]);
    } else {
      rows.push([xValues[i - 1], yValues[i - 1]]);
      rows.push([xValues[i], yValues[i]]);
    }
  }

  return rows;
};

const parseCandlestickData = (dataElement: Element): Array<Array<string | number>> => {
  const timestamps = JSON.parse(dataElement.querySelector("timestamps")?.textContent || "[]");
  const openValues = JSON.parse(dataElement.querySelector("open")?.textContent || "[]");
  const highValues = JSON.parse(dataElement.querySelector("high")?.textContent || "[]");
  const lowValues = JSON.parse(dataElement.querySelector("low")?.textContent || "[]");
  const closeValues = JSON.parse(dataElement.querySelector("close")?.textContent || "[]");

  const rows: Array<Array<string | number>> = [];

  rows.push(["Day", "Low", "Open", "Close", "High"]);

  for (let i = 0; i < timestamps.length; i++) {
    rows.push([
      `Day ${timestamps[i]}`,
      lowValues[i],
      openValues[i],
      closeValues[i],
      highValues[i],
    ]);
  }

  return rows;
};


const parseViolinChartData = (dataElement: Element, layout: { hAxis?: { title: string }; vAxis?: { title: string } }): Array<Array<string | number>> => {
  const categories = JSON.parse(dataElement.getElementsByTagName("categories")[0]?.textContent || "[]");
  const values = JSON.parse(dataElement.getElementsByTagName("values")[0]?.textContent || "[]");
  const colors = JSON.parse(dataElement.getElementsByTagName("colors")[0]?.textContent || "[]");

  const xAxisLabel = layout.hAxis?.title || "Categories";
  const yAxisLabel = layout.vAxis?.title || "Values";

  return categories.map((category: string, index: number) => {
    return values[index].map((value: number) => ({
      species: category,
      x: xAxisLabel,
      y: value
    }));
  }).flat();
};

const parseFunnelChartData = (dataElement: Element): Array<Array<string | number>> => {
  const stages = JSON.parse(dataElement.getElementsByTagName("stages")[0]?.textContent || "[]");
  const values = JSON.parse(dataElement.getElementsByTagName("values")[0]?.textContent || "[]");

  return stages.map((stage: string, index: number) => ({
    stage: stage,
    number: values[index] || 0,
  }));
};

const parseRadarChartData = (dataElement: Element): Array<Array<string | number>> => {
  const stages = JSON.parse(dataElement.getElementsByTagName("categories")[0]?.textContent || "[]");
  const values = JSON.parse(dataElement.getElementsByTagName("values")[0]?.textContent || "[]");

  return stages.map((stage: string, index: number) => ({
    name: stage,
    star: values[index] || 0,
  }));
};

const parseSunburstChartData = (dataElement: Element): Record<string, any> => {
  const levels = Array.from(dataElement.getElementsByTagName("level"));

  const parseLevel = (levelElement: Element): Record<string, any> => {
    const levelName = levelElement.getAttribute("name") || "Unnamed Level";
    const items = Array.from(levelElement.getElementsByTagName("item"));

    const children = items.map((item) => ({
      name: item.getAttribute("name") || "Unnamed Item",
      value: Number(item.getAttribute("value")) || 0,
    }));

    return {
      name: levelName,
      value: children.reduce((sum, child) => sum + child.value, 0),
      children: children.length > 0 ? children : undefined,
    };
  };

  const root = {
    name: "Root",
    children: levels.map(parseLevel),
  };

  console.log('root', root)

  return root;
};

const parseBulletChartData = (dataElement: Element): Array<Record<string, any>> => {
  const performance = JSON.parse(dataElement.getElementsByTagName("performance")[0]?.textContent || "[]");
  const target = JSON.parse(dataElement.getElementsByTagName("target")[0]?.textContent || "[]");

  return performance.map((measure: number, index: number) => ({
    title: `Category ${index + 1}`,
    ranges: 100,
    measures: measure,
    targets: target[index] || 0,
  }));
};

const parseWordCloudData = (dataElement: Element): Array<Record<string, any>> => {
  const wordElements = Array.from(dataElement.getElementsByTagName("word"));

  return wordElements.map((wordElement) => ({
    text: wordElement.getAttribute("name") || "",
    value: parseInt(wordElement.getAttribute("size") || "0", 10),
    name: wordElement.getAttribute("name") || "",
  }));
};

const parseBoxplotData = (dataElement: Element): Array<{ x: string; y: number[] }> => {
  const categoriesString = dataElement.getElementsByTagName("categories")[0]?.textContent || "[]";
  const valuesString = dataElement.getElementsByTagName("values")[0]?.textContent || "[]";

  const categories = JSON.parse(categoriesString);
  const values = JSON.parse(valuesString);
  return categories.map((category: string, index: number) => ({
    x: category,
    y: values[index],
  }));
};

const parseWaterfallData = (dataElement: Element): Array<{ x: string; value: number }> => {
  const categoriesString = dataElement.getElementsByTagName("categories")[0]?.textContent || "[]";
  const valuesString = dataElement.getElementsByTagName("values")[0]?.textContent || "[]";

  const categories = JSON.parse(categoriesString);
  const values = JSON.parse(valuesString);


  return categories.map((category: string, index: number) => ({
    x: category,
    value: values[index],
  }));
};

const parseHeatmapData = (dataElement: Element): Array<{ x: number; y: number; value: number }> => {
  const rows = dataElement.getElementsByTagName("row");

  const matrix: number[][] = Array.from(rows).map((row) => {
    const rowContent = row.textContent || "[]";
    return JSON.parse(rowContent);
  });

  const heatmapData: Array<{ x: number; y: number; value: number }> = [];

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      heatmapData.push({
        x: x + 1,
        y: y + 1,
        value: matrix[y][x],
      });
    }
  }

  return heatmapData;
};

const parseDensityData = (dataElement: Element): Array<{ x: number; y: number }> => {
  const xValuesContent = dataElement.getElementsByTagName("xvalues")[0]?.textContent || "[]";
  const densityValuesContent = dataElement.getElementsByTagName("densityvalues")[0]?.textContent || "[]";

  const xValues: number[] = JSON.parse(xValuesContent);
  const densityValues: number[] = JSON.parse(densityValuesContent);

  return xValues.map((x, index) => ({
    x,
    y: densityValues[index] || 0,
  }));
};

const parseVennData = (dataElement: Element): Array<{ sets: string[]; size: number; label?: string }> => {
  const setElements = dataElement.getElementsByTagName("set");

  const setsData: Array<{ name: string; size: number }> = Array.from(setElements).map(set => ({
    name: set.getAttribute("name") || "",
    size: parseFloat(set.getAttribute("size") || "0"),
  }));


  return setsData.map(set => ({
    sets: [set.name],
    size: set.size,
    label: set.name,
  }));
};

const parseCircularPackingData = (dataElement: Element): { name: string; children: any[] } => {
  const parseCircle = (circleElement: Element): { name: string; value?: number; children?: any[] } => {
    const name = circleElement.getAttribute("name") || "";
    const size = circleElement.getAttribute("size");
    const children = Array.from(circleElement.children)
      .filter(child => child.tagName === "circle")
      .map(child => parseCircle(child));

    return {
      name,
      ...(size ? { value: parseFloat(size) } : {}),
      ...(children.length ? { children } : {}),
    };
  };

  const circles = Array.from(dataElement.getElementsByTagName("circle"))
    .filter(circle => circle.parentElement?.tagName === "circles")
    .map(circle => parseCircle(circle));

  return {
    name: "root",
    children: circles,
  };
};

const parseParetoData = (chartElement: Element): { x: string; value: number }[] => {
  const categoriesElement = chartElement.querySelector("categories");
  const valuesElement = chartElement.querySelector("values");

  if (!categoriesElement || !valuesElement) {
    throw new Error("Invalid data: Missing <categories> or <values> elements");
  }

  const categories = JSON.parse(categoriesElement.textContent || "[]");
  const values = JSON.parse(valuesElement.textContent || "[]");

  if (categories.length !== values.length) {
    throw new Error("Categories and values arrays must have the same length");
  }

  return categories.map((category: any, index: string | number) => ({
    x: category,
    value: values[index],
  }))
};







interface ChartRendererProps {
  input: string | any
}

type ChartComponentMap = {
  [key: string]: React.ComponentType<any>;
};

const ChartRenderer: React.FC<ChartRendererProps> = ({ input }) => {
  const charts = useMemo(() => parseXML(input), [input])
  const chartComponentMap: ChartComponentMap = {
    "LineChart": GoogleChart,
    "PieChart": GoogleChart,
    "ScatterChart": GoogleChart,
    "BubbleChart": GoogleChart,
    "AreaChart": GoogleChart,
    "Histogram": GoogleChart,
    "CandlestickChart": GoogleChart,
    "Gantt": GoogleChart,
    "TreeMap": GoogleChart,
    "Sankey": GoogleChart,
    "SteppedAreaChart": GoogleChart,
    "BarChart": GoogleChart,
    "ColumnChart": GoogleChart,
  };


  return (
    <div>
      {charts.map((chart, index) => {
        const ChartComponent = chartComponentMap[chart.type];

        if (ChartComponent) {
          return (
            <div key={index}>
              <ChartComponent
                chartType={chart.type}
                data={chart.data}
                width={"600px"}
                height={"200px"}
                options={chart.style}
              />
            </div>
          );
        } else if (chart.type === 'Violin')
        {
          return <div key={index}>
            <div>
              <Violin scale={{ color: { palette: colorPalette } }} colorField={"y"} xField={"x"} yField={"y"} violinType={"normal"} data={chart.data}
                      seriesField={"species"} />
            </div>
          </div>

        }
      else if
        (chart.type === "Funnel")
        {
         return <div key={index}>
            <div>
              <Funnel scale={{ color: { palette: colorPalette } }} xField={"stage"} yField={"number"}  data={chart.data}/>
            </div>
          </div>
        } else if
        (chart.type === "Radar")
        {
          return <div key={index}>
            <div>
              <Radar scale={{ color: { palette: colorPalette } }} xField={"name"} yField={"star"}  data={chart.data}/>
            </div>
          </div>
        } else if
        (chart.type === "Bullet")
        {
          return <div key={index}>
            <div>
              <Bullet color={{target: '#30D6EB', measures: '#FF4848'}} scale={{ color: { palette: colorPalette } }} data={chart.data}/>
            </div>
          </div>
        } else if
        (chart.type === "WordCloud")
        {
          return (
            <div key={index}>
              <div>
                <WordCloud colorField={"text"} scale={{ color: { palette: colorPalette } }} data={chart.data} />
              </div>
            </div>
          )
        } else if
        (chart.type === "BoxPlot")
        {
          return <div key={index}>
            <div>
              <Box style={{
                stroke: '#545454',
                fill: '#1890FF',
                fillOpacity: 0.3,
              }} xField={'x'} yField={'y'} data={chart.data}/>
            </div>
          </div>
        } else if
        (chart.type === "Waterfall")
        {
          return <div key={index}>
            <div>
              <Waterfall width={500} linkStyle={{
                lineDash: [4, 2],
                stroke: '#ccc',
              }} style={{fill: (d: { isTotal: any; value: number; }, idx: number) => {
                  return idx === 0 || d.isTotal ? '#FF4848' : d.value > 0 ? '#FF704F' : '#FE9202';
                },}} xField={'x'} yField={'value'} data={chart.data}/>
            </div>
          </div>
        } else if
        (chart.type === "Heatmap")
        {
          return <div key={index}>
            <div>
              <Heatmap scale={{ color: { range: ["#FF4848", "#FE9202", "#FF704F", "#8CCF18", "#30D6EB", "#008DAF", "#0064C7"] } }} mark={'cell'} height={300} colorField={'value'} style={{inset: 0.5}} xField={'x'} yField={'y'} autoFit={false} data={chart.data}/>
            </div>
          </div>
        } else if
        (chart.type === "Density")
        {
          return <div key={index}>
            <div>
              <Violin height={300} violinType={'density'} seriesField={'x'} xField={'x'} yField={'y'} data={
                chart.data
              }/>
            </div>
          </div>
        } else if
        (chart.type === "Venn")
        {
          return (
            <div key={index}>
              <div>
                <Venn
                  scale={{ color: { palette: colorPalette } }}
                  width={500}
                  setsField={"sets"}
                  sizeField={"size"}
                  data={chart.data}
                />
              </div>
            </div>
          )
        } else if
        (chart.type === "Stream")
        {
          return (
            <div key={index}>
              <div>
                <Area scale={{ color: { palette: colorPalette } }} width={500} data={chart.data} />
              </div>
            </div>
          )
        } else if
        (chart.type === "Pareto")
        {
          return (
            <div key={index}>
              <div>
                <DualAxes
                  xField={"x"}
                  children={[
                    {
                      type: "interval",
                      yField: "value",
                      scale: { x: { padding: 0.5 }, y: { domainMax: 312, tickCount: 5 } },
                      style: { fill: (d: { percentage: number }) => (d.percentage < 0.1 ? "#FF4848" : "#FE9202") },
                      axis: { x: { title: null }, y: { title: "Defect frequency" } },
                      labels: [
                        {
                          text: (d: { percentage: number }) => `${(d.percentage * 100).toFixed(1)}%`,
                          textBaseline: "bottom",
                        },
                      ],
                    },
                    {
                      type: "line",
                      yField: "accumulate",
                      scale: { y: { domainMin: 0, tickCount: 5 } },
                      axis: {
                        y: {
                          position: "right",
                          title: "Cumulative Percentage",
                          grid: null,
                          labelFormatter: (d: number) => `${(d * 100).toFixed(0)}%`,
                        },
                      },
                      tooltip: {
                        items: [{ channel: "y", valueFormatter: (d: number) => `${(d * 100).toFixed(2)}%` }],
                      },
                    },
                    {
                      type: "point",
                      yField: "accumulate",
                      shapeField: "diamond",
                      scale: { y: { domainMin: 0 } },
                      axis: { y: false },
                      tooltip: false,
                    },
                  ]}
                  width={500}
                  data={{
                    type: "inline",
                    value: chart.data,
                    transform: [
                      {
                        type: "custom",
                        callback: (data: any[]) => {
                          const sum = data.reduce((r, curr) => r + curr.value, 0)
                          return data
                            .map(d => ({
                              ...d,
                              percentage: d.value / sum,
                            }))
                            .reduce((r, curr) => {
                              const v = r.length ? r[r.length - 1].accumulate : 0
                              const accumulate = v + curr.percentage
                              r.push({
                                ...curr,
                                accumulate,
                              })
                              return r
                            }, [])
                        },
                      },
                    ],
                  }}
                />
              </div>
            </div>
          )
        }
        return (
          <div>
          </div>
        );
      })}
    </div>
  )
}

export default ChartRenderer
