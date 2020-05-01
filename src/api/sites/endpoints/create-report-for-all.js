import { closeConnection } from '../../../queue';
import sendToQueue from '../../../queue/send-to-queue';
import { getAllSites } from '../db/sites';

/**
 * Execute an audit
 * @param {hapi.Request} request
 * @param {object} h hapi request utils
 * @return {Promise<AuditDocument>}
 */
async function createReportForAll(request, h) {
    const sites = await getAllSites(request.mongo.db);
    sites.forEach((site) => sendToQueue(request.amqp.channel, { config: site, message: 'batch audit' }));
    await closeConnection();
    return h.response().code(201);
}

export default {
    method: 'POST',
    path: '/api/sites/all',
    handler: createReportForAll,
    options: {
        description: 'Add new site audit for every site',
        tags: ['api', 'sites'],
        auth: 'jwt',
    },
};
