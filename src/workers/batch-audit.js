import { getSiteConfigById } from '../database/sites';
import logger from '../logger';
import { createNewAuditForConfig } from '../utils/create-new-audit';

/**
 * Create audits for a list of site ids
 * @param {string[]} list
 * @return {Promise<void>}
 */
process.on('message', async ({ list }) => {
    logger.debug(`Start new batch worker ${ list.length }`);
    for (let i = 0; i < list.length; i++) {
        logger.debug(`Batch ${ i }/${ list.length } - ${ list[i] }`);
        const config = await getSiteConfigById(list[i]);
        await createNewAuditForConfig(config);
    }
});
