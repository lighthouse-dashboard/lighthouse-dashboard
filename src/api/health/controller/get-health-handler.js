import os from 'os';
import connectDatabase from '../../../database/connect-database';
import { connectMq } from '../../../queue';

export async function getHealthHandler() {
    const { client } = await connectDatabase();
    const connection = await connectMq(process.env.MESSAGE_QUEUE_URI);
    const props = connection.connection.serverProperties;
    connection.close();

    return {
        rabbitmq: props,
        db_connection: !!client,
        uptime: Math.round(os.uptime() / 60 / 60),
    };
}
