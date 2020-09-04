import formatDate from '../../../../../src/utils/format-date';
import getReportValues from './get-report-values';

/**
 * Transform a report to data which can be used with radar charts
 * @param {Reports.Report} report
 * @return {{series: {name: string, data: number[]}[], labels: string[]}}
 */
export default function reportToBarChart(report) {
    if (!report) {
        return {
            series: [],
            labels: [],
        };
    }

    return {
        series: [{
            name: formatDate(report.createdAt),
            data: getReportValues(report),
        }],
        labels: report.values.map((value) => {
            return value.id;
        }),
    };
}
