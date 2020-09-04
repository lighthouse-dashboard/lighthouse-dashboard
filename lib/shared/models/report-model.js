import { Schema } from 'mongoose';
import database from '../database';

const ReportModelSchema = new Schema({
    id: String,
    siteId: String,
    createdAt: Date,
    values: [{ id: String, value: Number }],
    site: {
        type: Schema.Types.ObjectId,
        ref: 'site',
    },
    raw_report: {
        type: Schema.Types.ObjectId,
        ref: 'raw_report',
    },
}, {
    versionKey: false,
    timestamps: true,
    toJSON: {
        virtuals: false,
        transform: (doc, report) => {
            delete report.raw;
            return report;
        },
    },
});

export const ReportModel = database.model('report', ReportModelSchema);
