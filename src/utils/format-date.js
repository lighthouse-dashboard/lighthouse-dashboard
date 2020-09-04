import { format } from 'date-fns';
import { dateFormat } from '../../config/formats';

/**
 * Format date
 * @param {string|null|date} value
 * @return {string|null}
 */
export default function formatDate(value) {
    if (!value) {
        return null;
    }

    return format(new Date(value), dateFormat);
};
