import Boom from '@hapi/boom';
import { getSiteConfigByToken } from '../../../database/sites';
import logger from '../../../logger';
import queue from '../../../queue';
import sendToQueue from '../../../queue/send-to-queue';
import { getMetaFromGithubWebhook } from '../../../utils/get-meta-from-commit';

/**
 * Execute an audit
 * @param {hapi.Request} request
 * @param {object} h hapi request utils
 * @return {Promise<AuditDocument>}
 */
export default async function createReportByWebhook({ params, payload }, h) {
    const { token } = params;

    const config = await getSiteConfigByToken(token);
    if (!config) {
        return Boom.notFound('Config not found');
    }

    try {
        const meta = getMetaFromGithubWebhook(payload);
        if (meta && meta.branch && meta.branch !== 'refs/heads/master') {
            logger.debug(`Skip audit for branch ${ meta.branch }`);
            return h.response().code(203);
        }

        // await spawnNewAuditWorker(config);
        const channel = await queue();
        sendToQueue(channel, config);
    } catch (e) {
        logger.error(e);
        return Boom.boomify(e);
    }

    return h.response().code(201);
}

