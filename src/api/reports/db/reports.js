import { ObjectId } from 'mongodb';
import config from '../../../../config/server';
import { AUDIT_COLLECTION } from '../../../config/db';
import logger from '../../../logger';

/**
 * Get a report by id
 * @param {Db} database
 * @param {string} id
 * @return {Promise<Report>}
 */
export function getReportById(database, id) {
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
 * @param {Db} database
 * @param {string} id
 * @param {number} limit
 * @return {Promise<Report[]>}
 */
export function getReportsBySiteId(database, id, limit) {
    const collection = database.collection(AUDIT_COLLECTION);

    return new Promise((resolve, reject) => {
        collection
            .find({ siteId: id })
            .sort({ createdAt: -1 })
            .limit(limit)
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
 * @param {Db} database
 * @param {string} id
 * @return {Promise<Report>}
 */
export function getLatestReportBySiteId(database, id) {
    const collection = database.collection(AUDIT_COLLECTION);
    return collection.findOne({ siteId: id }, { sort: { createdAt: -1 }, limit: 1 });
}

/**
 * Save a new report in DB
 * @param {Db} database
 * @param {Report} report
 * @param {object} raw - raw lighthouse audit report
 */
export async function saveReport(database, report, raw) {
    const reportCollection = database.collection(AUDIT_COLLECTION);
    const saveRaw = process.env.LHD_IGNORE_RAW ? null : JSON.stringify(raw);
    if (process.env.LHD_IGNORE_RAW) {
        logger.debug('Ignore raw data');
    }
    await reportCollection.insertOne({ ...report, raw: saveRaw });
}

/**
 * Free up space in DB by remove old raw lighthouse data
 * @param {Db} database
 * @return {Promise<void>}
 */
export async function clearReports(database) {
    const reportCollection = database.collection(AUDIT_COLLECTION);
    const filter = {
        raw: { $ne: false },
    };

    logger.debug(`Clearing older entries - Max allowed: ${ config.db.maxRawReports }`);

    const rows = await reportCollection.find(filter)
        .sort({ createdAt: -1 })
        .skip(parseInt(config.db.maxRawReports))
        .toArray();

    const allIds = rows.reduce((acc, row) => {
        acc.push(row._id);
        return acc;
    }, []);

    logger.debug(`Found ${ allIds.length } rows to clear`);
    const { modifiedCount } = await reportCollection.updateMany({ _id: { $in: allIds } }, { $set: { raw: false } });
    logger.debug(`Cleared ${ modifiedCount } rows raw data`);
}


/**
 * Free up space in DB by remove old entries
 * @param {Db} database
 * @return {Promise<void>}
 */
export async function removeOldReports(database) {
    const reportCollection = database.collection(AUDIT_COLLECTION);
    const date = new Date(Date.now() - config.db.maxReportsAge).toISOString();
    const filter = {
        createdAt: {
            $lt: date,
        },
    };
    const rows = await reportCollection.countDocuments(filter);

    logger.debug(`Found ${ rows } reports to remove`);
    const { deletedCount } = await reportCollection.deleteMany(filter);
    logger.debug(`Removed ${ deletedCount } reports`);
}
