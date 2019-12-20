import { format } from 'date-fns';
import { EXPORTED_TIMINGS } from '../config/export';

/**
 *
 * @param {Report[]} reports
 */
export default function getLineDataFromAssets(reports) {
    const data = {
        labels: [],
        datasets: [],
    };

    data.labels = reports.reduce((acc, report) => {
        if (report) {
            acc.push(format(new Date(report.createdAt), 'dd/MM hh:mm'));
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
 * @return {*}
 */
function getLineDataSetForKey(reports, key) {
    return reports.reduce((dataSet, report) => {
        dataSet.data.push(getTimingValueForKey(report.values, key));
        return dataSet;
    }, {
        label: key,
        data: [],
    });
}

/**
 *
 * @param {ReportValue[]} timings
 * @return {*}
 */
function getTimingValueForKey(timings, id) {
    return timings.find(t => t.id === id).value || null;
}
