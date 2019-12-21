import { REPORT_AUDIT_KEYS } from '../../../config/audit';
import PAGES from '../../../config/sites';
import { getReportBySiteId } from '../database/get-adits';
import { getTimingValueByKey } from '../utils/get-timing-by-key';

export default async function getSpeedIndexesHandler() {
    const data = { labels: [], datasets: [] };

    data.labels = PAGES.map((p) => p.url);
    const exportingValues = [
        REPORT_AUDIT_KEYS.PERFORMANCE,
        ];

    for (let i = 0; i < exportingValues.length; i++) {
        const values = [];
        for (let p = 0; p < PAGES.length; p++) {
            const audit = await getReportBySiteId(PAGES[p].id);
            if (!audit) {
                continue;
            }

            const value = audit ? getTimingValueByKey(audit.values, exportingValues[i]) : null;
            values.push(value);
        }

        data.datasets.push({
            name: exportingValues[i],
            data: values,
        });
    }

    return data;
}
