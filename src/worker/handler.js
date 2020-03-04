import logger from '../logger';
import { connectMq, createChannel } from '../queue';
import { createNewAuditForConfig } from '../utils/create-new-audit';

let isTaskRunning = false;
const localQueue = [];

const parseMessage = (message) => JSON.parse(message.content.toString());

/**
 * Handle incoming message
 * @param {string} msq
 */
function onMessageReceived(msq) {
    const { config, message } = parseMessage(msq);
    logger.debug(`Received message ${ msq.content.toString() }`);
    if (isTaskRunning) {
        localQueue.push(config);
        logger.debug(`Push message to local queue. Local queue length ${ localQueue.length }`);
        return;
    }

    exec(config, message);
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
    channel.assertQueue(queue, { durable: false });

    logger.info(`Worker ready for consuming queue ${ queue }`);

    channel.consume(queue, onMessageReceived, { noAck: false });
}

/**
 * Execute an audit and recheck the queue for new messages
 * @param {SiteConfig} siteConfig
 * @param {string | null} message
 */
async function exec(siteConfig, message) {
    isTaskRunning = true;
    try {
        await executeAudit(siteConfig, message);
    } catch (e) {
        isTaskRunning = false;
        logger.error(e.message);
    }
    await checkForNewMessagesInLocalQueue();
    isTaskRunning = false;
}

/**
 * Check for new messages and execute them
 * @return {Promise<void>}
 */
function checkForNewMessagesInLocalQueue() {
    logger.debug(`Check local queue for messages`);
    const msg = localQueue.shift();
    if (!msg) {
        logger.debug(`Local queue empty`);
        return Promise.resolve();
    }
    logger.debug(`New message found in local queue`);
    return exec(msg);
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
        });
}
