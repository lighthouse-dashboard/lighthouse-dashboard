import connectDatabase from '../database/connect-database';
import logger from '../logger';
import { closeConnection, connectMq, createChannel } from '../queue';
import { createNewAuditForConfig } from '../utils/create-new-audit';

const parseMessage = (message) => JSON.parse(message.content.toString());

/**
 * Process received message
 * @param {Channel}channel
 * @param {object} msg
 */
async function processMessage(channel, msg) {
    const { config, message } = parseMessage(msg);
    logger.debug(`Received message ${ msg.content.toString() }`);
    await executeAudit(config, message);
    await channel.ack(msg);
    await checkForNewMessagesInQueue(channel);
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

    await checkForNewMessagesInQueue(channel);
    await closeConnection();
}

/**
 * Check for new messages and execute them
 * @param {Channel} channel
 * @return {Promise<void>}
 */
async function checkForNewMessagesInQueue(channel) {
    logger.debug(`Check remote queue`);
    const message = await channel.get('audits');
    if (message) {
        logger.debug(`Found message in queue`);
        await processMessage(channel, message);
    } else {
        logger.debug(`No messages in queue`);
    }
}

/**
 * Callback when a message is received
 * @param {SiteConfig} data;
 * @param {string | null} message;
 * @return {Promise<void>}
 */
async function executeAudit(data, message = null) {
    const { database } = await connectDatabase();
    const report = await createNewAuditForConfig(database, data, { message, git_commit: null });
    if (!report) {
        logger.warn(`No report for ${ data.url }`);
        return;
    }
    logger.debug(`${ data.url } => ${ report.values.map(({ id, value }) => `${ id }=${ value }`).join(',') }`);
}
