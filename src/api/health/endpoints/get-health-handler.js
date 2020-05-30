import os from 'os';
import { connectMq } from '../../../queue';
import { healthResponseModel } from '../schemas/health-response-model';

async function getHealthHandler(request) {
    const { client } = request.mongo.client;
    const connection = await connectMq(process.env.MESSAGE_QUEUE_URI);
    const props = connection.connection.serverProperties;
    connection.close();

    return {
        rabbitmq: props,
        db_connection: !!client,
        uptime: Math.round(os.uptime() / 60 / 60),
    };
}

export default {
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
};

