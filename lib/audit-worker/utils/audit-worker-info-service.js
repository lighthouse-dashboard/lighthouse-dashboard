import mongoose from 'mongoose';

import { AuditWorkerInfoModel, ID } from '../../core/models/audit-worker-info-model';

/**
 * Update info model
 * @param {Partial<AuditWorkerInfoModel> }delta
 * @return {Promise<void>}
 */
export const updateEntry = async (delta) => {
    await AuditWorkerInfoModel.findByIdAndUpdate(new mongoose.Types.ObjectId(ID), delta, { upsert: true });
};

/**
 * Mark if cleanup is running
 * @param {boolean} isRunning
 * @return {Promise<void>}
 */
export const setCleanupRunning = (isRunning) => updateEntry({ is_running: isRunning });

/**
 * Set the date of the last run
 * @param {Date} lastRunDate
 * @return {Promise<void>}
 */
export const setLastRunDate = (lastRunDate) => updateEntry({ last_run: lastRunDate });

