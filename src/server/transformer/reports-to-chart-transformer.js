import { format } from 'date-fns';
import { EXPORTED_TIMINGS } from '../config/export';

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
            acc.push(format(new Date(report.createdAt), 'dd/MM HH:mm'));
        } else {
            acc.push(null);
        }
        return acc;
    }, []);

    EXPORTED_TIMINGS.reduce((datasets, timingKey) => {
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
    return reports.reduce((dataSet, report) => {
        dataSet.data.push(getTimingValueForKey(report.values, key));
        return dataSet;
    }, {
        name: key,
        data: [],
    });
}

/**
 * @param {ReportValue[]} timings
 * @param {string} id
 * @return {number}
 */
function getTimingValueForKey(timings, id) {
    return timings.find(t => t.id === id).value || 0;
}
