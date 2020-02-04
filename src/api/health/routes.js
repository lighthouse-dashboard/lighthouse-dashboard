import { getHealthController } from './controller';

export default [
    {
        method: 'GET',
        path: '/health',
        handler: getHealthController,
        options: {
            auth: false,
            description: 'Get JWT token',
            tags: ['api', 'auth'],
        },
    },
];
