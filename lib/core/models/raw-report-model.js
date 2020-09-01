import { Schema } from 'mongoose';
import database from '../database';

const RawReportModelSchema = new Schema({
    raw: { type: String, default: null },
}, { timestamps: true, versionKey: false });

export const RawReportModel = database.model('raw_reports', RawReportModelSchema);
