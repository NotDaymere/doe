import { Button } from "antd";
import { SvgIcon } from "../../../../../../components/icon";
import mockData from "../../../../../../components/table-playground/mockData.json";
import './DownloadCSV.less';

function DownloadCSV() {
    const downloadCSV = () => {
        const csvRows = [];
        const headers = mockData.columns.map(col => col.title).join(',');
        csvRows.push(headers);

        mockData.data.forEach(row => {
            const values = mockData.columns.map(col => row[col.dataIndex as keyof typeof row]);
            csvRows.push(values.join(','));
        });
        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'table_data.csv';
        a.click();
        URL.revokeObjectURL(url);
    };
    return (<Button type={'text'}
            onClick={downloadCSV}
                    className={"download-csv-button"}

    >
        <SvgIcon type={'download'} />
    </Button>)
}
export default DownloadCSV