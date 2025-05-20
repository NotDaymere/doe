export interface ChartMessageData {
    id: string;
    label: string;
    value: number;
    percentile: number;
    color?: string;
}

export function parseColumnBarMessageChartData(chartObj: any): ChartMessageData[] {
    if (!chartObj || !Array.isArray(chartObj.data) || chartObj.data.length < 2) {
        return [];
    }
    const rows = chartObj.data.slice(1);

    const maxValue = Math.max(...rows.map((row: any[]) => row[1] as number));

    return rows.map((row: any[]) => {
        const label = row[0];
        const value = row[1];
        const color = row.length > 2 ? row[2] : undefined;
        const id = label.toLowerCase().replace(/\s+/g, '');
        const percentile = maxValue > 0 ? Math.round((value / maxValue) * 100) : 0;
        return { id, label, value, percentile, color };
    });
}

export function parseLineMessageChartData(chart: any): ChartMessageData[] {
    const data = chart.data;
    const rows = data.slice(1);

    const maxValue = Math.max(...rows.map((row: any) => row[1]));

    const colors: string[] =
        chart.style && chart.style.colors ? chart.style.colors : [];

    return rows.map((row: any, index: number) => {

        const label = String(row[0]);
        const value = Number(row[1]);

        const id = label.toLowerCase().replace(/\s+/g, '');
        const percentile = Math.round((value / maxValue) * 100);
        const color = colors[index % colors.length] || '#000000';

        return { id, label, value, percentile, color };
    });
}