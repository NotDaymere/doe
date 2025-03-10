import './MessageChart.less';

interface ChartItem {
    id: string;
    label: string;
    value: number;
    percentile: number;
}

interface ChartProps {
    data: ChartItem[];
}

const MessageChart: React.FC<ChartProps> = ({ data }) => {

    return (
        <div className="chart-container">

        </div>
    );
};

export default MessageChart;
