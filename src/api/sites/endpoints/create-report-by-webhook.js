import Boom from '@hapi/boom';
import joi from '@hapi/joi';
import logger from '../../../logger';
import { getMetaFromGithubWebhook } from '../../../utils/get-meta-from-commit';
import { getSiteConfigByToken } from '../db/sites';

/**
 * Execute an audit
 * @param {hapi.Request} request
 * @param {object} h hapi request utils
 * @return {Promise<AuditDocument>}
 */
async function createReportByWebhook({ params, payload, mongo, ampq }, h) {
    const { token } = params;

    const config = await getSiteConfigByToken(mongo.db, token);
    if (!config) {
        return Boom.notFound('Config not found');
    }

    try {
        const meta = getMetaFromGithubWebhook(payload);
        if (meta && meta.branch && meta.branch !== 'refs/heads/master') {
            logger.debug(`Skip audit for branch ${ meta.branch }`);
            return h.response().code(203);
        }

        //sendToQueue(ampq.channel, config);
    } catch (e) {
        logger.error(e);
        return Boom.boomify(e);
    }

    return h.response().code(201);
}

export default {
    method: 'POST',
    path: '/api/webhook/{token}',
    handler: createReportByWebhook,
    options: {
        description: 'Add new site audit',
        tags: ['api', 'sites'],
        auth: false,
        validate: {
            params: joi.object({
                token: joi
                    .string()
                    .required(),
            }).label('sites.SiteToken'),
        },
    },
};
