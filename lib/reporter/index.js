import logger from '../logger';

/** @type {Reporter.ReportFunction[]} */
const reporters = [];

/**
 * Register new reporter
 * @param {Reporter.ReportFunction} reporter
 */
export function register(reporter) {
    reporters.push(reporter);
    logger.debug(`Register new reporter. Total ${ reporters.length }`);
}

/**
 * Send event to all reporters
 * @param {string} eventName
 * @param {object|number|string|undefined} data
 */
export function report(eventName, data) {
    logger.debug(`Dispatching event ${ eventName }. Total ${ reporters.length } reporters`);
    reporters.forEach((reporter) => {
        reporter(eventName, data);
    });
}
