import { getHealthController } from './controller';

export default [
    {
        method: 'GET',
        path: '/health',
        handler: getHealthController,
        options: {
            auth: false,
            description: 'Check system health',
            tags: ['api', 'auth'],
        },
    },
];
