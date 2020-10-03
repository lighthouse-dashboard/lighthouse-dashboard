import joi from '@hapi/joi';
import Boom from '@hapi/boom';
import { hasNewVersionAvailable } from '../../../../services/update-notification-service';
import { getAuthStrategy } from '../../../../utils/get-auth-strategy';
import { getLatestRemoteVersion, invalidateCache } from '../../../../services/remote-version-service';

/**
 * Get sites
 * @param {hapi.Request} request
 * @return {Promise<GetScheduledApi.Response[]>}
 */
const getUpdatesHandler = async (request, h) => {
    if (request.query.force === true) {
        invalidateCache();
    }

    const hasNewVersion = await hasNewVersionAvailable();

    if (!hasNewVersion) {
        return Boom.notFound( 'No new version found' );
    }
    return getLatestRemoteVersion();
};

export default {
    method: 'GET',
    path: '/api/updates',
    handler: getUpdatesHandler,
    options: {
        description: 'Check if updates are available',
        tags: ['api', 'sites'],
        auth: getAuthStrategy(),
        validate: {
            query: joi.object( {
                force: joi.bool().optional(),
            } ),
        },
    },
};
