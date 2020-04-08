import { ObjectId } from 'mongodb';
import { AUDIT_COLLECTION } from '../config/db';
import connectDatabase from '../database/connect-database';
import logger from '../logger';

/**
 * Get list of recent reports
 * @param {number | null} limit
 * @return {Promise<Report[]>}
 */
export async function getReports(limit) {
    const { database } = await connectDatabase();
    const collection = database.collection(AUDIT_COLLECTION);

    return new Promise((resolve, reject) => {
        collection
            .find(null, { limit })
            .sort({ _id: 1 })
            .toArray((error, audits) => {
                if (error) {
                    return reject(error);
                }

                return resolve(audits);
            });
    });
}

export async function getReportById(id) {
    const { database } = await connectDatabase();
    const collection = database.collection(AUDIT_COLLECTION);

    return new Promise((resolve, reject) => {
        collection
            .findOne({ _id: ObjectId(id) }, (err, data) => {
                if (err) {
                    return reject(err);
                }
                return resolve(data);
            });
    });
}

/**
 * Get all reports for a site
 * @param {string} id
 * @param {number} limit
 * @return {Promise<Report[]>}
 */
export async function getReportsBySiteId(id, limit) {
    const { database } = await connectDatabase();
    const collection = database.collection(AUDIT_COLLECTION);

    return new Promise((resolve, reject) => {
        collection
            .find({ siteId: id })
            //.sort({ _id: -1 })
            .limit(limit)
            .sort({ createdAt: -1 })
            .toArray((error, data) => {
                if (error) {
                    return reject(error);
                }

                return resolve(data);
            });
    });
}

/**
 * Get latest report for site
 * @param {string} id
 * @return {Promise<Report>}
 */
export async function getLatestReportBySiteId(id) {
    const { database } = await connectDatabase();
    const collection = database.collection(AUDIT_COLLECTION);

    return new Promise((resolve, reject) => {
        collection
            .find({ siteId: id })
            .limit(1)
            .sort({ createdAt: -1 })
            .toArray((error, data) => {
                if (error) {
                    return reject(error);
                }

                if (!data || data.length === 0) {
                    return resolve(null);
                }

                return resolve(data.pop());
            });
    });
}

/**
 * Save a new report in DB
 * @param {Report} report
 * @param {object} raw - raw lighthouse audit report
 * @return {Promise<void>}
 */
export async function saveReport(report, raw) {
    const { database } = await connectDatabase();
    const reportCollection = database.collection(AUDIT_COLLECTION);
    const saveRaw = process.env.LHD_IGNORE_RAW ? null : JSON.stringify(raw);
    if (process.env.LHD_IGNORE_RAW) {
        logger.debug('Ignore raw data');
    }
    reportCollection.insertOne({ ...report, raw: saveRaw });
}

export async function clearReports() {
    logger.debug('Ignore raw data');
    const { database } = await connectDatabase();
    const reportCollection = database.collection(AUDIT_COLLECTION);
    const date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const rows = await reportCollection.count({
        createdAt: {
            $lt: date,
        },
    });
    logger.debug(`Freeing up ${ rows } rows`);

    await reportCollection.update({ createdAt: date }, { $set: { raw: null } });
    logger.debug(`Cleared ${ rows } rows raw data`);
}
