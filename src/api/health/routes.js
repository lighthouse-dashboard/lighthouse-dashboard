import { getHealthController } from './controller';
import { healthResponseModel } from './schemas/health-response-model';

export default [
    {
        method: 'GET',
        path: '/health',
        handler: getHealthController,
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
