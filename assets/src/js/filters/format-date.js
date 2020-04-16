import { format } from 'date-fns';
import { DATE_FORMAT } from '../../../../config/dashboard';

/**
 * Format date
 * @param {string|null} value
 * @return {string|null}
 */
export default function formatDate(value) {
    if (!value) {
        return null;
    }

    return format(new Date(value), DATE_FORMAT);
};
