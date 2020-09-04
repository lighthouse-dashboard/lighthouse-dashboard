import joi from '@hapi/joi';
import { getErrorsForSite } from '../../../../lib/shared/services/audit-error-service';
import { MEDIUM } from '../../../config/cache';
import { getAuthStrategy } from '../../../utils/get-auth-strategy';

/**
 * Get html report handler
 * @param {object} params
 * @return {Promise<string|string[]>}
 */
async function getSiteErrorsHandler({ params }) {
    const errors = await getErrorsForSite(params.siteId);
    return errors;
}

export default {
    method: 'GET',
    path: '/api/errors/{siteId}',
    handler: getSiteErrorsHandler,
    options: {
        description: 'Get errors for a site',
        tags: ['api', 'log'],
        auth: getAuthStrategy(),
        validate: {
            params: joi.object({
                siteId: joi
                    .string()
                    .required()
                    .label('Site OID'),
            }).label('GetSiteErrors'),
        },

        cache: {
            expiresIn: MEDIUM,
            privacy: 'public',
        },
    },
};
