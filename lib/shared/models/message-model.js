import { Schema } from 'mongoose';
import database from '../database';

export const MESSAGE_TYPES = {
    ERROR: 'error',
    INFO: 'info',
};

const MessageSchema = new Schema({
    message: { type: String, default: null },
    type: { type: String, default: 'info' },
    site: {
        type: Schema.Types.ObjectId,
        ref: 'site',
    },
}, { timestamps: true, versionKey: false });

export const MessageModel = database.model('audit_error', MessageSchema);
