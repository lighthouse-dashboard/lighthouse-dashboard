import { Schema } from 'mongoose';
import database from '../database';

const SiteSchema = new Schema({
    id: String,
    name: String,
    url: String,
    device: String,
    order: Number,
    is_favorite: Boolean,
    last_audit: String,
    is_scheduled: Boolean,
    thumbnail: { type: String, default: null },
    is_disabled: { type: Boolean, default: false },
    is_public: { type: Boolean, default: true },
}, {
    versionKey: false,
    timestamps: true,
    toObject: {
        virtuals: true,
        transform: (doc, report) => {
            delete report._id;
            return report;
        },
    },
});

export const SiteModel = database.model('sites', SiteSchema);
