import mongoose from 'mongoose';
import AuditWorkerInfoModel, { ID } from '../models/audit-worker-info-model';

/**
 * Get infos of last audit
 * @return {Promise<AuditWorkerModel>}
 */
export async function getAuditWorkerInfo() {
    const model = await AuditWorkerInfoModel.findById(new mongoose.Types.ObjectId(ID));
    return model.toJSON();
}
