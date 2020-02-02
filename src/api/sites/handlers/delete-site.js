import { removeSite } from '../../../database/sites';

/**
 * Delete site from DB
 * @param {hapi.Request} request
 * @param {object} h
 * @return {Promise<void>}
 */
export default async function deleteSite(request, h) {
    const { id } = request.params;
    await removeSite(id);
    return h.response().code(201);
}
