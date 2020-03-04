import amqp from 'amqplib';
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
export async function connectMq(uri) {
    if (connection) {
        return connection;
    }

    logger.debug(`Connecting to queue ${ uri }`);
    try {
        connection = await amqp.connect(uri);
        logger.debug(`Connection to queue established`);
        return connection;
    } catch (e) {
        logger.error(e.message);
        throw e;
    }
}

/**
 * Close connection
 * @return {Promise<void>}
 */
export async function closeConnection() {
    if (connection) {
        logger.debug(`Closing queue connection`);
        await connection.close();
    }
}

/**
 * Create a channel
 * @param {Connection} con
 * @return {Promise<Channel>}
 */
export async function createChannel(con) {
    if (channel) {
        return channel;
    }

    logger.debug(`Creating channel`);
    try {
        channel = await con.createChannel();
        logger.debug(`Channel created`);
        return channel;
    } catch (error) {
        logger.error(error.message);
        throw error;
    }
}

/**
 * Connect to queue and open a channel
 * @return {Promise<Channel>}
 */
export default async function queue() {
    const c = await connectMq(process.env.MESSAGE_QUEUE_URI);
    return createChannel(c);
}
