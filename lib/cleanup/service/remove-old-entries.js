import logger from '../../logger';

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
        logger.debug(`Removed ${ deletions.deletedCount } ${ modelName }`);
    } else {
        logger.info('Skipping removal of ${modelName}');
    }
}
