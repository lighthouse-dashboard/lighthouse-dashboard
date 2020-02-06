import os from 'os';
import connectDatabase from '../../database/connect-database';

export async function getHealthController() {
    const { client } = await connectDatabase();
    client.close();

    return {
        db_connection: !!client,
        uptime: Math.round(os.uptime() / 60 / 60),
    };
}
