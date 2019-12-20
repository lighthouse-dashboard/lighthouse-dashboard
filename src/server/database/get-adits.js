import { AUDIT_COLLECTION } from '../config/db';
import getDatabase from '../database/connect-database';

/**
 * Get list of recent builds
 * @param {number | null} limit
 * @returns Promise<Report[]>
 */
export async function getAudits(limit) {
    const { database, client } = await getDatabase();
    const collection = database.collection(AUDIT_COLLECTION);

    return new Promise((resolve, reject) => {
        collection
            .find(null, { limit })
            .sort({ _id: 1 })
            .toArray(
                (error, audits) => {
                    client.close();
                    if (error) {
                        return reject(error);
                    }

                    return resolve(audits);
                });
    });
}

/**
 *
 * @param {string} id
 * @param {number} limit
 * @return {Promise<Report[]>}
 */
export async function getAuditsBySiteId(id, limit) {
    const { database, client } = await getDatabase();
    const collection = database.collection(AUDIT_COLLECTION);

    return new Promise((resolve, reject) => {
        collection
            .find({ siteId: id })
            .sort({ _id: 1 })
            .limit(limit)
            .toArray((error, data) => {
                if (error) {
                    return reject(error);
                }

                return resolve(data);
            });
        client.close();
    });
}

/**
 *
 * @param {string} id
 * @return {Promise<Report>}
 */
export async function getReportBySiteId(id) {
    const { database, client } = await getDatabase();
    const collection = database.collection(AUDIT_COLLECTION);

    return new Promise((resolve, reject) => {
        collection
            .find({ siteId: id })
            .sort({ _id: 1 })
            .limit(1)
            .toArray((error, data) => {
                if (error) {
                    return reject(error);
                }

                if (!data || data.length === 0) {
                    return resolve(null);
                }

                return resolve(data.pop());
            });
        client.close();
    });
}

