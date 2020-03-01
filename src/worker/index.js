import Hapi from '@hapi/hapi';
import healthRotues from '../api/health/routes';
import logger from '../logger';
import { connectMq, createChannel } from '../queue';
import checkHealth from '../utils/check-health';
import { createNewAuditForConfig } from '../utils/create-new-audit';

const RESTART_INTERVAL = process.env.RESTART_TIMEOUT;

/**
 * Start worker and connect to mq
 * @param {string} uri
 * @param {string} queue
 * @return {Promise<void>}
 */
async function start(uri, queue) {
    const connection = await connectMq(uri);
    const channel = await createChannel(connection);
    channel.assertQueue(queue, { durable: false });

    logger.info(`Worker ready for consumtions of queue ${ queue }`);

    channel.consume(queue, (message) => {
        const data = JSON.parse(message.content.toString());
        onMessageReceived(message, data);
    }, { noAck: true });
}

/**
 * Callback when a message is received
 * @param {Message} msg
 * @param {SiteConfig} data;
 */
function onMessageReceived(msg, data) {
    logger.debug(`Received message ${ msg.content.toString() }`);
    createNewAuditForConfig(data)
        .then((report) => {
            logger.debug(`${ data.url } => ${ report.values.map(({ id, value }) => `${ id }=${ value }`).join(',') }`);
        });
}

/**
 * Start fake server to check health
 * @return {Promise<void>}
 */
async function startServer() {
    logger.debug(`Start fake server on ${ process.env.PORT }`);
    const server = Hapi.server({
        port: process.env.PORT,
        host: '0.0.0.0',
    });

    healthRotues.map((route) => server.route(route));
    await server.start();

    logger.debug(`Server started`);
}

async function boot() {
    logger.info(`Start audit worker`);
    try {
        if (!await checkHealth()) {
            return;
        }
        await start(process.env.MESSAGE_QUEUE_URI, 'audits');
    } catch (e) {
        logger.error(e);
        logger.debug(`Rebooting worker in ${ RESTART_INTERVAL }ms`);
        setTimeout(() => boot(), RESTART_INTERVAL);
    }
}

/**
 * Booting worker
 */
export default async function() {
    await startServer();
    boot();
}
