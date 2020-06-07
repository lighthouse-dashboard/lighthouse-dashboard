import filesize from 'filesize.js';
import { getSystemObject } from '../db/system';
import { systemInfoModel } from '../schemas/system-info-model';

/**
 * Get system info
 * @param {MongodbDecoration} mongo
 * @param {object} h
 * @return {Promise<SystemAPI.Info>}
 */
async function getSystemInfo({ mongo }, h) {
    /** @type {Db} */
    const db = mongo.db;
    const config = await getSystemObject(db);
    const dbStats = await db.stats();
    return h.response({
        ...config,
        db: {
            collections: dbStats.collections,
            dataSize: filesize(dbStats.dataSize),
        },
    });
}

export default {
    method: 'GET',
    path: '/api/system',
    handler: getSystemInfo,
    options: {
        description: 'Get system info',
        tags: ['api', 'system'],
        auth: 'jwt',
        response: {
            schema: systemInfoModel,
        },
    },
};
