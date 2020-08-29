import logger from './lib/logger';
import { register, report } from './lib/reporter';
import { SERVER_STARTUP } from './lib/reporter/Events';
import qm from './lib/reporter/integrations/quickmetrics';
import server from './src/server';

logger.info(`Booting server`);

if (process.env.QUICK_METRICS_KEY) {
    register(qm(process.env.QUICK_METRICS_KEY));
}
report(SERVER_STARTUP);
server();
