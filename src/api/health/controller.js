import os from 'os';
import connectDatabase from '../../database/connect-database';
import { connectMq } from '../../queue';

export async function getHealthController() {
    const { client } = await connectDatabase();
    const connection = await connectMq(process.env.MESSAGE_QUEUE_URI);

    return {
        rabbitmq: connection.connection.serverProperties,
        db_connection: !!client,
        uptime: Math.round(os.uptime() / 60 / 60),
    };
}
