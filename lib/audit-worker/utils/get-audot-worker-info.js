import mongoose from 'mongoose';
import { AuditWorkerInfoModel, ID } from '../../core/models/audit-worker-info-model';

/**
 * Get infos of last audit
 * @return {Promise<AuditWorkerInfoModel | null>}
 */
export async function getAuditWorkerInfo() {
    const model = await AuditWorkerInfoModel.findById(new mongoose.Types.ObjectId(ID));
    if (!model) {
        return null;
    }
    return model.toJSON();
}
