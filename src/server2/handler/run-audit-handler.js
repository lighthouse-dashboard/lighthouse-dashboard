import getDatabase from '../database';
import runAudit from '../provider/run-audit';

/**
 * Execute an audit
 * @param {hapi.Request} request
 * @return {Promise<AuditDocument>}
 */
export default async function runAuditHandler(request) {
    const { page, runs, device } = request.query;

    /** @type {AuditDocument} data */
    const data = await runAudit(page, runs, device);

    const { database, client } = await getDatabase();
    const reportCollection = database.collection('reports');
    reportCollection.insertOne(data);
    client.close();
    return data;
}
