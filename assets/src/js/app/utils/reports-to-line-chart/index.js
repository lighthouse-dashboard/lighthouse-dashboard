import formatReportSummaryString from '../../../../../../src/utils/format-report-summary-string';
import { getFieldsFromReport } from '../../../../../../src/utils/get-fields-form-reports';

/**
 * Transform reports to chart data
 * @param {Reports.Report[]} reports
 * @return {ChartData}
 */
export default function reportsToLineChart(reports) {
    /** @type {ChartData} */
    const data = {
        labels: [],
        datasets: [],
    };

    data.labels = reports.reduce((acc, report) => {
        if (report) {
            acc.push(formatReportSummaryString(report));
        } else {
            acc.push(null);
        }
        return acc;
    }, []).reverse();

    getFieldsFromReport(reports[0])
        .reduce((datasets, timingKey) => {
            datasets.push(getLineDataSetForKey(reports, timingKey));
            return datasets;
        }, data.datasets);

    return data;
}

/**
 * Create dataset for a line with specific value types
 * @param {Reports.Report[]} reports
 * @param {string} key
 * @return {ChartDataDataSet}
 */
function getLineDataSetForKey(reports, key) {
    const result = reports.reduce((dataSet, report) => {
        dataSet.data.push(getTimingValueForKey(report.values, key));
        return dataSet;
    }, {
        name: key,
        data: [],
    });

    result.data = result.data.reverse();
    return result;
}

/**
 * Get value for a specific timing key
 * @param {Reports.ReportValue[]} timings
 * @param {string} id
 * @return {number}
 */
function getTimingValueForKey(timings, id) {
    return timings.find(t => t.id === id).value || 0;
}
