import { Schema } from 'mongoose';
import database from '../database';

const RawReportModelSchema = new Schema({
    raw: { type: String, default: null },
    report: {
        type: Schema.Types.ObjectId,
        ref: 'report',
    },
}, { timestamps: true, versionKey: false });

export const RawReportModel = database.model('raw_report', RawReportModelSchema);
