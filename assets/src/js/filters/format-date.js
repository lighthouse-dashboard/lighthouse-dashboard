import { format } from 'date-fns';

export default function formatDate(value) {
    return format(new Date(value), 'dd.MM.yyyy HH:mm:ss');
};
