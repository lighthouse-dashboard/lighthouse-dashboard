import { AUDIT_COLLECTION } from '../config/db';
import getDatabase from './index';

/**
 * Get list of recent builds
 * @returns Promise<AuditDocument[]>
 */
export async function getAudits() {
    const { database, client } = await getDatabase();
    const collection = database.collection(AUDIT_COLLECTION);

    return new Promise((resolve, reject) => {
        collection
            .find()
            .toArray(
                /**
                 *
                 * @param error
                 * @param {AuditDocument[]} audits
                 */
                (error, audits) => {
                    client.close();
                    if (error) {
                        return reject(error);
                    }

                    resolve(audits);
                });
    });
}

export async function getAuditsByName(assetName, limit) {
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

