import { Schema } from 'mongoose';
import database from '../database';


const AuditErrorSchema = new Schema({
    message: { type: String, default: null },
    site: {
        type: Schema.Types.ObjectId,
        ref: 'site',
    },
}, { timestamps: true, versionKey: false });

export const AuditErrorModel = database.model('audit_error', AuditErrorSchema);
