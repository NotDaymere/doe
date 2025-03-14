export interface ChartMessageData {
    id: string;
    label: string;
    value: number;
    percentile: number;
    color: string;
}

export const mockLineChartMessageData: ChartMessageData[] = [
    { id: 'bcm', label: 'BCM', value: 2206, percentile: 99, color: '#FFDB65' },
    { id: 'preview', label: 'o1 preview', value: 1258, percentile: 69, color: '#BEE380' },
    { id: 'o1', label: 'o1', value: 1673, percentile: 89, color: '#99D9E5' },
    { id: 'o1ioi', label: 'o1+ioi', value: 1470, percentile: 73, color: '#FFB364' },
];
