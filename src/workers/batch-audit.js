import logger from '../logger';
import { createNewAuditForConfig } from '../utils/create-new-audit';

/**
 * Process a batch
 * @param {SiteConfig[]} list
 * @return {Promise<void>}
 */
async function processBatch({ list }) {
    for (let i = 0; i < list.length; i++) {
        logger(`Start new worker ${ i }/${ list.length }`);
        await createNewAuditForConfig(list[i]);
    }
}

process.on('message', processBatch);
