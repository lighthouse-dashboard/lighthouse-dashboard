import logger from '../../logger';
import { report } from '../../reporter';
import { CLEANUP } from '../../reporter/Events';

/**
 * Free up space in DB by remove old entries
 * @param {string} modelName
 * @param {Model} dbModel
 * @param {number} maxReportsAge
 * @param {boolean} removeEntries
 * @return {Promise<void>}
 */
export default async function removeOldEntries(modelName, dbModel, maxReportsAge, removeEntries = false) {
    const date = new Date(Date.now() - maxReportsAge).toISOString();
    const filter = {
        createdAt: {
            $lt: date,
        },
    };
    logger.info(`Remove all ${ modelName } since ${ date }`);

    if (removeEntries) {
        const deletions = await dbModel.deleteMany(filter);
        await report(CLEANUP, modelName, deletions.deletedCount);
        logger.debug(`Removed ${ deletions.deletedCount } ${ modelName }`);
    } else {
        logger.info('Skipping removal of ${modelName}');
    }
}
