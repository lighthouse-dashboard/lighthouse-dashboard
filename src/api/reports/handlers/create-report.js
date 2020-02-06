import Boom from '@hapi/boom';
import { getSiteConfigByToken } from '../../../database/sites';
import logger from '../../../logger';
import { spawnNewAuditWorker } from '../../../utils/create-new-audit';
import { getMetaFromGithubWebhook } from '../../../utils/get-meta-from-commit';
import validateSiteToken from '../../../utils/validate-site-token';

/**
 * Execute an audit
 * @param {hapi.Request} request
 * @param {object} h hapi request utils
 * @return {Promise<AuditDocument>}
 */
export default async function createReport({ query, payload }, h) {
    const { token } = query;

    const config = await getSiteConfigByToken(token);
    if (!config) {
        return Boom.notFound('Config not found');
    }

    if (!validateSiteToken(config, token)) {
        return Boom.forbidden('Token mismatch');
    }

    try {
        const meta = getMetaFromGithubWebhook(payload);
        if (meta && meta.branch && meta.branch !== 'refs/heads/master') {
            logger.debug(`Skip audit for branch ${ meta.branch }`);
            return h.response().code(203);
        }

        await spawnNewAuditWorker(config);
        //await createNewAuuditForConfig(config, meta);
    } catch (e) {
        logger.error(e);
        return Boom.boomify(e);
    }

    return h.response().code(201);
}

