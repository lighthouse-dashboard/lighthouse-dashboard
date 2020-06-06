import { getSystemObject } from '../db/system';

async function getSystemInfo({ mongo }, h) {
    const config = await getSystemObject(mongo.db);
    return h.response(config);
}

export default {
    method: 'GET',
    path: '/api/system',
    handler: getSystemInfo,
    options: {
        description: 'Get system info',
        tags: ['api', 'system'],
        auth: 'jwt',
    },
};
