export interface ChartMessageData {
    id: string;
    label: string;
    value: number;
    percentile: number;
}

export const mockColumnsChartMessageData: ChartMessageData[] = [
    { id: 'bcm', label: 'BCM (projected)', value: 2206, percentile: 99 },
    { id: 'preview', label: 'o1 preview', value: 1258, percentile: 69 },
    { id: 'o1', label: 'o1', value: 1673, percentile: 89 },
    { id: 'o1ioi', label: 'o1+ioi', value: 1470, percentile: 73 },
];