import logger from '../../logger';
import { AuditErrorModel } from '../models/audit-error-model';
import mongoose from 'mongoose';

/**
 * Create new error in DB
 * @param {Sites.SiteModel} siteConfig
 * @param {string} message
 */
export const createAuditError = (siteConfig, message) => {
    const error = new AuditErrorModel({ site: siteConfig, message });
    logger.debug(`Create new audit_error for ${ siteConfig.name } - ${ message }`);
    error.save();
};

/**
 * Get errors for site
 * @param {string} id
 * @return {Promise<Log.AuditError[]>}
 */
export const getErrorsForSite = async (id) => {
    const sites = await AuditErrorModel.find({ site: new mongoose.Types.ObjectId(id) });
    return sites;
};
