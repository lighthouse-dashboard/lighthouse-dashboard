import { Schema } from 'mongoose';
import database from '../database';

export const ID = '000000013f48faec2096596d';

const AuditWorkerInfoSchema = new Schema({
    is_running: { type: Boolean, default: false },
    last_run: { type: Date, default: null },
}, { timestamps: true });

export const AuditWorkerInfoModel = database.model('audit_worker', AuditWorkerInfoSchema);
