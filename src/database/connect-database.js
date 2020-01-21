import { MongoClient } from 'mongodb';
import CONFIG from '../../dashboard.config';

/**
 * Connect to DB
 * @return {Promise<{database: unknown, client: MongoClient }>}
 */
export default function connectDatabase() {
    return new Promise((resolve) => {
        // Use connect method to connect to the server
        MongoClient.connect(CONFIG.SERVER.DB.MONGO_DB_URL, function(err, client) {
            if (err) {
                throw err;
            }

            const database = client.db(CONFIG.SERVER.DB.MONGO_DB_NAME);
            return resolve({ database, client });
        });
    });
}
