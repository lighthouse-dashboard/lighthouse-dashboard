import * as Sentry from '@sentry/node';
import { Transport } from 'winston';
import { version } from '../../package';

export default class SentryTransport extends Transport {
    constructor(dsn) {
        super();
        Sentry.init({
            dsn: dsn,
            environment: process.env.IS_WORKER ? 'worker' : 'web',
            release: version,
            serverName: process.env.SERVICE_NAME || 'local',
        });
    }

    // eslint-disable-next-line class-methods-use-this
    log(message, callback) {
        Sentry.captureException(message);
        callback();
    }
};
