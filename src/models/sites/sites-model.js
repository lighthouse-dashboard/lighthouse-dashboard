import { Schema } from 'mongoose';
import database from '../database';

export default database.model('sites', new Schema({
    id: String,
    name: String,
    url: String,
    device: String,
    order: Number,
    is_favorite: Boolean,
    last_audit: String,
    is_scheduled: Boolean,
    thumbmail: String,
    disabled: { type: Boolean, default: false },
}));
