import connectDatabase from './connect-database';

/**
 *
 * @param {Report} audit
 * @return {Promise<void>}
 */
export default async function saveAudit(report) {
    const { database, client } = await connectDatabase();
    const reportCollection = database.collection('reports');
    reportCollection.insertOne(report);
    client.close();
}
