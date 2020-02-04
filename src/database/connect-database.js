import { MongoClient } from 'mongodb';
import CONFIG from '../../server.config';

/**
 * Connect to DB
 * @return {Promise<{database: unknown, client: MongoClient }>}
 */
export default function connectDatabase() {
    return new Promise((resolve) => {
        // Use connect method to connect to the server
        MongoClient.connect(CONFIG.DB.MONGO_DB_URI, function(err, client) {
            if (err) {
                throw err;
            }

            const database = client.db();
            return resolve({ database, client });
        });
    });
}
