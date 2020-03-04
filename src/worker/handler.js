import logger from '../logger';
import { connectMq, createChannel } from '../queue';
import { createNewAuditForConfig } from '../utils/create-new-audit';


const parseMessage = (message) => JSON.parse(message.content.toString());


/**
 *
 * @param channel
 * @return {(Message) => void}
 */
async function processMessage(channel, msg) {
    const { config, message } = parseMessage(msg);
    logger.debug(`Received message ${ msg.content.toString() }`);
    await exec(config, message);
    await channel.ack(msg);
    await checkForNewMessagesInQueue();
}

/**
 * Start worker and connect to mq
 * @param {string} uri
 * @param {string} queue
 * @return {Promise<void>}
 */
export async function consumeQueue(uri, queue) {
    const connection = await connectMq(uri);
    const channel = await createChannel(connection);
    await channel.assertQueue(queue, { durable: false });

    logger.info(`Worker ready for consuming queue ${ queue }`);

    await checkForNewMessagesInQueue();
}

/**
 * Execute an audit and recheck the queue for new messages
 * @param {SiteConfig} siteConfig
 * @param {string | null} message
 */
async function exec(siteConfig, message) {
    try {
        await executeAudit(siteConfig, message);
    } catch (e) {
        logger.error(e.message);
    }
}

/**
 * Check for new messages and execute them
 * @return {Promise<void>}
 */
async function checkForNewMessagesInQueue() {
    logger.debug(`Check remote queue`);
    const connection = await connectMq(process.env.MESSAGE_QUEUE_URI);
    const channel = await createChannel(connection);
    const message = await channel.get('audits');
    if (message) {
        logger.debug(`Found message in queue`);
        await processMessage(channel, message);
    }
}

/**
 * Callback when a message is received
 * @param {SiteConfig} data;
 * @param {string | null} message;
 * @return {Promise<void>}
 */
function executeAudit(data, message = null) {
    return createNewAuditForConfig(data, { message, git_commit: null })
        .then((report) => {
            logger.debug(`${ data.url } => ${ report.values.map(({ id, value }) => `${ id }=${ value }`).join(',') }`);
        })
        .catch(e => {
            logger.error(e.message);
        });
}
