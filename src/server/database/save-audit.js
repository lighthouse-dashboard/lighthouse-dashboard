import connectDatabase from './connect-database';

/**
 *
 * @param {AuditDocument} audit
 * @return {Promise<void>}
 */
export default async function saveAudit(audit) {
    const { database, client } = await connectDatabase();
    const reportCollection = database.collection('reports');
    reportCollection.insertOne(audit);
    client.close();
}
