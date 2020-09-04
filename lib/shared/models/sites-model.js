import { Schema } from 'mongoose';
import database from '../database';

const SiteSchema = new Schema({
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
    audit_errors: [{
        type: Schema.Types.ObjectId,
        ref: 'audit_error',
    }],
    reports: [{
        type: Schema.Types.ObjectId,
        ref: 'report',
    }],
}, {
    versionKey: false,
    timestamps: true,
});

export const SiteModel = database.model('site', SiteSchema);
