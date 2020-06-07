import { formatDistanceToNow, isBefore, subDays } from 'date-fns';
import formatDate from './format-date';

export default function formatRelativeDate(date) {
    if (isBefore(date, subDays(new Date(), 1))) {
        return formatDate(date);
    }
    return formatDistanceToNow(date, { addSuffix: true });
};
