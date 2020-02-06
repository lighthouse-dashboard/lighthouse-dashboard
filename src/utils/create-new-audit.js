import { fork } from 'child_process';
import curry from 'lodash.curry';
import { join } from 'path';
import runLighthouse from '../audit/run-lighthouse';
import { saveReport } from '../database/reports';
import { getSiteConfigById, updateSite } from '../database/sites';
import lighthouseTransformer from '../transformer/lighthouse-transformer';

export function spawnNewAuditWorker(config) {
    const forked = fork(join(__dirname, '../workers/single-audit.js'));
    forked.send({ config });
}

/**
 * Run new audit by id
 * @param {string} id
 * @param {ReportMeta} meta
 * @return {Promise<Report>}
 */
export default async function createNewAudit(id, meta) {
    const config = await getSiteConfigById(id);
    if (!config) {
        throw new Error('Config not found');
    }

    return createNewAuditForConfig(config, meta);
}

/**
 * Create new audit
 * @param {SiteConfig} config
 * @param {ReportMeta} meta
 * @return {Promise<*>}
 */
export async function createNewAuditForConfig(config, meta = {}) {
    const { url, runs, device } = config;
    const transformAuditCurry = curry(lighthouseTransformer);
    const data = await runLighthouse({ url, runs, device }, transformAuditCurry(config.id));
    await saveReport({ ...data, ...meta });
    await updateSite(config.id, { last_audit: new Date().toISOString() });
    return data;
}
