import os from 'os';
import { connectMq } from '../../../queue';
import { healthResponseModel } from '../schemas/health-response-model';

const getMQSettings = async () => {
    try {
        const connection = await connectMq(process.env.MESSAGE_QUEUE_URI);
        const props = connection.connection.serverProperties;
        connection.close();
        return props;
    } catch (e) {
        return null;
    }
};

async function getHealthHandler(request) {
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

