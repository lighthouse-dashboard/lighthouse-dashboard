/**
 *
 * @param {Report[]} reports
 * @param {string} key
 */
import { getReportValueScoreByKey } from '../../../../../src/utils/get-report-value-score-by-key';

export default function getAverageForScore(reports, key) {
    const total = reports.reduce((acc, report) => {
        acc.push(getReportValueScoreByKey(report.values, key));
        return acc;
    }, [])
        .reduce((acc, value) => {
            return acc + value;
        }, 0);

    return total / reports.length;
}

