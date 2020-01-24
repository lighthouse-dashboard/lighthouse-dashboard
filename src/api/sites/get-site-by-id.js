import Boom from '@hapi/boom';
import { getSiteConfigById } from '../../database/sites';

/**
 *
 * @param {hapi.Request} request
 * @return {Promise<SiteConfig|Boom<null>>}
 */
export async function getSiteById({ params }) {
    const { id } = params;
    const config = await getSiteConfigById(id);
    if (!config) {
        return Boom.notFound();
    }
    return config;
}
