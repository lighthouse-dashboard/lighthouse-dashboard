import { getReportValueScoreByKey } from '../../utils/get-report-value-score-by-key';

/**
 * Create a bar chart
 * @param {Report[]} reports
 * @param {string[]} labels
 * @param {string[]} exportingValues
 * @return {BarChartData}
 */
export default function reportToBarChart(reports, labels, exportingValues) {
    /** @type {BarChartData} */
    const data = { labels, datasets: [] };

    return exportingValues.reduce((acc, value, exportingValueIndex) => {
        const values = reports.reduce((reportValues, report) => {
            const value = getReportValueScoreByKey(report.values, exportingValues[exportingValueIndex]);
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
