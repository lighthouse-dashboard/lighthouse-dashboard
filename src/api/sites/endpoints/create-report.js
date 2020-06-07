import Boom from '@hapi/boom';
import joi from '@hapi/joi';
import logger from '../../../logger';
import { closeConnection } from '../../../queue';
import sendToQueue from '../../../queue/send-to-queue';
import { getMetaFromGithubWebhook } from '../../../utils/get-meta-from-commit';
import { getSiteConfigById, setScheduledAuditForSite } from '../db/sites';

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
        // await spawnNewAuditWorker(config);
        if (process.env.MESSAGE_QUEUE_URI) {
            sendToQueue(amqp.channel, config);
        } else {
            logger.warn('No MESSAGE_QUEUE_URI found in env. Skipping queue message');
        }

        await setScheduledAuditForSite(mongo.db, config, 1);
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
