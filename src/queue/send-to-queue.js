import logger from '../logger';

/**
 * Send message to queue
 * @param {Channel} channel
 * @param {object} message
 */
export default function sendToQueue(channel, message) {
    const queue = 'audits';
    logger.debug(`Send message to ${ queue }`);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
}
