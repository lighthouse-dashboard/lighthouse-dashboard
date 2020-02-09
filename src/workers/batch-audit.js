import { getSiteConfigById } from '../database/sites';
import logger from '../logger';
import { createNewAuditForConfig } from '../utils/create-new-audit';


process.on('unhandledRejection', (err) => {
    logger.error(err);
    console.log(err);
    process.exit(1);
});


process.on('SIGTERM', () => {
    logger.info('SIGTERM batch audit worker');
});

process.on('message', async ({ list }) => {
    logger.debug(`Start new batch worker ${ list.length }`);
    for (let i = 0; i < list.length; i++) {
        logger.debug(`Batch ${ i }/${ list.length } - ${ list[i] }`);
        const config = await getSiteConfigById(list[i]);
        await createNewAuditForConfig(config);
    }
});
