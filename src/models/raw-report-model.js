import { Schema } from 'mongoose';
import database from '../../lib/core/database';

const RawReportModelSchema = new Schema({
    raw: { type: String, default: null },
}, { timestamps: true });

export const RawReportModel = database.model('raw_reports', RawReportModelSchema);
