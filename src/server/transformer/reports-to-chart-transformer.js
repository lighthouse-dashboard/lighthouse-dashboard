import { format } from 'date-fns';
import CONFIG from '../../../dashboard.config';

/**
 *
 * @param {Report[]} reports
 * @return {ChartData}
 */
export default function reportsToChartTransformer(reports) {
    const data = {
        labels: [],
        datasets: [],
    };

    data.labels = reports.reduce((acc, report) => {
        if (report) {
            acc.push(format(new Date(report.createdAt), CONFIG.DATE_FORMAT));
        } else {
            acc.push(null);
        }
        return acc;
    }, []).reverse();

    CONFIG.SERVER.API.REPORT_VALUES.reduce((datasets, timingKey) => {
        datasets.push(getLineDataSetForKey(reports, timingKey));
        return datasets;
    }, data.datasets);

    return data;
}

/**
 *
 * @param {Report[]} reports
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
 * @param {ReportValue[]} timings
 * @param {string} id
 * @return {number}
 */
function getTimingValueForKey(timings, id) {
    return timings.find(t => t.id === id).value || 0;
}
