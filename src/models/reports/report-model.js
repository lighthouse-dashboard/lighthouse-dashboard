import { Schema } from 'mongoose';
import database from '../database';

export const ReportModel = database.model('reports', new Schema({
    id: String,
    siteId: String,
    createdAt: Date,
    raw: { type: String, default: null },
    values: [{ id: String, value: Number }],
}));
