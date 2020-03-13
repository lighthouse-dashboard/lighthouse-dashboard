import { format } from 'date-fns';
import { DATE_FORMAT } from '../../../../config/dashboard';

export default function formatDate(value) {
    return format(new Date(value), DATE_FORMAT);
};
