import logger from '../logger';
import { createNewAuditForConfig } from '../utils/create-new-audit';

process.on('message', async ({ config }) => {
    logger.debug(`Start new worker`);
    await createNewAuditForConfig(config);
});
