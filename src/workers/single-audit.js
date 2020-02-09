import logger from '../logger';
import { createNewAuditForConfig } from '../utils/create-new-audit';


process.on('unhandledRejection', (err) => {
    logger.error(err);
    console.log(err);
    process.exit(1);
});

process.on('SIGTERM', () => {
    logger.info('SIGTERM single audit worker');
});

process.on('message', async ({ config }) => {
    logger.debug(`Start new worker`);
    await createNewAuditForConfig(config);
});
