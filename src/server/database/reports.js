import connectDatabase from '../database/connect-database';
import { AUDIT_COLLECTION } from '../config/db';

/**
 * Get list of recent reports
 * @param {number | null} limit
 * @returns Promise<Report[]>
 */
export async function getReports(limit) {
    const { database, client } = await connectDatabase();
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
export async function getReportsBySiteId(id, limit) {
    const { database, client } = await connectDatabase();
    const collection = database.collection(AUDIT_COLLECTION);

    return new Promise((resolve, reject) => {
        collection
            .find({ siteId: id })
            //.sort({ _id: -1 })
            .limit(limit)
            .sort({ $natural: 1 })
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
export async function getLatestReportBySiteId(id) {
    const { database, client } = await connectDatabase();
    const collection = database.collection(AUDIT_COLLECTION);

    return new Promise((resolve, reject) => {
        collection
            .find({ siteId: id })
            .limit(1)
            .sort({ $natural: -1 })
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

/**
 * Save a new report in DB
 * @param {Report} report
 * @return {Promise<void>}
 */
export async function saveReport(report) {
    const { database, client } = await connectDatabase();
    const reportCollection = database.collection(AUDIT_COLLECTION);
    reportCollection.insertOne(report);
    client.close();
}
