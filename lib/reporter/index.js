import logger from '../logger';
import {
    AUDIT_CHECK,
    AUDIT_COMPLETE,
    AUDIT_FAILED,
    AUDIT_SCHEDULED,
    CLEANUP,
    SERVER_ERROR,
    SERVER_SIGTERM,
    SERVER_STARTUP,
} from './Events';


/** @type {Reporter.Reporter[]} */
const reporters = [];

/**
 * Register new reporter
 * @param {Reporter.Reporter} reporter
 */
export function register(reporter) {
    if (reporter.init) {
        reporter.init();
    }

    reporters.push( reporter );
    logger.debug( `Register ${ reporter.name } reporter` );
}

const eventFunctionMap = {
    [AUDIT_COMPLETE]: 'onAuditComplete',
    [AUDIT_FAILED]: 'onAuditFailed',
    [AUDIT_SCHEDULED]: 'onAuditScheduled',
    [AUDIT_CHECK]: 'onAuditCheck',

    [CLEANUP]: 'onCleanup',

    [SERVER_STARTUP]: 'onServerStartup',
    [SERVER_SIGTERM]: 'onServerSIGTERM',
    [SERVER_ERROR]: 'onServerError',
};

/**
 * Send event to all reporters
 * @param {string} eventName
 * @param {*} rest
 * @return {Promise<void>}
 */
export async function report(eventName, ...rest) {
    logger.debug( `Dispatching event ${ eventName }` );
    if (!reporters) {
        logger.warn( `No reporters to handle ${ eventName }` );
    }

    for (const reporter of reporters) {
        const fnName = eventFunctionMap[eventName];
        if (reporter[fnName]) {
            logger.debug( `Reporter ${ reporter.name } executing ${ fnName }` );
            await reporter[fnName]( ...rest );
        }
    }
}

/**
 * Get list of registered reporters
 * @returns {string[]}
 */
export const getList = () => reporters.map( r => (
    r.name
) );
