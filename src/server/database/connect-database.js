import { MongoClient } from 'mongodb';

/**
 *
 * @return {Promise<{database: unknown, client: MongoClient }>}
 */
export default function connectDatabase() {
    return new Promise((resolve) => {
        // Use connect method to connect to the server
        MongoClient.connect(process.env.MONGO_DB_URL, function(err, client) {
            if (err) {
                throw err;
            }

            const database = client.db(process.env.MONGO_DB_NAME);
            return resolve({ database, client });
        });
    });
}
