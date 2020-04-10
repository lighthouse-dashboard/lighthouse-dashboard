import { getHealthHandler } from './controller/get-health-handler';
import { healthResponseModel } from './schemas/health-response-model';

export default [
    {
        method: 'GET',
        path: '/health',
        handler: getHealthHandler,
        options: {
            auth: false,
            description: 'Check system health',
            tags: ['api', 'health'],
            response: {
                schema: healthResponseModel,
            },
        },
    },
];
