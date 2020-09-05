import mongoose from 'mongoose';
import logger from '../../logger';
import { MESSAGE_TYPES, MessageModel } from '../models/message-model';

/**
 * Create new error in DB
 * @param {Sites.SiteModel} siteConfig
 * @param {string} message
 */
export const createAuditError = (siteConfig, message) => {
    const error = new MessageModel({ site: siteConfig, message, type: MESSAGE_TYPES.ERROR });
    logger.debug(`Create new audit_error for ${ siteConfig.name } - ${ message }`);
    error.save();
};

/**
 * Get errors for site
 * @param {string} id
 * @param {number} limit
 * @return {Promise<Log.AuditError[]>}
 */
export const getErrorsForSite = async (id, limit) => {
    const errors = await MessageModel.find({
        site: new mongoose.Types.ObjectId(id),
        type: MESSAGE_TYPES.ERROR,
    })
        .sort({ createdAt: -1 })
        .limit(limit);
    return errors.map(e => e.toJSON());
};
