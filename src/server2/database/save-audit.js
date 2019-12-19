import getDatabase from '../database/index';

/**
 *
 * @param {AuditDocument} audit
 * @return {Promise<void>}
 */
export default async function saveAudit(audit) {
    const { database, client } = await getDatabase();
    const reportCollection = database.collection('reports');
    reportCollection.insertOne(audit);
    client.close();
}
