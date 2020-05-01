import Boom from '@hapi/boom';
import joi from '@hapi/joi';
import logger from '../../../logger';
import { closeConnection } from '../../../queue';
import sendToQueue from '../../../queue/send-to-queue';
import { getMetaFromGithubWebhook } from '../../../utils/get-meta-from-commit';
import { getSiteConfigById } from '../db/sites';

/**
 * Execute an audit
 * @param {hapi.Request} request
 * @param {object} h hapi request utils
 * @return {Promise<AuditDocument>}
 */
async function createReport({ params, payload, mongo, amqp }, h) {
    const { id } = params;

    const config = await getSiteConfigById(mongo.db, id);
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
        sendToQueue(amqp.channel, { config });
        await closeConnection();
    } catch (e) {
        logger.error(e);
        return Boom.boomify(e);
    }

    return h.response().code(201);
}

export default {
    method: 'POST',
    path: '/api/sites/{id}',
    handler: createReport,
    options: {
        description: 'Create new report',
        tags: ['api', 'sites'],
        auth: 'jwt',
        validate: {
            params: joi.object({
                id: joi
                    .string()
                    .required(),
            }).label('sites.SiteId'),
        },
    },
};
