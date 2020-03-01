import logger from '../logger';
import { connectMq, createChannel } from '../queue';
import { createNewAuditForConfig } from '../utils/create-new-audit';

let isTaskRunning = false;
const localQueue = [];

const parseMessage = (message) => JSON.parse(message.content.toString());

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

    channel.consume(queue, (message) => {
        logger.debug(`Received message ${ message.content.toString() }`);
        if (isTaskRunning) {
            localQueue.push(message);
            logger.debug(`Push message to local queue. Local queue length ${ localQueue.length }`);
            return;
        }

        exec(message, channel, queue);
    }, { noAck: false });
}

/**
 * Execute an audit and recheck the queue for new messages
 * @param {Message} message
 * @param {Channel} channel
 * @param {string} queue
 */
async function exec(message, channel, queue) {
    isTaskRunning = true;
    try {
        const data = parseMessage(message);
        await executeAudit(data);
        await channel.ack(message);
    } catch (e) {
        isTaskRunning = false;
        logger.error(e.message);
    }
    await checkForNewMessages(channel, queue);
    isTaskRunning = false;
}

/**
 * Check for new messages and execute them
 * @param {Channel} channel
 * @param {string} queue
 * @return {Promise<void>}
 */
function checkForNewMessages(channel, queue) {
    logger.debug(`Check local queue for messages`);
    const msg = localQueue.shift();
    if (!msg) {
        logger.debug(`Local queue empty`);
        return Promise.resolve();
    }
    logger.debug(`New message found in local queue`);
    return exec(msg, channel, queue);
}

/**
 * Callback when a message is received
 * @param {SiteConfig} data;
 * @return {Promise<void>}
 */
function executeAudit(data) {
    return createNewAuditForConfig(data)
        .then((report) => {
            logger.debug(`${ data.url } => ${ report.values.map(({ id, value }) => `${ id }=${ value }`).join(',') }`);
        });
}
