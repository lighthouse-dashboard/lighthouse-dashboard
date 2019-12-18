import { AUDIT_COLLECTION } from '../config/db';
import getDatabase from '../database';

/**
 * Get list of recent builds
 * @param {string} assetName
 * @param {number} limit
 */
export default async function getRecentBuilds(assetName, limit) {
    const { database, client } = await getDatabase();
    const collection = database.collection(AUDIT_COLLECTION);

    return new Promise((resolve, reject) => {
        collection.find({ 'asset': assetName }, {limit}).toArray((error, data) => {
            if (error) {
                return reject(error);
            }

            resolve(data);
        });
        client.close();
    });
}
