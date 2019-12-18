import { MongoClient } from 'mongodb';

/**
 *
 * @return {Promise<{database: unknown, client: MongoClient }>}
 */
export default function getDatabase() {
    return new Promise((resolve, reject) => {
        // Use connect method to connect to the server
        MongoClient.connect(process.env.MONGO_DB_URL, function(err, client) {
            if (err) {
                throw err;
            }

            console.log('Connected successfully to server');
            const database = client.db(process.env.MONGO_DB_NAME);
            return resolve({ database, client });
        });
    });
}
