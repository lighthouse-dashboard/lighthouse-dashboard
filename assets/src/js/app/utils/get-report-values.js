/**
 * Get all values
 * @param {Reports.Report} report
 * @return {number[]}
 */
export default function getReportValues(report) {
    return report.values.map((value) => {
        return value.value;
    });
}
