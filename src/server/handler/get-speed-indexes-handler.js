import { REPORT_AUDIT_KEYS } from '../../../config/audit';
import PAGES from '../../../config/sites';
import { getReportBySiteId } from '../database/get-adits';
import { getTimingValueByKey } from '../utils/get-timing-by-key';

export default async function getSpeedIndexesHandler() {
    const data = { labels: [], datasets: [] };

    data.labels = PAGES.map((p) => p.id);

    const values = [];
    for (let i = 0; i < PAGES.length; i++) {
        const audit = await getReportBySiteId(PAGES[i].id);
        if (!audit) {
            continue;
        }

        const value = audit ? getTimingValueByKey(audit.values, REPORT_AUDIT_KEYS.PERFORMANCE) : null;
        values.push(value);
    }

    data.datasets = [
        {
            label: REPORT_AUDIT_KEYS.PERFORMANCE,
            data: values,
        },
    ];

    return data;
}
