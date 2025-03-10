export const parseStyle = (
    chartElement: Element,
    palette: string[]
): { [key: string]: any } => {
    const styleElement = chartElement.getElementsByTagName("style")[0];
    const barWidth =
        styleElement?.getElementsByTagName("barwidth")[0]?.textContent || "100%";
    const colors = JSON.parse(
        styleElement?.getElementsByTagName("colors")[0]?.textContent || "[]"
    );
    const innerRadius =
        styleElement?.getElementsByTagName("innerRadius")[0]?.textContent;
    const candlestickOptions =
        colors.length === 2
            ? {
                bar: { groupWidth: "50%" },
                candlestick: {
                    fallingColor: { strokeWidth: 0, fill: colors[0] },
                    risingColor: { strokeWidth: 0, fill: colors[1] },
                },
            }
            : {};
    const donutOptions = innerRadius
        ? {
            pieHole: innerRadius.includes('%')
                ? parseFloat(innerRadius) / 100
                : innerRadius,
        }
        : {};

    return {
        bar: { groupWidth: barWidth },
        colors: colors.length ? colors : palette,
        ...candlestickOptions,
        ...donutOptions,
    };
};
export const parseBarColumnAreaData = (
    dataElement: Element,
    palette: string[]
): Array<Array<string | number>> => {
    const categories = JSON.parse(
        dataElement.getElementsByTagName("categories")[0]?.textContent || "[]"
    );
    const values = JSON.parse(
        dataElement.getElementsByTagName("values")[0]?.textContent || "[]"
    );

    return [
        ["Category", "Value", { role: "style" }],
        ...categories.map((category: string, index: number) => [
            category,
            values[index],
            palette[index % palette.length],
        ]),
    ];
};



export const parseLineChartData = (dataElement: Element): Array<Array<string | number>> => {
    const xValues = JSON.parse(dataElement.getElementsByTagName("xvalues")[0]?.textContent || "[]")
    const yValues = JSON.parse(dataElement.getElementsByTagName("yvalues")[0]?.textContent || "[]")

    return [["Time", "Value"], ...xValues.map((x: number, index: number) => [x, yValues[index]])]
}

export const parseLayout = (chartElement: Element): { hAxis?: { title: string }; vAxis?: { title: string } } => {
    const layoutElement = chartElement.getElementsByTagName("layout")[0]
    const xAxisLabel = layoutElement?.getElementsByTagName("xaxis")[0]?.getAttribute("label") || ""
    const yAxisLabel = layoutElement?.getElementsByTagName("yaxis")[0]?.getAttribute("label") || ""

    return {
        hAxis: { title: xAxisLabel },
        vAxis: { title: yAxisLabel },
    }
}


export const parsePieChartData = (dataElement: Element): Array<Array<string | number>> => {
    const labels = JSON.parse(dataElement.getElementsByTagName("labels")[0]?.textContent || "[]")
    const values = JSON.parse(dataElement.getElementsByTagName("values")[0]?.textContent || "[]")
    return [["", ""], ...labels.map((label: string, index: number) => [label, values[index]])]
}

export const parseAreaChartData = (dataElement: Element, layout: { hAxis?: { title: string }; vAxis?: { title: string } }): Array<Array<string | number>> => {
    const xvalues = JSON.parse(dataElement.getElementsByTagName("xvalues")[0]?.textContent || "[]")
    const yvalues = JSON.parse(dataElement.getElementsByTagName("yvalues")[0]?.textContent || "[]")

    const xAxisLabel = layout.hAxis?.title || " "
    const yAxisLabel = layout.vAxis?.title || " "

    return [
        [xAxisLabel, yAxisLabel],
        ...xvalues.map((x: number, index: number) => [x, yvalues[index]]),
    ]
}

