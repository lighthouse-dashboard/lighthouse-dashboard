import * as Sentry from '@sentry/node';
import { Transport } from 'winston';

export default class SentryTransport extends Transport {
    constructor(dsn, name = 'local', version = null) {
        super();
        Sentry.init({
            dsn: dsn,
            release: version,
            serverName: name,
        });
    }

    // eslint-disable-next-line class-methods-use-this
    log(message, callback) {
        Sentry.captureException(message);
        callback();
    }
};
