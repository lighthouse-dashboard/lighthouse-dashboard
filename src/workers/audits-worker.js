import logger from '../logger';
import { connectMq, createChannel } from '../queue';
import checkHealth from '../utils/check-health';
import { createNewAuditForConfig } from '../utils/create-new-audit';

require('dotenv').config();

async function start(uri, queue) {
    await checkHealth();
    const connection = await connectMq(uri);
    const channel = await createChannel(connection);
    channel.assertQueue(queue, { durable: false, });

    logger.info(`Worker ready for consumtions of queue ${ queue }`);

    channel.consume(queue, (message) => {
        const data = JSON.parse(message.content.toString());
        onMessageReceived(message, data);
    }, { noAck: true, });
}

/**
 * Callback when a message is received
 * @param {Message} msg
 * @param {SiteConfig} data;
 */
function onMessageReceived(msg, data) {
    logger.debug(`Received message ${ msg.content.toString() }`);
    createNewAuditForConfig(data)
        .then(
            (report) => {
                logger.debug(`${ data.url } => ${ report.values.map(({ id, value }) => `${ id }=${ value }`).join(',') }`);
            });
}


export default function() {
    start(process.env.MESSAGE_QUEUE_URI, 'audits');
}
