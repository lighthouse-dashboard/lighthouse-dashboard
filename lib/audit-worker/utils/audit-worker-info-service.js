import mongoose from 'mongoose';
import { AuditWorkerModel, ID } from '../../audit/models/cleanup-model';

/**
 * Mark if cleanup is running
 * @param {boolean} isRunning
 * @return {Promise<void>}
 */
export async function setCleanupRunning(isRunning) {
    await AuditWorkerModel.findByIdAndUpdate(new mongoose.Types.ObjectId(ID), { is_running: isRunning }, { upsert: true });
}

/**
 * Set the date of the last run
 * @param {Date} lastRunDate
 * @return {Promise<void>}
 */
export async function setLastRunDate(lastRunDate) {
    await AuditWorkerModel.findByIdAndUpdate(new mongoose.Types.ObjectId(ID), { last_run: lastRunDate }, { upsert: true });
}

