import logger from '../logger';

/**
 * Send message to queue
 * @param {Channel} channel
 * @param {Sites.SiteConfig} config
 * @param {string | undefined | null} message
 */
export default function sendToQueue(channel, config, message = null) {
    const queue = 'audits';
    logger.debug(`Send message to queue ${ queue }`);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify({ config, message })), { persistent: true });
}
