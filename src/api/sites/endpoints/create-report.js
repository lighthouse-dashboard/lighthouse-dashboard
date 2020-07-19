import Boom from '@hapi/boom';
import joi from '@hapi/joi';
import logger from '../../../../lib/logger';
import { getSiteConfigById, setScheduledAuditForSite } from '../../../services/site-service';

/**
 * Execute an audit
 * @param {hapi.Request} request
 * @param {object} h hapi request utils
 * @return {Promise<AuditDocument>}
 */
async function createReport({ params, mongo }, h) {
    const { id } = params;

    const config = await getSiteConfigById(id);
    if (!config) {
        return Boom.notFound('Config not found');
    }

    try {
        await setScheduledAuditForSite(config, true);
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
