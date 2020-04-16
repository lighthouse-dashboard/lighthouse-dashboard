import os from 'os';
import { connectMq } from '../../../queue';

export async function getHealthHandler(request) {
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
