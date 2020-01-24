import Boom from '@hapi/boom';
import curry from 'lodash.curry';
import runLighthouse from '../../audit/run-lighthouse';
import { saveReport } from '../../database/reports';
import { getSiteConfigById, updateSite } from '../../database/sites';
import lighthouseTransformer from '../../transformer/lighthouse-transformer';
import { getMetaFromGithubWebhook } from '../../utils/get-meta-from-commit';
import { error } from '../../utils/logger';
import validateSiteToken from '../../utils/validate-site-token';

/**
 * Execute an audit
 * @param {hapi.Request} request
 * @param {object} h hapi request utils
 * @return {Promise<AuditDocument>}
 */
export default async function createReport({ params, query, payload }, h) {
    const { id } = params;
    const { token } = query;

    const config = await getSiteConfigById(id);
    if (!config) {
        return Boom.notFound('Config not found');
    }

    if (!validateSiteToken(config, token)) {
        return Boom.forbidden('Token mismatch');
    }

    const { url, runs, device } = config;

    try {
        const meta = getMetaFromGithubWebhook(payload);
        const transformAuditCurry = curry(lighthouseTransformer);
        const data = await runLighthouse({ pageUrl: url, runs, device }, transformAuditCurry(id));
        await saveReport({ ...data, ...meta });
        await updateSite(config.id, { last_audit: new Date().toISOString() });
    } catch (e) {
        error(e);
        return Boom.boomify(e);
    }

    return h.response().code(201);
}

