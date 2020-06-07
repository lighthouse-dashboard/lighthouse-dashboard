import os from 'os';
import { healthResponseModel } from '../schemas/health-response-model';

function getHealthHandler(request) {
    const { client } = request.mongo;
    return {
        rabbitmq: null,
        db_connection: !!client,
        uptime: os.uptime(),
    };
}

export default {
    method: 'GET',
    path: '/api/health',
    handler: getHealthHandler,
    options: {
        auth: false,
        description: 'Check system health',
        tags: ['api', 'health'],
        response: {
            schema: healthResponseModel,
        },
    },
};

