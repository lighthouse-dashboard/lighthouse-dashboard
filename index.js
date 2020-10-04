import * as Sentry from '@sentry/node';
import logger from './lib/logger';
import server from './src/server';
import setup from './reporters';


if (process.env.SENTRY_DSN) {
    logger.debug( 'Setting up Sentry integration' );

    Sentry.init( {
        dsn: process.env.SENTRY_DSN,
        serverName: process.env.SERVICE_NAME,
        environment: process.env.NODE_ENV,
        tracesSampleRate: 0.2,

    } );
}

setup();

logger.info( `Booting server` );
server();
