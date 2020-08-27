import { Schema } from 'mongoose';
import database from '../database';

const ReportModelSchema = new Schema({
    id: String,
    siteId: String,
    createdAt: Date,
    raw: { type: String, default: null },
    raw_report_id: { type: String, default: null },
    values: [{ id: String, value: Number }],
}, {
    timestamps: true,
    toObject: {
        virtuals: true,
        transform: (doc, report) => {
            delete report.raw;
            return report;
        },
    },
});

//@Todo implement check
ReportModelSchema.virtual('hasRawData').get(() => {
    return !!this.raw_report_id;
});

export const ReportModel = database.model('reports', ReportModelSchema);
