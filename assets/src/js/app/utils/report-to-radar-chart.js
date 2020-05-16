import formatDate from '../filters/format-date';

/**
 * Transform a report to data which can be used with radar charts
 * @param {Report} report
 */
export default function reportToRadarChart(report) {
    return {
        series: [{
            name: formatDate(report.createdAt),
            data: report.values.map((value) => {
                return value.value;
            }),
        }],
        labels: report.values.map((value) => {
            return value.id;
        }),
    };
}
