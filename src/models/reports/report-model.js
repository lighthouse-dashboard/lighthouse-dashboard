import { Schema } from 'mongoose';
import database from '../database';

const ReportModelSchema = new Schema({
    id: String,
    siteId: String,
    createdAt: Date,
    raw: { type: String, default: null },
    values: [{ id: String, value: Number }],
}, {
    toObject: {
        virtuals: true,
        transform: (doc, report) => {
            delete report.raw;
            return report;
        },
    },
});

ReportModelSchema.virtual('hasRawData').get(function() {
    return !!this.raw;
});

export const ReportModel = database.model('reports', ReportModelSchema);
