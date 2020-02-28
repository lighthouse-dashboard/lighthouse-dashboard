import amqp from 'amqplib/callback_api';
import logger from '../logger';

/** @type {Connection | null} */
let connection = null;

/** @type {Channel | null} */
let channel = null;

/**
 * Connect to queue endpoint
 * @param {string} uri
 * @return {Promise<Connection>}
 */
export function connectMq(uri) {
    if (connection) {
        return Promise.resolve(connection);
    }

    logger.debug(`Connecting to queue ${ uri }`);
    return new Promise((resolve, reject) => {
        amqp.connect(uri, (error, conn) => {
            if (error) {
                logger.error(error.message);
                return reject(error);
            }
            logger.debug(`Connection established`);
            connection = conn;
            return resolve(conn);
        });
    });
}

/**
 * Create a channel
 * @param {Connection} con
 * @return {Promise<Channel>}
 */
export function createChannel(con) {
    if (channel) {
        return channel;
    }

    logger.debug(`Creating channel`);
    return new Promise((resolve, reject) => {
        con.createChannel((error, ch) => {
            if (error) {
                logger.error(error.message);
                return reject(error);
            }
            logger.debug(`Channel created`);
            channel = ch;
            return resolve(ch);
        });
    });
}

/**
 * Connect to queue and open a channel
 * @return {Promise<Channel>}
 */
export default async function queue() {
    const c = await connectMq(process.env.MESSAGE_QUEUE_URI);
    return createChannel(c);
}
