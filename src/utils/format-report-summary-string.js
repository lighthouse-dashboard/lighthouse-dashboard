import { format } from 'date-fns';
import CONFIG from '../../dashboard.config';

/**
 * Format label with optional webhook message
 * @param {Report} report
 * @return {string}
 */
export default function formatReportSummaryString(report) {
    return format(new Date(report.createdAt), CONFIG.DATE_FORMAT);
}
