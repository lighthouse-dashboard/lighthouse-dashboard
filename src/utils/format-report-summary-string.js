import { format } from 'date-fns';
import CONFIG from '../../dashboard.config';

/**
 * Format label with optional webhook message
 * @param {Report} report
 * @return {string}
 */
export default function formatReportSummaryString(report) {
    const formattedTime = format(new Date(report.createdAt), CONFIG.DATE_FORMAT);

    if (report.message) {
        return `${ formattedTime } - ${ report.message }`;
    }

    return formattedTime;
}