export const parseBubbleChartData = (
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


export const parseGanttChartData = (dataElement: Element): [Array<{ type: string, label: string }>, ...Array<Array<string | number | Date>>] => {
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

export const parseSankeyChartData = (dataElement: Element): Array<Array<string | number>> => {
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

export const parseStepChartData = (dataElement: Element): Array<Array<string | number>> => {
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



export const parseViolinChartData = (dataElement: Element, layout: { hAxis?: { title: string }; vAxis?: { title: string } }): Array<Array<string | number>> => {
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

export const parseFunnelChartData = (dataElement: Element): Array<Array<string | number>> => {
    const stages = JSON.parse(dataElement.getElementsByTagName("stages")[0]?.textContent || "[]");
    const values = JSON.parse(dataElement.getElementsByTagName("values")[0]?.textContent || "[]");

    return stages.map((stage: string, index: number) => ({
        stage: stage,
        number: values[index] || 0,
    }));
};

export const parseRadarChartData = (dataElement: Element): Array<Array<string | number>> => {
    const stages = JSON.parse(dataElement.getElementsByTagName("categories")[0]?.textContent || "[]");
    const values = JSON.parse(dataElement.getElementsByTagName("values")[0]?.textContent || "[]");

    return stages.map((stage: string, index: number) => ({
        name: stage,
        star: values[index] || 0,
    }));
};

export const parseSunburstChartData = (dataElement: Element): Record<string, any> => {
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

export const parseBulletChartData = (dataElement: Element): Array<Record<string, any>> => {
    const performance = JSON.parse(dataElement.getElementsByTagName("performance")[0]?.textContent || "[]");
    const target = JSON.parse(dataElement.getElementsByTagName("target")[0]?.textContent || "[]");

    return performance.map((measure: number, index: number) => ({
        title: `Category ${index + 1}`,
        ranges: 100,
        measures: measure,
        targets: target[index] || 0,
    }));
};







export const parseTreeMapData = (dataElement: Element): Array<Array<string | number | null>> => {
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

export const parseCandlestickData = (dataElement: Element): Array<Array<string | number>> => {
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

export const parseWordCloudData = (dataElement: Element): Array<Record<string, any>> => {
    const wordElements = Array.from(dataElement.getElementsByTagName("word"));

    return wordElements.map((wordElement) => ({
        text: wordElement.getAttribute("name") || "",
        value: parseInt(wordElement.getAttribute("size") || "0", 10),
        name: wordElement.getAttribute("name") || "",
    }));
};

export const parseBoxplotData = (dataElement: Element): Array<{ x: string; y: number[] }> => {
    const categoriesString = dataElement.getElementsByTagName("categories")[0]?.textContent || "[]";
    const valuesString = dataElement.getElementsByTagName("values")[0]?.textContent || "[]";

    const categories = JSON.parse(categoriesString);
    const values = JSON.parse(valuesString);
    return categories.map((category: string, index: number) => ({
        x: category,
        y: values[index],
    }));
};

export const parseWaterfallData = (dataElement: Element): Array<{ x: string; value: number }> => {
    const categoriesString = dataElement.getElementsByTagName("categories")[0]?.textContent || "[]";
    const valuesString = dataElement.getElementsByTagName("values")[0]?.textContent || "[]";

    const categories = JSON.parse(categoriesString);
    const values = JSON.parse(valuesString);


    return categories.map((category: string, index: number) => ({
        x: category,
        value: values[index],
    }));
};

export const parseHeatmapData = (dataElement: Element): Array<{ x: number; y: number; value: number }> => {
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

export const parseDensityData = (dataElement: Element): Array<{ x: number; y: number }> => {
    const xValuesContent = dataElement.getElementsByTagName("xvalues")[0]?.textContent || "[]";
    const densityValuesContent = dataElement.getElementsByTagName("densityvalues")[0]?.textContent || "[]";

    const xValues: number[] = JSON.parse(xValuesContent);
    const densityValues: number[] = JSON.parse(densityValuesContent);

    return xValues.map((x, index) => ({
        x,
        y: densityValues[index] || 0,
    }));
};

export const parseVennData = (dataElement: Element): Array<{ sets: string[]; size: number; label?: string }> => {
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

export const parseCircularPackingData = (dataElement: Element): { name: string; children: any[] } => {
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

export const parseParetoData = (chartElement: Element): { x: string; value: number }[] => {
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



