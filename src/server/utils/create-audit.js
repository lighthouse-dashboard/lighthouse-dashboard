import saveAudit from '../database/save-audit';
import runAudit from 'src/server/audit/run-audit';

/**
 *
 * @param page
 * @param runs
 * @param {'desktop'|'mobile'} device
 * @return {Promise<AuditDocument>}
 */
export default async function createAudit(page, runs, device) {
    try {
        /** @type {AuditDocument} data */
        const data = await runAudit(page, runs, device);
        console.log('Save audit', page);
        await saveAudit(data);
        return data;
    } catch (e) {
        console.error(e);
    }
}
