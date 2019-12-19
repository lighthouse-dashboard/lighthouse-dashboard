import { AUDIT_COLLECTION } from '../config/db';
import getDatabase from '../database/connect-database';

/**
 * Get list of recent builds
 * @param {number | null} limit
 * @returns Promise<AuditDocument[]>
 */
export async function getAudits(limit) {
    const { database, client } = await getDatabase();
    const collection = database.collection(AUDIT_COLLECTION);

    return new Promise((resolve, reject) => {
        collection
            .find(null, { limit })
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

/**
 * Get all audits by a given name
 * @param {string} assetName
 * @param {number | null} limit
 * @return {Promise<unknown>}
 */
export async function getAuditsByName(assetName, limit) {
    const { database, client } = await getDatabase();
    const collection = database.collection(AUDIT_COLLECTION);

    return new Promise((resolve, reject) => {
        collection
            .find({ 'siteId': assetName }, { limit })
            .toArray((error, data) => {
                if (error) {
                    return reject(error);
                }

                resolve(data);
            });
        client.close();
    });
}

/**
 *
 * @param id
 * @param limit
 * @return {Promise<unknown>}
 */
export async function getAuditsBySiteId(id, limit) {
    const { database, client } = await getDatabase();
    const collection = database.collection(AUDIT_COLLECTION);

    return new Promise((resolve, reject) => {
        collection
            .find({ 'siteId': id }, { limit })
            .toArray((error, data) => {
                if (error) {
                    return reject(error);
                }

                resolve(data);
            });
        client.close();
    });
}

