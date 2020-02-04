import * as Sentry from '@sentry/node';
import { Transport } from 'winston';

export default class SentryTransport extends Transport {
    // eslint-disable-next-line class-methods-use-this
    log(message, callback) {
        Sentry.captureException(message);
        callback();
    }
};
