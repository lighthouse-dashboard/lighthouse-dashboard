import mongoose from 'mongoose';
import { CleanupModel, ID } from '../models/cleanup';

/**
 * Mark if cleanup is running
 * @param {boolean} isRunning
 * @return {Promise<void>}
 */
export async function setCleanupRunning(isRunning) {
    await CleanupModel.findByIdAndUpdate(new mongoose.Types.ObjectId(ID), { is_running: isRunning }, { upsert: true });
}

/**
 * Set the date of the last run
 * @param {Date} lastRunDate
 * @return {Promise<void>}
 */
export async function setLastRunDate(lastRunDate) {
    await CleanupModel.findByIdAndUpdate(new mongoose.Types.ObjectId(ID), { last_run: lastRunDate }, { upsert: true });
}
