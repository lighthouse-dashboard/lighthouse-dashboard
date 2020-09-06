import logger from '../logger';
import {
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
    reporters.push(reporter);
    logger.debug(`Register new reporter. Total ${ reporters.length }`);
}

const eventFunctionMap = {
    [AUDIT_COMPLETE]: 'onAuditComplete',
    [AUDIT_FAILED]: 'onAuditFailed',
    [AUDIT_SCHEDULED]: 'onAuditScheduled',

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
    logger.debug(`Dispatching event ${ eventName }. Total ${ reporters.length } reporters`);
    for (const reporter of reporters) {
        const fnName = eventFunctionMap[eventName];
        if (reporter[fnName]) {
            await reporter[fnName](...rest);
        }
    }
}
