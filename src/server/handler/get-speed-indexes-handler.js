import { TIMINGS } from '../../../config/audit';
import PAGES from '../config/sites';
import { getAuditBySiteId } from '../database/get-adits';
import { getTimingValueByKey } from '../utils/get-timing-by-key';

export default async function getSpeedIndexesHandler() {
    const data = { labels: [], datasets: [] };

    data.labels = PAGES.map((p) => p.id);

    const values = [];
    for (let i = 0; i < PAGES.length; i++) {
        const audit = await getAuditBySiteId(PAGES[i].id);
        const value = audit && audit.median ? getTimingValueByKey(audit.median.timings, TIMINGS.SPEED_INDEX) : null;
        values.push(value);
    }

    data.datasets = [
        {
            label: TIMINGS.SPEED_INDEX,
            data: values,
        },
    ];

    return data;
}
