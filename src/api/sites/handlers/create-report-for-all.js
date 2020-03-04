import { getAllSites } from '../../../database/sites';
import queue from '../../../queue';
import sendToQueue from '../../../queue/send-to-queue';

/**
 * Execute an audit
 * @param {hapi.Request} request
 * @param {object} h hapi request utils
 * @return {Promise<AuditDocument>}
 */
export default async function createReportForAll(request, h) {
    const sites = await getAllSites();
    const channel = await queue();
    sites.forEach((site) => sendToQueue(channel, { config: site, message: 'batch audit' }));
    return h.response().code(201);
}

