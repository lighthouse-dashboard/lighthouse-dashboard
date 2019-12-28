import curry from 'lodash.curry';
import { updateSite } from '../database/sites';
import runLighthouse from '../audit/run-lighthouse';
import { saveReport } from '../database/reports';
import lighthouseTransformer from '../transformer/lighthouse-transformer';
import { error } from './logger';

/**
 *
 * @param {SiteConfig} config
 */
export default async function createLighthouseReport(config) {
    const { url, runs, device, id } = config;
    try {
        const transformAuditCurry = curry(lighthouseTransformer);
        const data = await runLighthouse({ pageUrl: url, runs, device }, transformAuditCurry(id));
        await saveReport(data);
        await updateSite(config.id, { last_audit: new Date().toISOString() });
        return data;
    } catch (e) {
        error(e);
        return e;
    }
}
