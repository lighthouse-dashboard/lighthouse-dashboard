import { format } from 'date-fns';
import { dateFormat } from '../../config/formats';

/**
 * Format label with optional webhook message
 * @param {Reports.Report} report
 * @return {string}
 */
export default function formatReportSummaryString(report) {
    return format(new Date(report.createdAt), dateFormat);
}
