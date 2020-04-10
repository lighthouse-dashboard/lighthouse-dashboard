import queue, { closeConnection } from '../../../queue';
import sendToQueue from '../../../queue/send-to-queue';
import { getAllSites } from '../db/sites';

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
    await closeConnection();
    return h.response().code(201);
}

