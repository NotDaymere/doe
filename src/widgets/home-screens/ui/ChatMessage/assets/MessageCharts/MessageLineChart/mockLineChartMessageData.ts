export interface ChartMessageData {
    id: string;
    label: string;
    value: number;
    percentile: number;
    color: string;
}

export const mockLineChartMessageData: ChartMessageData[] = [
    { id: 'bcm', label: 'BCM (projected)', value: 2206, percentile: 99, color: '#FF8B12' },
    { id: 'preview', label: 'o1 preview', value: 1258, percentile: 69, color: '#00C49F' },
    { id: 'o1', label: 'o1', value: 1673, percentile: 89, color: '#FFBB28' },
    { id: 'o1ioi', label: 'o1+ioi', value: 1470, percentile: 73, color: '#8884D8' },
];
