import { getTimingValueByKey } from '../utils/get-timing-by-key';

/**
 * Create a bar chart
 * @param {Report[]} reports
 * @param {string[]} labels
 * @param {string[]} exportingValues
 * @return {*}
 */
export default function reportsToBarChart(reports, labels, exportingValues) {
    const data = { labels, datasets: [] };

    return exportingValues.reduce((acc, value, exportingValueIndex) => {
        const values = reports.reduce((reportValues, report) => {
            const value = getTimingValueByKey(report.values, exportingValues[exportingValueIndex]);
            reportValues.push(value);
            return reportValues;
        }, []);

        acc.datasets.push({
            name: exportingValues[exportingValueIndex],
            data: values,
        });

        return acc;
    }, data);
}
